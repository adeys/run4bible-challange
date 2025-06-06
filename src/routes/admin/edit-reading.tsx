import { redirect, useNavigate } from "react-router";

import type { Reading } from "~/components/calendar";
import type { Route } from "./+types/edit-reading";

import { ReadingFormDialog } from "~/components/reading/reading-form-dialog";
import { findReading, updateReading } from "~/lib/database";

export function meta() {
  return [
    { title: "Edit Reading" },
    { name: "description", content: "Edit a reading" },
  ];
}

export async function loader({ context, params }: Route.LoaderArgs) {
  const readingId = params.readingId;
  if (!readingId) {
    throw new Error("Reading ID is required");
  }

  const reading = await findReading(context.cloudflare.env.DB, readingId);
  if (!reading) {
    throw new Error(`Reading with ID ${readingId} not found`);
  }

  return { reading };
}

export async function action({ context, request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const reading = {
    uuid: params.readingId,
    label: formData.get("label") as string,
    passages: [formData.get("passages") as string],
    date: new Date(formData.get("date") as string),
    context: formData.get("context") as string,
    summary: formData.get("summary") as string,
    lesson: formData.get("lesson") as string,
    // published: formData.get("published") === "on",
    published: true,
  } as Reading;

  const result = await updateReading(context.cloudflare.env.DB, reading);

  console.log("Result from action:", result);

  return redirect("/admin/calendar");
}

/*
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
 */

export default function EditReading({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <ReadingFormDialog
      reading={loaderData.reading}
      action={undefined}
      isOpen={true}
      onClose={() => navigate("/admin/calendar")}
    />
  );
}
