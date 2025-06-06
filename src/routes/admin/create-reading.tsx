import { redirect, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/schedule-calendar";

import type { Reading } from "~/components/calendar";
import { ReadingFormDialog } from "~/components/reading/reading-form-dialog";
import { createReading } from "~/lib/database";

export function meta() {
  return [
    { title: "Create Reading" },
    { name: "description", content: "Create a new reading" },
  ];
}

export async function action({ context, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const reading = {
    id: null,
    label: formData.get("label") as string,
    passages: [formData.get("passages") as string],
    date: new Date(formData.get("date") as string),
    context: formData.get("context") as string,
    summary: formData.get("summary") as string,
    lesson: formData.get("lesson") as string,
    published: true,
  } as Reading;

  const challengeId = 1;
  const result = await createReading(
    context.cloudflare.env.DB,
    challengeId,
    reading,
  );

  console.log("Result from action:", result);

  if (result.success) {
    reading.id = result.meta.last_row_id;
    /*
    addReading(reading);

    localStorage.setItem(
      "flash",
      JSON.stringify({ type: "reading-added", reading }),
    );
   */

    return redirect("/admin/calendar");
  } else {
    throw new Error("Failed to create reading");
  }
}

/*
export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const reading = {
    id: "reading-day-" + Math.random().toString(16).slice(2, 10),
    dayNumber: Number.parseInt(formData.get("label") as string, 10),
    passages: [formData.get("passages") as string],
    date: new Date(formData.get("date") as string),
    context: formData.get("context") as string,
    summary: formData.get("summary") as string,
    lesson: formData.get("lesson") as string,
  } as Reading;

  addReading(reading);

  localStorage.setItem(
    "flash",
    JSON.stringify({ type: "reading-added", reading }),
  );

  return redirect("/admin/calendar");
}
 */

export default function CreateReading() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reading = {
    date: searchParams.has("date")
      ? new Date(searchParams.get("date")!)
      : new Date(),
    passages: [] as string[],
  } as Reading;

  return (
    <ReadingFormDialog
      reading={reading}
      action={undefined}
      isOpen={true}
      onClose={() => navigate("/admin/calendar")}
    />
  );
}
