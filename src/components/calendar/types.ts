export type CalendarView = "month" | "week" | "day" | "agenda";

export interface Reading {
  id: string;
  dayNumber: number;
  passages: string[];
  date: Date;
  context?: string;
  summary?: string;
  lesson?: string;
}
