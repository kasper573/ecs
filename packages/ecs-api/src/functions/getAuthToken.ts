import { Request } from "express";

export function getAuthToken(request: Request) {
  const auth = /^Bearer (.*)$/.exec(request.header("Authorization") ?? "");
  return auth ? auth[1] : undefined;
}
