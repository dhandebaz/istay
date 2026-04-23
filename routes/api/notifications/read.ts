import { type Handlers } from "$fresh/server.ts";
import { markAllNotificationsAsRead, markNotificationAsRead } from "../../../utils/db.ts";
import { DashboardState } from "../../../utils/types.ts";

export const handler: Handlers<any, DashboardState> = {
  POST: async (req, ctx) => {
    const { hostId } = ctx.state;
    if (!hostId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const { id, all } = await req.json();

      if (all) {
        const ok = await markAllNotificationsAsRead(hostId);
        return Response.json({ ok });
      }

      if (id) {
        const ok = await markNotificationAsRead(id);
        return Response.json({ ok });
      }

      return Response.json({ error: "Missing notification ID or 'all' flag" }, { status: 400 });
    } catch (err) {
      console.error("[api/notifications/read] Failed:", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
