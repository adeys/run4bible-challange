import { Resend } from "resend";
import LoginEmail from "~/emails/login-email";

let resend: Resend;

export function getResendClient(env: Env): Resend {
  if (!resend) {
    resend = new Resend(env.RESEND_API_KEY);
  }

  return resend;
}

interface LoginEmailOptions {
  email: string;
  token: string;
  loginLink: string;
}

export function sendLoginMail(
  env: Env,
  { email, token, loginLink }: LoginEmailOptions,
) {
  const resend = getResendClient(env);

  return resend.emails.send({
    from: "RUN4BIBLE Test <onboarding@resend.dev>",
    to: email,
    subject: "Your RUN4BIBLE login link",
    react: <LoginEmail email={email} token={token} loginLink={loginLink} />,
  });
}
