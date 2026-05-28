import { NextResponse } from "next/server";
import { badges } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(badges);
}
