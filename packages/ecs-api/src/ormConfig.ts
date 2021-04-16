import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { PublishedSystem } from "./models/PublishedSystem";

export const ormConfig: PostgresConnectionOptions = {
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  logging: false,
  entities: [PublishedSystem],
};
