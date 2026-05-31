import type { AuthSession, StoredUser } from "./types";

const SESSION_KEY = "ww-session";
const USERS_KEY = "ww-users";

function migrateAuthUser(user: AuthSession["user"]): AuthSession["user"] {
  if (
    user.name === "Minh Anh" ||
    user.avatar === "MA" ||
    user.email === "minhanh@camp.vn"
  ) {
    return {
      ...user,
      name: "Hoàng Sử",
      email: "hoangsu@camp.vn",
      avatar: "HS",
    };
  }
  return user;
}

export function loadSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    const migrated = { ...session, user: migrateAuthUser(session.user) };
    if (migrated.user !== session.user) saveSession(migrated);
    return migrated;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function loadRegisteredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as StoredUser[]).map((u) =>
      u.email === "minhanh@camp.vn"
        ? { ...u, email: "hoangsu@camp.vn", name: "Hoàng Sử", avatar: "HS" }
        : u.name === "Minh Anh"
        ? { ...u, name: "Hoàng Sử", avatar: "HS" }
        : u,
    );
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users: StoredUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function addRegisteredUser(user: StoredUser) {
  const users = loadRegisteredUsers();
  users.push(user);
  saveRegisteredUsers(users);
}
