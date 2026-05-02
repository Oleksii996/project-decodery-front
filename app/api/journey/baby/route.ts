import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3000/api/weeks/10");
  const data = await res.json();

  const baby = data.baby;

  return NextResponse.json({
    weekNumber: baby.weekNumber,
    size: baby.babySize,
    description: baby.babyDevelopment,
    facts: [
      baby.babyActivity,
      baby.interestingFact,
    ],
  });
}