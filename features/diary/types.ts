export interface Diary {
  _id?: string;
  title: string;
  description: string;
  date: string;
  emotions: string[];
}

export interface AxiosGetAllDiariesResponse {
  diaries: Diary[];
}
