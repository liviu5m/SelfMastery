export interface GroupMuscle {
  name: string;
}

export interface Muscle {
  group_muscle: GroupMuscle;
}

export interface GymSplitDay {
  day_name: string;
  split: string;
  GymSplitDaysMuscle: Muscle[];
}

export interface GymSplit {
  GymSplitDays: GymSplitDay[];
  name: string;
}
export interface Split {
  id: number;
  name: String;
  createdAt: String;
  updatedAt: String;
}

export interface Journey {
  id: number;
  gym_split_id: number | null;
  week_split_id: number | null;
  createdAt: String;
  updatedAt: String;
}

export type SplitSchedule = {
  Monday: string | number;
  Tuesday: string | number;
  Wednesday: string | number;
  Thursday: string | number;
  Friday: string | number;
  Saturday: string | number;
  Sunday: string | number;
};

export interface DayState {
  active: boolean;
  day?: string;
}

export type SplitState = {
  Monday: DayState;
  Tuesday: DayState;
  Wednesday: DayState;
  Thursday: DayState;
  Friday: DayState;
  Saturday: DayState;
  Sunday: DayState;
};
