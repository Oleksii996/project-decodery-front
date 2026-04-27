 "use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import WeekSelector from "@/features/journey/components/WeekSelector";
import GreetingBlock from "@/features/journey/components/GreetingBlock";
import JourneyDetails from "@/features/journey/components/JourneyDetails";

export default function JourneyPage() {
  const params = useParams();
  const weekNumber = params?.weekNumber as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!weekNumber) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/weeks/${weekNumber}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Немає даних для цього тижня");
        setLoading(false);
      });
  }, [weekNumber]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <GreetingBlock week={data.week} />

        <WeekSelector currentWeek={data.week} />

        <JourneyDetails data={data} />
      </div>
    </div>
  );
}