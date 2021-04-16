import https from "https";
import { default as express, Express, Handler } from "express";
import cors from "cors";
import morgan from "morgan";
import { ServerSettings } from "./loadServerSettings";

export function createServer(
  { origin, morganFormat, ssl }: ServerSettings,
  routes: ServerRoute[]
) {
  // Initialize app and add middlewares
  const app = express();
  app.use(cors({ origin }));
  if (morganFormat) {
    app.use(morgan(morganFormat));
  }

  // Add api routes
  routes.forEach((route) => app[route.method](route.path, route.handlers));
  if (ssl) {
    console.log("Using SSL");
    return https.createServer(ssl, app);
  }
  return app;
}

export type ServerRoute = {
  method: keyof Express;
  path: string;
  handlers: Handler | Handler[];
};
