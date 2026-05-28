import type { AuthUser, StoredUser } from "./types";

export const DEMO_USERS: StoredUser[] = [
  {
    id: "demo-1",
    email: "hoangsu@camp.vn",
    password: "123456",
    name: "Hoàng Sử",
    avatar: "HS",
  },
  {
    id: "demo-2",
    email: "demo@weekend.vn",
    password: "demo123",
    name: "Demo Warrior",
    avatar: "DW",
  },
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function toAuthUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  };
}

export function validateCredentials(
  email: string,
  password: string,
  registered: StoredUser[],
): StoredUser | null {
  const normalized = email.trim().toLowerCase();
  const all = [...DEMO_USERS, ...registered];
  const found = all.find(
    (u) => u.email.toLowerCase() === normalized && u.password === password,
  );
  return found ?? null;
}

export function emailExists(email: string, registered: StoredUser[]): boolean {
  const normalized = email.trim().toLowerCase();
  return [...DEMO_USERS, ...registered].some(
    (u) => u.email.toLowerCase() === normalized,
  );
}

export function createRegisteredUser(
  name: string,
  email: string,
  password: string,
): StoredUser {
  return {
    id: `user-${Date.now()}`,
    email: email.trim().toLowerCase(),
    password,
    name: name.trim(),
    avatar: getInitials(name.trim()),
  };
}
