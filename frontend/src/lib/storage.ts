import {
  badges as defaultBadges,
  checkpoints as defaultCheckpoints,
  defaultProfile,
} from "./mock-data";
import type { AppState, AuthUser, Badge, Checkpoint } from "./types";
import { getLevel } from "./utils";

const LEGACY_STORAGE_KEY = "weekend-warriors-state";

function userStorageKey(userId: string) {
  return `weekend-warriors-state-${userId}`;
}

export const defaultAppState: AppState = {
  profile: {
    ...defaultProfile,
    xp: 0,
    level: "Explorer",
    levelNum: 1,
    xpMax: 100,
  },
  totalXp: 0,
  missionsCompleted: 0,
  badgesUnlocked: [],
  teamActivities: 0,
  reflection: "",
};

function migrateProfile(state: AppState): AppState {
  const profile = state.profile;
  const needsUpdate =
    profile.name === "Minh Anh" ||
    profile.avatar === "MA" ||
    profile.name.includes("Minh Anh");

  if (!needsUpdate) return state;

  return {
    ...state,
    profile: {
      ...profile,
      name: "Hoàng Sử",
      avatar: "HS",
    },
  };
}

function parseStoredState(raw: string): AppState {
  return migrateProfile({ ...defaultAppState, ...JSON.parse(raw) });
}

export function createFreshCheckpoints(): Checkpoint[] {
  return defaultCheckpoints.map((checkpoint) => {
    if (checkpoint.id === "start") {
      return { ...checkpoint, status: "completed" as const };
    }
    if (checkpoint.id === "forest") {
      return { ...checkpoint, status: "active" as const };
    }
    return { ...checkpoint, status: "locked" as const };
  });
}

export function createFreshBadges(): Badge[] {
  return defaultBadges.map((badge) => ({ ...badge, unlocked: false }));
}

export function applyBadgesFromState(unlockedIds: string[]): Badge[] {
  return defaultBadges.map((badge) => ({
    ...badge,
    unlocked: unlockedIds.includes(badge.id),
  }));
}

export function createFreshUserState(user: Pick<AuthUser, "name" | "avatar">): AppState {
  const level = getLevel(0);

  return {
    profile: {
      ...defaultProfile,
      name: user.name,
      avatar: user.avatar,
      xp: 0,
      level: level.level,
      levelNum: level.levelNum,
      xpMax: level.xpMax,
      promise: undefined,
    },
    totalXp: 0,
    missionsCompleted: 0,
    badgesUnlocked: [],
    teamActivities: 0,
    reflection: "",
    checkpoints: createFreshCheckpoints(),
  };
}

export function applyUserToProfile(state: AppState, user: AuthUser): AppState {
  return {
    ...state,
    profile: {
      ...state.profile,
      name: user.name,
      avatar: user.avatar,
    },
  };
}

function loadLegacyState(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    return parseStoredState(raw);
  } catch {
    return null;
  }
}

function clearLegacyState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function loadStateForUser(
  userId: string,
  options?: { allowLegacyMigrate?: boolean },
): AppState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(userStorageKey(userId));
    if (raw) return parseStoredState(raw);

    if (options?.allowLegacyMigrate) {
      const legacy = loadLegacyState();
      if (legacy) {
        const migrated = parseStoredState(JSON.stringify(legacy));
        saveStateForUser(userId, migrated);
        clearLegacyState();
        return migrated;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function saveStateForUser(userId: string, state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(userStorageKey(userId), JSON.stringify(state));
}

/** @deprecated Dùng loadStateForUser / saveStateForUser theo từng user */
export function loadState(): AppState {
  return loadLegacyState() ?? defaultAppState;
}

/** @deprecated Dùng saveStateForUser theo từng user */
export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
}

export function resolveUserAppState(
  user: AuthUser,
  options?: { isNewUser?: boolean },
): AppState {
  if (options?.isNewUser) {
    return applyUserToProfile(createFreshUserState(user), user);
  }

  const saved = loadStateForUser(user.id, { allowLegacyMigrate: true });
  if (saved) return applyUserToProfile(saved, user);

  return applyUserToProfile(createFreshUserState(user), user);
}
