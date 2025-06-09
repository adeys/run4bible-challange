import { RiCalendarCheckLine } from "@remixicon/react";
import { addMonths, format, subMonths } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { MonthView, type Reading } from "~/components/calendar";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export interface CalendarProps {
  className?: string;
  readings?: Reading[];
}

export function ScheduleCalendar({ className, readings }: CalendarProps) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevious = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCellSelect = (date: Date, reading: Reading | null) => {
    return reading
      ? navigate(`/admin/calendar/reading/${reading.uuid}`)
      : navigate(
          `/admin/calendar/reading/create?date=${format(date, "yyyy-MM-dd")}`,
        );
  };

  const viewTitle = format(currentDate, "MMMM yyyy");

  return (
    <div
      className="flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1"
      style={
        {
          "--event-height": "24px",
          "--event-gap": "4px",
          "--week-cells-height": "64px",
        } as React.CSSProperties
      }
    >
      <>
        <div
          className={cn(
            "flex items-center justify-between p-2 sm:p-4",
            className,
          )}
        >
          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              variant="outline"
              className="aspect-square max-[479px]:p-0!"
              onClick={handleToday}
            >
              <RiCalendarCheckLine
                className="min-[480px]:hidden"
                size={16}
                aria-hidden="true"
              />
              <span className="max-[479px]:sr-only">Today</span>
            </Button>
            <div className="flex items-center sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                aria-label="Previous"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                aria-label="Next"
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </div>
            <h2 className="text-sm font-semibold sm:text-lg md:text-xl">
              {viewTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="aspect-square max-[479px]:p-0!">
              <Link to="/admin/calendar/reading/create">
                <PlusIcon
                  className="opacity-60 sm:-ms-1"
                  size={16}
                  aria-hidden="true"
                />
                <span className="max-sm:sr-only">New reading</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <MonthView
            currentDate={currentDate}
            readings={readings || []}
            onCellClick={handleCellSelect}
          />
        </div>
      </>
    </div>
  );
}
