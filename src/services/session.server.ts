import { createCookieSessionStorage } from "react-router";
import type { User } from "~/services/auth.server";

type SessionData = {
  user: User;
};

type SessionFlashData = {
  error: string;
  success: string;
  flash: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "_session",

      // All of these are optional
      // domain: "reactrouter.com",
      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!

      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"], // TODO: Use a secure secret in production
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
