import { Cookie } from "@mjackson/headers";
import { redirect } from "react-router";
import { VerifyEmailForm } from "~/components/verify-email-form";
import { getAuthenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import type { Route } from "./+types/verify";

export async function action({ request, context }: Route.ActionArgs) {
  const authenticator = getAuthenticator(context.cloudflare.env);

  try {
    return await authenticator.authenticate("otp", request);
  } catch (error) {
    if (error instanceof Response) {
      const cookie = new Cookie(error.headers.get("Set-Cookie") || "");
      const totpCookie = cookie.get("_totp");

      if (totpCookie) {
        const params = new URLSearchParams(totpCookie);
        return { error: params.get("error") };
      }

      throw error;
    }

    return { error: "Invalid TOTP" };
  }
}

/**
 * Loader function that checks if the currentUser is already authenticated.
 * - If the currentUser is already authenticated, redirect to dashboard.
 * - If the currentUser is not authenticated, check if the intent is to verify via magic-link URL.
 */
export async function loader({ request, context }: Route.LoaderArgs) {
  const authenticator = getAuthenticator(context.cloudflare.env);

  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (user) return redirect("/admin/calendar");

  // Get token from the URL.
  const url = new URL(request.url);
  const token = url.searchParams.get("t");

  // Authenticate the currentUser via magic-link URL.
  if (token) {
    try {
      return await authenticator.authenticate("TOTP", request);
    } catch (error) {
      if (error instanceof Response) return error;
      if (error instanceof Error) {
        console.error(error);
        return { authError: error.message };
      }
      return { authError: "Invalid TOTP" };
    }
  }

  // Get TOTP cookie values.
  const cookie = new Cookie(request.headers.get("Cookie") || "");
  const totpCookieValue = cookie.get("_totp");

  if (totpCookieValue) {
    const params = new URLSearchParams(totpCookieValue);
    return {
      authEmail: params.get("email"),
      authError: params.get("error"),
    };
  }

  // If the TOTP cookie is not found, redirect to the login page.
  throw redirect("/auth/login");
}

export default function VerifyLoginPage({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  console.log(actionData, loaderData);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyEmailForm action="/auth/verify" />
      </div>
    </div>
  );
}
