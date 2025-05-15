import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/schedule-calendar";

import { ReadingFormDialog } from "~/components/reading/reading-form-dialog";
import { addReading } from "~/lib/storage";

export function meta() {
  return [
    { title: "Create Reading" },
    { name: "description", content: "Create a new reading" },
  ];
}

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

export default function CreateReading() {
  const navigate = useNavigate();

  return (
    <ReadingFormDialog
      reading={null}
      action={null}
      isOpen={true}
      onClose={() => navigate(-1)}
    />
  );
}
