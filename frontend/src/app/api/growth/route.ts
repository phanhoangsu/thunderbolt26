import { NextResponse } from "next/server";
import { growthSkills } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    skills: growthSkills,
    strongest: "Làm việc nhóm",
    needsImprovement: "Giao tiếp",
  });
}
