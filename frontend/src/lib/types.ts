export type ScreenId =
  | "welcome"
  | "login"
  | "register"
  | "home"
  | "profile"
  | "journey"
  | "missions"
  | "badges"
  | "memories"
  | "parent"
  | "growth"
  | "promise";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface AuthSession {
  user: AuthUser;
  loggedInAt: string;
}

export interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface Skill {
  label: string;
  before: number;
  after: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description?: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  subtitle?: string;
  day: 1 | 2;
  status: "completed" | "active" | "locked";
  icon: string;
  missionId?: string;
}

export interface Mission {
  id: string;
  title: string;
  type: string;
  description: string;
  requirements: string[];
  xpReward: number;
  badgeReward?: string;
  status: "pending" | "in_progress" | "completed";
}

export interface Memory {
  id: string;
  title: string;
  location: string;
  date: string;
  note: string;
  mood: string;
  gradient: string;
}

export interface Achievement {
  id: string;
  text: string;
  xp: number;
  date: string;
}

export interface UserProfile {
  name: string;
  level: string;
  levelNum: number;
  xp: number;
  xpMax: number;
  avatar: string;
  personalMission: string;
  skills: Skill[];
  promise?: string;
}

export interface AppState {
  profile: UserProfile;
  totalXp: number;
  missionsCompleted: number;
  badgesUnlocked: string[];
  teamActivities: number;
  reflection: string;
  checkpoints?: Checkpoint[];
}
