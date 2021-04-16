import * as path from "path";
import * as fs from "fs";
import { ServerOptions } from "https";
import { CorsOptions } from "cors";

export function loadServerSettings(): ServerSettings {
  const originStr = process.env.ECS_API_CORS_ORIGIN;
  const origin: CorsOptions["origin"] = originStr
    ? originStr.split(",")
    : undefined;

  const key = requireFile(process.env.SSL_KEY);
  const cert = requireFile(process.env.SSL_CERT);
  const ssl = key && cert ? { key, cert } : undefined;

  return {
    origin,
    port: parseInt(process.env.ECS_API_PORT!, 10),
    morganFormat: process.env.ECS_API_MORGAN_FORMAT!,
    ssl,
  };
}

export type ServerSettings = {
  origin: CorsOptions["origin"];
  port: number;
  morganFormat: string;
  ssl?: Pick<ServerOptions, "key" | "cert">;
};

function requireFile(path?: string) {
  if (path) {
    if (fs.existsSync(path)) {
      return fs.readFileSync(path);
    } else {
      console.warn(`Missing: ${path}`);
    }
  }
}
