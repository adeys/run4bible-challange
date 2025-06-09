import { useEffect } from "react";
import { Outlet, data, redirect } from "react-router";
import { toast } from "sonner";

import Navbar from "~/components/navbar";
import { Toaster } from "~/components/ui/sonner";
import { commitSession, getSession } from "~/services/session.server";

import type { Route } from "./+types/layout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  console.log("currentUser", user);

  // If the currentUser is not logged in, redirect to the login page with a flash message
  if (!user) {
    session.flash("error", "You must be logged in to access the calendar.");
    return redirect("/auth/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return data(
    {
      user,
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

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  const { flash, user } = loaderData;

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
    <div className="min-h-screen">
      <Navbar currentUser={user} />

      <div className="container mx-auto p-6 lg:p-8">
        <Outlet />
      </div>

      <Toaster />
    </div>
  );
}
