import { NextResponse } from "next/server";
import { coachNote, defaultProfile } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    name: defaultProfile.name,
    totalXp: 0,
    missionsCompleted: 6,
    missionsTotal: 8,
    badgesEarned: 3,
    teamActivities: 4,
    skills: defaultProfile.skills,
    coachNote,
  });
}
