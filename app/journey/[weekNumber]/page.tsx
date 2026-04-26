"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Tabs from "@/components/Tabs";
import BabyCard from "@/components/BabyCard";
import MomCard from "@/components/MomCard";
import WeekSelector from "@/components/WeekSelector";

export default function JourneyPage() {
  const params = useParams();
  const weekNumber = params.weekNumber as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"baby" | "mom">("baby");

  useEffect(() => {
    if (!weekNumber) return;

    setLoading(true);

    fetch(`http://localhost:5000/api/weeks/${weekNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setLoading(false);
      });
  }, [weekNumber]);

  if (loading) return <div>Loading...</div>;

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