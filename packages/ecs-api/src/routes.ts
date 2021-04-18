import { publishHandlers } from "./controllers/publish";
import { getSystem } from "./controllers/getSystem";
import { unpublishHandlers } from "./controllers/unpublish";
import { isPublished } from "./controllers/isPublished";

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
  {
    path: "/published/:id",
    method: "get" as const,
    handlers: isPublished,
  },
];
