import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/calendar", "routes/calendar.tsx"),

  route("/admin/calendar", "routes/admin/schedule-calendar.tsx", [
    route("reading/create", "routes/admin/create-reading.tsx"),
    route("reading/:readingId", "routes/admin/edit-reading.tsx"),
    route("reading/:readingId/destroy", "routes/admin/destroy-reading.ts"),
  ]),
] satisfies RouteConfig;
