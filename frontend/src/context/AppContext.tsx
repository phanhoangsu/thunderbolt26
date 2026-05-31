"use client";

import {
  createRegisteredUser,
  emailExists,
  toAuthUser,
  validateCredentials,
} from "@/lib/auth";
import {
  addRegisteredUser,
  clearSession,
  loadRegisteredUsers,
  loadSession,
  saveSession,
} from "@/lib/auth-storage";
import {
  badges as defaultBadges,
  checkpoints as defaultCheckpoints,
} from "@/lib/mock-data";
import { defaultAppState, resolveUserAppState, saveStateForUser, applyBadgesFromState, createFreshCheckpoints } from "@/lib/storage";
import type {
  AppState,
  AuthSession,
  AuthUser,
  Badge,
  Checkpoint,
  ScreenId,
} from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AppContextValue extends AppState {
  screen: ScreenId;
  screenHistory: ScreenId[];
  missionStarted: boolean;
  missionSubmitted: boolean;
  checkpoints: Checkpoint[];
  badges: Badge[];
  apiLoading: boolean;
  isAuthenticated: boolean;
  authUser: AuthUser | null;
  loginRequired: boolean;
  setScreen: (s: ScreenId) => void;
  navigateTo: (s: ScreenId, options?: { replace?: boolean }) => void;
  goBack: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
  startMission: () => void;
  submitMission: () => void;
  savePromise: (text: string) => void;
  saveReflection: (text: string) => void;
  completeCheckpoint: (id: string) => void;
  showXpToast: boolean;
  clearXpToast: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const AUTH_SCREENS: ScreenId[] = ["welcome", "login", "register"];

const PROTECTED_SCREENS: ScreenId[] = [
  "home",
  "profile",
  "journey",
  "missions",
  "badges",
  "memories",
  "parent",
  "growth",
  "promise",
];

function isProtectedScreen(s: ScreenId): boolean {
  return PROTECTED_SCREENS.includes(s);
}

function applyUserState(
  user: AuthUser,
  userState: AppState,
  setCheckpointsFn: (c: Checkpoint[]) => void,
  setBadgesFn: (b: Badge[]) => void,
) {
  setCheckpointsFn(
    userState.checkpoints?.length
      ? userState.checkpoints
      : createFreshCheckpoints(),
  );
  setBadgesFn(applyBadgesFromState(userState.badgesUnlocked));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultAppState);
  const [screen, setScreen] = useState<ScreenId>("welcome");
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>([]);
  const [checkpoints, setCheckpoints] =
    useState<Checkpoint[]>(defaultCheckpoints);
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loginRequired, setLoginRequired] = useState(false);
  const [missionStarted, setMissionStarted] = useState(false);
  const [missionSubmitted, setMissionSubmitted] = useState(false);
  const [showXpToast, setShowXpToast] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  const isAuthenticated = !!authUser;

  useEffect(() => {
    const session = loadSession();
    if (session?.user) {
      const userState = resolveUserAppState(session.user);
      setState(userState);
      applyUserState(session.user, userState, setCheckpoints, setBadges);
      setAuthUser(session.user);
      setScreen("home");
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    async function loadApi() {
      try {
        const [p, j, b] = await Promise.all([
          fetch("/api/profile").then((r) => r.json()),
          fetch("/api/journey").then((r) => r.json()),
          fetch("/api/badges").then((r) => r.json()),
        ]);
        setState((prev) => ({
          ...prev,
          profile: {
            ...p,
            ...prev.profile,
            name: prev.profile.name,
            avatar: prev.profile.avatar,
            promise: prev.profile.promise,
            xp: prev.profile.xp,
            level: prev.profile.level,
            levelNum: prev.profile.levelNum,
            xpMax: prev.profile.xpMax,
          },
        }));
        setCheckpoints((prev) => {
          const merged = j as Checkpoint[];
          return prev.length
            ? prev.map((cp) => {
                const apiCp = merged.find((m) => m.id === cp.id);
                return apiCp ? { ...apiCp, status: cp.status } : cp;
              })
            : merged;
        });
        setBadges((prev) => {
          const apiBadges = b as Badge[];
          if (!prev.some((badge) => badge.unlocked)) return apiBadges;
          return apiBadges.map((badge) => {
            const saved = prev.find((p) => p.id === badge.id);
            return saved ? { ...badge, unlocked: saved.unlocked } : badge;
          });
        });
      } catch {
        /* keep defaults */
      } finally {
        setApiLoading(false);
      }
    }

    loadApi();
  }, [hydrated]);

  useEffect(() => {
    if (hydrated && authUser) {
      saveStateForUser(authUser.id, { ...state, checkpoints });
    }
  }, [state, checkpoints, hydrated, authUser]);

  const setAuthSession = useCallback((user: AuthUser) => {
    const session: AuthSession = {
      user,
      loggedInAt: new Date().toISOString(),
    };
    saveSession(session);
    setAuthUser(user);
    setLoginRequired(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const registered = loadRegisteredUsers();
      const localUser = validateCredentials(email, password, registered);

      if (localUser) {
        const authUserData = toAuthUser(localUser);
        const userState = resolveUserAppState(authUserData);
        setState(userState);
        applyUserState(authUserData, userState, setCheckpoints, setBadges);
        setAuthSession(authUserData);
        setScreenHistory([]);
        setScreen("home");
        return { success: true };
      }

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          return {
            success: false,
            message: data.message ?? "Đăng nhập thất bại.",
          };
        }

        setAuthSession(data.user);
        const userState = resolveUserAppState(data.user);
        setState(userState);
        applyUserState(data.user, userState, setCheckpoints, setBadges);
        setScreenHistory([]);
        setScreen("home");
        return { success: true };
      } catch {
        return { success: false, message: "Không kết nối được server." };
      }
    },
    [setAuthSession],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<AuthResult> => {
      const registered = loadRegisteredUsers();

      if (emailExists(email, registered)) {
        return { success: false, message: "Email đã được sử dụng." };
      }

      if (password.length < 6) {
        return { success: false, message: "Mật khẩu tối thiểu 6 ký tự." };
      }

      const newUser = createRegisteredUser(name, email, password);
      addRegisteredUser(newUser);

      try {
        await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
      } catch {
        /* client storage is source of truth */
      }

      const authUserData = toAuthUser(newUser);
      const userState = resolveUserAppState(authUserData, { isNewUser: true });
      saveStateForUser(authUserData.id, userState);
      setState(userState);
      applyUserState(authUserData, userState, setCheckpoints, setBadges);
      setAuthSession(authUserData);
      setScreenHistory([]);
      setScreen("home");
      return { success: true };
    },
    [setAuthSession],
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    clearSession();
    setAuthUser(null);
    setLoginRequired(false);
    setScreenHistory([]);
    setScreen("welcome");
    setMissionStarted(false);
    setMissionSubmitted(false);
  }, []);

  useEffect(() => {
    if (!hydrated || authUser) return;
    if (isProtectedScreen(screen)) {
      setLoginRequired(true);
      setScreen("login");
    }
  }, [hydrated, authUser, screen]);

  const navigateTo = useCallback(
    (s: ScreenId, options?: { replace?: boolean }) => {
      if (isProtectedScreen(s) && !authUser) {
        setLoginRequired(true);
        setScreenHistory([]);
        setScreen("login");
        return;
      }

      if (AUTH_SCREENS.includes(s)) {
        setLoginRequired(false);
      }

      if (!options?.replace) {
        setScreenHistory((h) => [...h, screen]);
      } else {
        setScreenHistory([]);
      }
      setScreen(s);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Also scroll the inner content container
        document
          .querySelector(".app-main__content")
          ?.scrollTo({ top: 0, behavior: "smooth" });
        document
          .querySelector(".screen-page")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [screen, authUser],
  );

  const goBack = useCallback(() => {
    setScreenHistory((h) => {
      const next = [...h];
      const prev = next.pop();
      if (prev) {
        if (isProtectedScreen(prev) && !authUser) {
          setScreen("welcome");
        } else {
          setScreen(prev);
        }
      } else {
        setScreen(isAuthenticated ? "home" : "welcome");
      }
      return next;
    });
  }, [isAuthenticated, authUser]);

  const startMission = () => setMissionStarted(true);

  const submitMission = () => {
    setMissionSubmitted(true);
    setShowXpToast(true);
    setState((prev) => ({
      ...prev,
      totalXp: prev.totalXp + 30,
      missionsCompleted: Math.min(prev.missionsCompleted + 1, 8),
      profile: {
        ...prev.profile,
        xp: Math.min(prev.profile.xp + 30, prev.profile.xpMax),
      },
    }));
    setCheckpoints((prev) =>
      prev.map((cp) =>
        cp.id === "forest"
          ? { ...cp, status: "completed" as const }
          : cp.id === "qr"
          ? { ...cp, status: "active" as const }
          : cp,
      ),
    );
    setBadges((prev) =>
      prev.map((b) => (b.id === "nature-lover" ? { ...b, unlocked: true } : b)),
    );
    setTimeout(() => setShowXpToast(false), 2500);
  };

  const completeCheckpoint = (id: string) => {
    setCheckpoints((prev) =>
      prev.map((cp, i, arr) => {
        if (cp.id !== id) return cp;
        const next = arr[i + 1];
        if (next && next.status === "locked") {
          setTimeout(() => {
            setCheckpoints((p) =>
              p.map((c) =>
                c.id === next.id ? { ...c, status: "active" as const } : c,
              ),
            );
          }, 0);
        }
        return { ...cp, status: "completed" as const };
      }),
    );
  };

  const savePromise = (text: string) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, promise: text },
    }));
  };

  const saveReflection = (text: string) => {
    setState((prev) => ({ ...prev, reflection: text }));
  };

  if (!hydrated) {
    return (
      <div className="app-layout flex min-h-screen items-center justify-center">
        <p className="font-bold text-forest">Đang tải...</p>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        screen,
        screenHistory,
        missionStarted,
        missionSubmitted,
        checkpoints,
        badges,
        apiLoading,
        isAuthenticated,
        authUser,
        loginRequired,
        setScreen,
        navigateTo,
        goBack,
        login,
        register,
        logout,
        startMission,
        submitMission,
        savePromise,
        saveReflection,
        completeCheckpoint,
        showXpToast,
        clearXpToast: () => setShowXpToast(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
