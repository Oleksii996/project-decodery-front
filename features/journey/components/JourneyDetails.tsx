"use client";

import { useState } from "react";
import Tabs from "./Tabs";
import BabyCard from "./BabyCard";
import MomCard from "./MomCard";
import styles from "./JourneyDetails.module.css";

export default function JourneyDetails({ data }: any) {
  const [tab, setTab] = useState<"baby" | "mom">("baby");

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Tabs tab={tab} setTab={setTab} />

      <div className={styles.content}>
        {tab === "baby" && <BabyCard data={data.baby} />}
        {tab === "mom" && <MomCard data={data.mom} />}
      </div>
    </div>
  );
}