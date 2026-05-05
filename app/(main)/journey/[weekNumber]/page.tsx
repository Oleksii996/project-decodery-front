"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import WeekSelector from "@/features/journey/components/WeekSelector";
import GreetingBlock from "@/features/journey/components/GreetingBlock";
import JourneyDetails from "@/features/journey/components/JourneyDetails";
import type { JourneyData } from "@/features/journey/components/JourneyDetails";

export default function JourneyPage() {
  const params = useParams();
  const weekNumber = Number(params?.weekNumber);

  const [data, setData] = useState<JourneyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!weekNumber) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weeks/${weekNumber}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Error fetching data");
        }

        const result = await res.json();
        setData(result);
      })
      .catch((err) => {
        console.error(err);
        setError("Помилка завантаження даних");
      });
  }, [weekNumber]);

  if (!data && !error) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="dashboard">
      <div className="container">
        <GreetingBlock week={weekNumber} />

        <WeekSelector
          currentWeek={weekNumber}
          userWeek={weekNumber}
        />

        <JourneyDetails data={data} />
      </div>
    </main>
  );
}