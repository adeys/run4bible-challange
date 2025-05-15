import { format } from "date-fns";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { toast } from "sonner";

import type { Route } from "./+types/schedule-calendar";

import { ScheduleCalendar } from "~/components/calendar";
import { Toaster } from "~/components/ui/sonner";
import { getAllReadings } from "~/lib/storage";

export function meta() {
  return [
    { title: "#RUN4BIBLE Challenge Calendar" },
    { name: "description", content: "Welcome to the #RUN4BIBLE Challenge" },
  ];
}

export async function clientLoader() {
  return {
    readings: getAllReadings(),
  };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>
  );
}

export default function Calendar({ loaderData }: Route.ComponentProps) {
  const { readings } = loaderData;
  useEffect(() => {
    const flash = localStorage.getItem("flash");
    if (!flash) return;

    const { type, reading } = JSON.parse(flash);
    let message = "";
    if (type === "reading-added") {
      message = `Reading for day ${reading.dayNumber} added successfully!`;
    } else if (type === "reading-updated") {
      message = `Reading for day ${reading.dayNumber} updated successfully!`;
    }

    toast(message, {
      description: format(new Date(reading.date), "MMM d, yyyy"),
      position: "top-center",
    });

    localStorage.removeItem("flash");
  });

  return (
    <div className="min-h-screen container mx-auto p-6 lg:p-8">
      <hgroup>
        <h1 className="text-4xl font-bold mb-4">
          #RUN4BIBLE Challenge Calendar
        </h1>
        <p className="text-lg mb-8">
          Join us in the #RUN4BIBLE challenge! Track your progress and stay
          motivated.
        </p>
      </hgroup>

      <ScheduleCalendar readings={readings} />

      <Outlet />

      <Toaster />
    </div>
  );
}
