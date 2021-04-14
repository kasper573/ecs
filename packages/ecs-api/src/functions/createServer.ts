import { default as express } from "express";
import cors from "cors";
import morgan from "morgan";
import { routes } from "../routes";
import { ServerSettings } from "./loadServerSettings";

export function createServer({ origin, morganFormat }: ServerSettings) {
  // Initialize app and add middlewares
  const app = express();
  app.use(cors({ origin }));
  if (morganFormat) {
    app.use(morgan(morganFormat));
  }

  // Add api routes
  routes.forEach((route) => app[route.method](route.path, route.handlers));
  return app;
}
