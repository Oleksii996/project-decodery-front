import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3000/api/weeks/10");
  const data = await res.json();

  const mom = data.mom;

  return NextResponse.json({
    weekNumber: mom.weekNumber,
    description: data.mom.description, 
    tips: mom.momDailyTips || [],
  });
}