"use client";

import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import type { Reading } from "./types";

interface MonthViewProps {
  currentDate: Date;
  readings: Reading[];
  onCellClick?: (date: Date, reading: Reading | null) => void;
}

export function MonthView({
  currentDate,
  readings = [],
  onCellClick,
}: MonthViewProps) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const weekdays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(startOfWeek(new Date()), i);
      return format(date, "EEE");
    });
  }, []);

  const weeks = useMemo(() => {
    const result = [];
    let week = [];

    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7 || i === days.length - 1) {
        result.push(week);
        week = [];
      }
    }

    return result;
  }, [days]);

  const handleCellClick = (
    e: React.MouseEvent,
    date: Date,
    reading: Reading | null,
  ) => {
    e.stopPropagation();
    onCellClick && onCellClick(date, reading);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div data-slot="month-view" className="contents">
      <div className="border-border/70 grid grid-cols-7 border-b">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-muted-foreground/70 py-2 text-center text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid flex-1 auto-rows-fr">
        {weeks.map((week, weekIndex) => (
          <div
            key={`week-${weekIndex}`}
            className="grid grid-cols-7 [&:last-child>*]:border-b-0"
          >
            {week.map((day, dayIndex) => {
              if (!day) return null; // Skip if day is undefined

              const isCurrentMonth = isSameMonth(day, currentDate);
              const cellId = `month-cell-${day.toISOString()}`;
              const reading =
                readings.find((reading) => isSameDay(day, reading.date)) ||
                null;

              const isReferenceCell = weekIndex === 0 && dayIndex === 0;

              return (
                <div
                  key={day.toString()}
                  id={cellId}
                  className="group border-border/70 data-outside-cell:bg-muted/25 data-outside-cell:text-muted-foreground/70 border-r border-b last:border-r-0 px-2 py-1"
                  data-today={isToday(day) || undefined}
                  data-outside-cell={!isCurrentMonth || undefined}
                  onClick={() => {
                    const startTime = new Date(day);
                    startTime.setHours(0, 0, 0);
                  }}
                >
                  <div className="group-data-today:bg-primary group-data-today:text-primary-foreground mt-1 inline-flex size-6 items-center justify-center rounded-full text-sm">
                    {format(day, "d")}
                  </div>
                  <div
                    ref={null}
                    className="flex min-h-12 md:min-h-20 lg:min-h-24 cursor-pointer"
                  >
                    <div
                      className="grow flex flex-col gap-1 py-2 items-center justify-center rounded-md text-sm text-muted-foreground font-medium"
                      onClick={(e) => handleCellClick(e, day, reading)}
                    >
                      {reading && (
                        <>
                          <span className="font-semibold lg:font-bold text-center">
                            {reading.label}
                          </span>
                          <span className="hidden lg:inline-block">
                            {reading.passages.join(", ")}
                          </span>
                          <span className="hidden lg:inline-block text-center w-36 truncate">
                            {reading.context}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
