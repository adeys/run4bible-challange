import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/calendar", "routes/calendar.tsx"),

  route("/auth/login", "routes/auth/login.tsx"),
  route("/auth/verify", "routes/auth/verify.tsx"),
  route("/auth/logout", "routes/auth/logout.tsx"),

  layout("routes/admin/layout.tsx", [
    route("/admin/calendar", "routes/admin/schedule-calendar.tsx", [
      route("reading/create", "routes/admin/create-reading.tsx"),
      route("reading/:readingId", "routes/admin/edit-reading.tsx"),
      route("reading/:readingId/destroy", "routes/admin/destroy-reading.ts"),
    ]),
  ]),
] satisfies RouteConfig;
