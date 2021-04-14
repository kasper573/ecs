import { publishHandlers } from "./controllers/publish";
import { getSystem } from "./controllers/getSystem";
import { unpublishHandlers } from "./controllers/unpublish";

export const routes = [
  {
    path: "/publish",
    method: "post" as const,
    handlers: publishHandlers,
  },
  {
    path: "/unpublish/:id",
    method: "delete" as const,
    handlers: unpublishHandlers,
  },
  {
    path: "/system/:id",
    method: "get" as const,
    handlers: getSystem,
  },
];
