import { useEffect } from "react";
import { Outlet, data } from "react-router";
import { toast } from "sonner";

import type { Route } from "./+types/schedule-calendar";

import { ScheduleCalendar } from "~/components/calendar";
import { Toaster } from "~/components/ui/sonner";
import { fetchReadings } from "~/lib/database";
import { commitSession, getSession } from "~/server/session.server";

export function meta() {
  return [
    { title: "#RUN4BIBLE Challenge Calendar" },
    { name: "description", content: "Welcome to the #RUN4BIBLE Challenge" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const result = await fetchReadings(context.cloudflare.env.DB);
  const session = await getSession(request.headers.get("Cookie"));

  return data(
    {
      readings: result.results,
      flash: {
        error: session.get("error"),
        success: session.get("success"),
      },
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>
  );
}

export default function Calendar({ loaderData }: Route.ComponentProps) {
  const { readings, flash } = loaderData;

  useEffect(() => {
    const { error, success } = flash;

    if (error) {
      toast.error(error, { position: "top-center" });
    }

    if (success) {
      toast.success(success, { position: "top-center" });
    }
  }, [flash]);

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
