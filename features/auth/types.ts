export interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  gender: 'boy' | 'girl' | null;
  dueDate: string | null;
  avatar: string;
}

export interface PregnancyProgress {
  currentWeek: number;
  daysUntilDueDate: number;
  weeksLeft: number;
}

export interface RegisterResponse {
  user: User;
  pregnancyProgress: PregnancyProgress;
}
