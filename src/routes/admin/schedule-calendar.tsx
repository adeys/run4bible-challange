import { Outlet } from "react-router";

import type { Route } from "./+types/schedule-calendar";

import { ScheduleCalendar } from "~/components/calendar";
import { fetchReadings } from "~/services/database.server";

export function meta() {
  return [
    { title: "#RUN4BIBLE Challenge Calendar" },
    { name: "description", content: "Welcome to the #RUN4BIBLE Challenge" },
  ];
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const result = await fetchReadings(context.cloudflare.env.DB);
  return { readings: result.results };
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>
  );
}

export default function Calendar({ loaderData }: Route.ComponentProps) {
  const { readings } = loaderData;

  return (
    <>
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
    </>
  );
}
