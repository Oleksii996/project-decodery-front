export interface DashboardBaby {
  analogy: string | null;
  babySize: number;
  babyWeight: number;
  image: string;
  interestingFact: string;
}

export interface WeeksDashboardData {
  weekNumber: number;
  daysUntilDueDate: number;
  baby: DashboardBaby;
  momTip: string;
}

export interface WeeksDashboardResponse {
  status: number;
  message: string;
  data: WeeksDashboardData;
}

export interface BabyWeekData {
  _id: string;
  analogy: string | null;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}

export interface BabyWeekResponse {
  status: number;
  message: string;
  data: BabyWeekData;
}

type DiaryEntry = {
  id: number;
  title: string;
  text: string;
  date: string;
  categories: string[];
};
