import { postPublish } from "./controllers/postPublish";
import { getSystem } from "./controllers/getSystem";
import { deleteUnpublish } from "./controllers/deleteUnpublish";

export const routes = [
  {
    path: "/publish",
    method: "post" as const,
    handlers: postPublish,
  },
  {
    path: "/unpublish/:id",
    method: "delete" as const,
    handlers: deleteUnpublish,
  },
  {
    path: "/system/:id",
    method: "get" as const,
    handlers: getSystem,
  },
];
