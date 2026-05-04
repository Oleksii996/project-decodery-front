"use client";

import { useState } from "react";
import Tabs from "./Tabs";
import BabyCard from "./BabyCard";
import MomCard from "./MomCard";
import styles from "./JourneyDetails.module.css";

type Props = {
  data: any;
};

export default function JourneyDetails({ data }: Props) {
  const [tab, setTab] = useState<"baby" | "mom">("baby");

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Tabs tab={tab} setTab={setTab} />

      <div className={styles.content}>
        {tab === "baby" && <BabyCard data={data.baby} />}

        {tab === "mom" && (
          <div className={styles.grid}>
            <MomCard data={data.mom} />
            
          </div>
        )}
      </div>
    </div>
  );
}