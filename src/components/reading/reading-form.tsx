import { RiCalendarLine } from "@remixicon/react";
import { format } from "date-fns";
import { useState } from "react";
import { Form } from "react-router";

import type { Reading } from "~/components/calendar";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

interface ReadingFormProps {
  action?: string;
  id?: string;
  reading?: Reading | null;
}

export function ReadingForm({
  action,
  id = "reading-form",
  reading,
}: ReadingFormProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(
    new Date(reading?.date || new Date()),
  );

  return (
    <Form method="post" action={action} id={id}>
      <div className="grid gap-4 py-4">
        <div className="*:not-first:mt-1.5">
          <Label htmlFor="label">Day label</Label>
          <Input
            id="label"
            type="number"
            name="label"
            defaultValue={reading?.dayNumber}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 *:not-first:mt-1.5">
            <Label htmlFor="date">Date</Label>
            <input type="hidden" name="date" value={startDate.toISOString()} />
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                    !reading?.date && "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "truncate",
                      !(reading?.date || startDate) && "text-muted-foreground",
                    )}
                  >
                    {reading?.date || startDate
                      ? format(reading?.date || startDate, "PPP")
                      : "Pick a date"}
                  </span>
                  <RiCalendarLine
                    size={16}
                    className="text-muted-foreground/80 shrink-0"
                    aria-hidden="true"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                  mode="single"
                  selected={reading?.date ?? new Date()}
                  defaultMonth={reading?.date ?? new Date()}
                  onSelect={(date) => {
                    if (date) {
                      setStartDate(date);
                      if (reading) reading.date = date;
                      setDateOpen(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="*:not-first:mt-1.5">
          <Label htmlFor="passages">Passages</Label>
          <Input
            id="passages"
            name="passages"
            defaultValue={reading?.passages.join(",")}
          />
        </div>

        <div className="*:not-first:mt-1.5">
          <Label htmlFor="context">Context</Label>
          <Textarea
            id="context"
            name="context"
            defaultValue={reading?.context}
            rows={3}
          />
        </div>

        <div className="*:not-first:mt-1.5">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            defaultValue={reading?.summary}
            rows={3}
          />
        </div>

        <div className="*:not-first:mt-1.5">
          <Label htmlFor="lesson">Lesson</Label>
          <Textarea
            id="lesson"
            name="lesson"
            defaultValue={reading?.lesson}
            rows={3}
          />
        </div>
      </div>
    </Form>
  );
}
