import { postPublish } from "./controllers/postPublish";
import { getSystem } from "./controllers/getSystem";

export const routes = [
  {
    path: "/publish",
    method: "post" as const,
    handlers: postPublish,
  },
  {
    path: "/system/:id",
    method: "get" as const,
    handlers: getSystem,
  },
];
