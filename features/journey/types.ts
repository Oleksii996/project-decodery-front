export interface BabyData {
  image?: string;
  description: string;
  size: string;
  facts: string[];
  analogy: string;
}

export interface MomTip {
  category: 'Харчування' | 'Активність' | 'Відпочинок та комфорт' | string;
  tip: string;
}

export interface MomData {
  states: string[];
  description: string;
  tips: MomTip[];
}

export type JourneyWeek = {
  data: JourneyWeek;
  weekNumber: number;
  userWeek: number;
  daysToBirth: number | null;
  baby: BabyData;
  mom: MomData;
};
