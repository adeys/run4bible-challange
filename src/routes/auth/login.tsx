import { redirect } from "react-router";
import { LoginForm } from "~/components/login-form";
import { getAuthenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import type { Route } from "./+types/login";

export async function action({ request, context }: Route.ActionArgs) {
  const authenticator = getAuthenticator(context.cloudflare.env);

  try {
    // Authenticate the currentUser via TOTP (Form submission).
    return await authenticator.authenticate("otp", request);
  } catch (error) {
    // The error from TOTP includes the redirect Response with the cookie.
    if (error instanceof Response) {
      return error;
    }

    // For other errors, return with an error message.
    console.log("error", error);

    return {
      error: "An error occurred during login. Please try again.",
    };
  }
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  if (user) {
    // If the currentUser is already authenticated, redirect to the dashboard.
    return redirect("/admin/calendar");
  }
}

export default function LoginPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  console.log("Login page data", loaderData, actionData);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm action="/auth/login" />
      </div>
    </div>
  );
}
