import { redirect } from "react-router";
import { deleteReading } from "~/lib/database";
import { commitSession, getSession } from "~/server/session.server";
import type { Route } from "./+types/destroy-reading";

export async function action({ context, request, params }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const result = await deleteReading(
    context.cloudflare.env.DB,
    params.readingId,
  );

  if (result.meta.changes > 0) {
    session.flash("success", "Reading deleted successfully!");
  } else {
    session.flash("error", "Failed to delete reading.");
  }

  return redirect("/admin/calendar", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
