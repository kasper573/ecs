import { Request } from "express";
import { UserId } from "../models/User";

export function getSessionUserId(request: Request): UserId | undefined {
  return "bogus" as UserId;
}
