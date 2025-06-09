import { redirect } from "react-router";
import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { findUser } from "~/services/database.server";
import { sendLoginMail } from "~/services/email.server";
import { commitSession, getSession } from "~/services/session.server";

export type User = {
  id: string;
  email: string;
  username: string;
};

let authenticator: Authenticator<User>;

export function getAuthenticator(env: Env) {
  if (!authenticator) {
    authenticator = new Authenticator<User>();
    authenticator.use(
      new TOTPStrategy<User>(
        {
          secret: env.TOTP_ENCRYPTION_KEY,
          emailSentRedirect: "/auth/verify",
          magicLinkPath: "/auth/verify",
          successRedirect: "/admin/calendar",
          failureRedirect: "/auth/login",
          totpGeneration: {
            period: 600, // 10 minutes
          },
          sendTOTP: async ({ email, magicLink, code, request }) => {
            const data = await sendLoginMail(env, {
              email,
              token: code,
              loginLink: magicLink,
            });

            console.log("TOTP Mail Response", data);

            if (data.error) {
              const session = await getSession(request.headers.get("Cookie"));
              session.flash("error", data.error.message);
              throw redirect("/auth/login", {
                headers: {
                  "Set-Cookie": await commitSession(session),
                },
              });
            }
          },
        },
        async ({ email, request }) => {
          const user = await findUser(env.DB, email);
          if (!user) {
            throw new Error("Invalid credentials : currentUser not found");
          }

          const session = await getSession(request.headers.get("Cookie"));
          session.set("user", user);

          // Redirect to your authenticated route.
          throw redirect("/admin/calendar", {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
          });
        },
      ),
      "otp",
    );
  }

  return authenticator;
}
