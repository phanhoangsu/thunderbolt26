import { NextResponse } from "next/server";
import { checkpoints } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(checkpoints);
}
