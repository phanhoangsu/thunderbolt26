import type { AppState } from "./types";
import { defaultProfile } from "./mock-data";

const STORAGE_KEY = "weekend-warriors-state";

export const defaultAppState: AppState = {
  profile: defaultProfile,
  totalXp: 250,
  missionsCompleted: 6,
  badgesUnlocked: ["explorer", "team-player", "nature-lover"],
  teamActivities: 4,
  reflection:
    "Tôi học được rằng làm việc nhóm giúp tôi mạnh mẽ hơn.",
};

function migrateProfile(state: AppState): AppState {
  const p = state.profile;
  const needsUpdate =
    p.name === "Minh Anh" ||
    p.avatar === "MA" ||
    p.name.includes("Minh Anh");

  if (!needsUpdate) return state;

  return {
    ...state,
    profile: {
      ...p,
      name: "Hoàng Sử",
      avatar: "HS",
    },
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultAppState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAppState;
    return migrateProfile({ ...defaultAppState, ...JSON.parse(raw) });
  } catch {
    return defaultAppState;
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
