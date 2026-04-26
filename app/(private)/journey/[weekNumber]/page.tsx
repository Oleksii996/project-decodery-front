 "use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Tabs from "@/components/journey/Tabs";
import BabyCard from "@/components/journey/BabyCard";
import MomCard from "@/components/journey/MomCard";
import WeekSelector from "@/components/journey/WeekSelector";

export default function JourneyPage() {
  const params = useParams();
  const weekNumber = params?.weekNumber as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"baby" | "mom">("baby");

  useEffect(() => {
    if (!weekNumber) return;

    setLoading(true);

    fetch(`http://localhost:3000/api/weeks/${weekNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setError("Something went wrong");
        setLoading(false);
      });
  }, [weekNumber]);

  if (loading || !data) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1>Week {data.week}</h1>
        <p>Days to birth: {data.daysToBirth}</p>

        <WeekSelector currentWeek={data.week} />

        <Tabs tab={tab} setTab={setTab} />

        {tab === "baby" && <BabyCard data={data.baby} />}
        {tab === "mom" && <MomCard data={data.mom} />}
      </div>
    </div>
  );
}