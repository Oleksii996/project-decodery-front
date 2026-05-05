"use client";

import { useState } from "react";
import Tabs from "./Tabs";
import BabyCard from "./BabyCard";
import MomCard from "./MomCard";
import styles from "./JourneyDetails.module.css";

type Props = {
  data: JourneyData | null;
};

export type JourneyTip = {
  category: string;
  tip: string;
};

export type JourneyBabyData = {
  image?: string;
  description: string;
  size: string;
  facts?: string[];
};

export type JourneyMomData = {
  states?: string[];
  description: string;
  tips?: JourneyTip[];
};

export type JourneyData = {
  baby: JourneyBabyData;
  mom: JourneyMomData;
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