import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { PublishedSystem } from "./models/PublishedSystem";

export const ormConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "ecs",
  password: "ecs",
  database: "ecs",
  synchronize: true,
  logging: false,
  entities: [PublishedSystem],
};
