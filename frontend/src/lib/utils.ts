import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLevel(xp: number): { level: string; levelNum: number; xpMax: number } {
  if (xp >= 400) return { level: "Weekend Warrior", levelNum: 5, xpMax: 500 };
  if (xp >= 300) return { level: "Team Hero", levelNum: 4, xpMax: 400 };
  if (xp >= 200) return { level: "Pathfinder", levelNum: 3, xpMax: 300 };
  if (xp >= 100) return { level: "Camper", levelNum: 2, xpMax: 200 };
  return { level: "Explorer", levelNum: 1, xpMax: 100 };
}

export function formatXp(xp: number) {
  return `${xp} XP`;
}
