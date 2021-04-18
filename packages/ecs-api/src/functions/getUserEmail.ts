import fetch from "node-fetch";
import { auth0Config } from "../../../../auth0Config";

export async function getUserEmail(accessToken: string) {
  const response = await fetch(auth0Config.profileUri, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { email } = (await response.json()) as Auth0Profile;
  return email;
}

type Auth0Profile = { email: string; [key: string]: unknown };
