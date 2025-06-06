export type CalendarView = "month" | "week" | "day" | "agenda";

export interface Reading {
  id: number | null;
  uuid: string;
  label?: string;
  date: Date;
  passages: string[];
  published?: boolean;
  context?: string;
  summary?: string;
  lesson?: string;
}
