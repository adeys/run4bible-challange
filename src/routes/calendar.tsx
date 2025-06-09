import { ReadingCalendar } from "~/components/calendar";
import { fetchReadings } from "~/services/database.server";
import type { Route } from "./+types/calendar";

export function meta() {
  return [
    { title: "#RUN4BIBLE Challenge Calendar" },
    { name: "description", content: "Welcome to the #RUN4BIBLE Challenge" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const result = await fetchReadings(context.cloudflare.env.DB);

  return { readings: result.results };
}

/*
export async function clientLoader() {
  return {
    readings: getAllReadings(),
  };
}
clientLoader.hydrate = true as const;
 */

export default function Calendar({ loaderData }: Route.ComponentProps) {
  const { readings } = loaderData;

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

      <ReadingCalendar readings={readings} />
    </div>
  );
}
