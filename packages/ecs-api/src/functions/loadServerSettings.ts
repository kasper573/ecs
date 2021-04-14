import { CorsOptions } from "cors";

export function loadServerSettings() {
  const originStr = process.env.ECS_API_CORS_ORIGIN;
  const origin: CorsOptions["origin"] = originStr
    ? originStr.split(",")
    : undefined;

  const port = parseInt(process.env.ECS_API_PORT ?? "80", 10);

  const morganFormat: string | undefined = process.env.ECS_API_MORGAN_FORMAT;

  return { origin, port, morganFormat };
}

export type ServerSettings = ReturnType<typeof loadServerSettings>;
