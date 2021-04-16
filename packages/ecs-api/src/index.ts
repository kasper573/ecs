import "reflect-metadata";
import { createConnection } from "typeorm";
import { ormConfig } from "./ormConfig";
import { loadServerSettings } from "./functions/loadServerSettings";
import { createServer } from "./functions/createServer";
import { routes } from "./routes";

async function run() {
  try {
    await createConnection(ormConfig);
  } catch (e) {
    console.log("TypeORM connection error: ", e);
    return;
  }
  const settings = loadServerSettings();
  const app = createServer(settings, routes);
  app.listen(settings.port);
  console.log(
    `ECS API is running on port ${settings.port} (cors origin: ${settings.origin})`
  );
}

run();
