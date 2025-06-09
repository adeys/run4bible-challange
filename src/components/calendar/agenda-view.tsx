"use client";

import { RiCalendarEventLine } from "@remixicon/react";
import { addDays, format, isToday } from "date-fns";
import { useMemo } from "react";

import type { Reading } from "~/components/calendar";

interface AgendaViewProps {
  currentDate: Date;
  readings: Reading[];
  onReadingSelect?: (reading: Reading) => void;
}

export function AgendaView({
  currentDate,
  readings,
  onReadingSelect,
}: AgendaViewProps) {
  // Show readings for the next days based on constant
  const days = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) =>
      addDays(new Date(currentDate), i),
    );
  }, [currentDate]);

  const handleReadingClick = (reading: Reading, e: React.MouseEvent) => {
    e.stopPropagation();
    onReadingSelect?.(reading);
  };

  // Check if there are any days with readings
  const hasEvents = false;

  return (
    <div className="border-border/70 border-t px-4">
      {!hasEvents ? (
        <div className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
          <RiCalendarEventLine
            size={32}
            className="text-muted-foreground/50 mb-2"
          />
          <h3 className="text-lg font-medium">No readings found</h3>
          <p className="text-muted-foreground">
            There are no readings scheduled for this time period.
          </p>
        </div>
      ) : (
        days.map((day, idx) => {
          const dayEvents = [];

          if (dayEvents.length === 0) return null;

          return (
            <div
              key={day.toString()}
              className="border-border/70 relative my-12 border-t"
            >
              <span
                className="bg-background absolute -top-3 left-0 flex h-6 items-center pe-4 text-[10px] uppercase data-today:font-medium sm:pe-4 sm:text-xs"
                data-today={isToday(day) || undefined}
              >
                {format(day, "d MMM, EEEE")}
              </span>
              <div className="mt-6 space-y-2">Day {idx} reading</div>
            </div>
          );
        })
      )}
    </div>
  );
}
