import { Request } from "express";
import { UserId } from "../models/User";
import { getAuthToken } from "./getAuthToken";
import { getUserEmail } from "./getUserEmail";

export async function getUserId(request: Request) {
  const token = getAuthToken(request);
  if (token) {
    try {
      const email = await getUserEmail(token);
      return email as UserId;
    } catch {}
  }
}
