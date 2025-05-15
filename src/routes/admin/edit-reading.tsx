import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router";

import type { Reading } from "~/components/calendar";
import type { Route } from "./+types/schedule-calendar";

import { ReadingFormDialog } from "~/components/reading/reading-form-dialog";
import { getReadingById, updateReading } from "~/lib/storage";

export function meta() {
  return [
    { title: "Edit Reading" },
    { name: "description", content: "Edit a reading" },
  ];
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const reading = {
    id: params.readingId,
    dayNumber: Number.parseInt(formData.get("label") as string, 10),
    passages: [formData.get("passages") as string],
    date: new Date(formData.get("date") as string),
    context: formData.get("context") as string,
    summary: formData.get("summary") as string,
    lesson: formData.get("lesson") as string,
  } as Reading;

  updateReading(reading);
  localStorage.setItem(
    "flash",
    JSON.stringify({ type: "reading-updated", reading }),
  );

  return redirect("/admin/calendar");
}

export default function EditReading() {
  const navigate = useNavigate();
  const { readingId } = useParams();
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    if (readingId) {
      const reading = getReadingById(readingId);
      setReading(reading);
    }
  }, [readingId]);

  return (
    <ReadingFormDialog
      reading={reading}
      action={null}
      isOpen={true}
      onClose={() => navigate(-1)}
    />
  );
}
