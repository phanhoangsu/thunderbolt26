import { NextResponse } from "next/server";
import { forestMission } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json([forestMission]);
}
