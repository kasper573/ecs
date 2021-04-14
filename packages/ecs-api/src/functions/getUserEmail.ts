import fetch from "node-fetch";

export async function getUserEmail(accessToken: string) {
  const response = await fetch(process.env.AUTH0_PROFILE_URI as string, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { email } = (await response.json()) as Auth0Profile;
  return email;
}

type Auth0Profile = { email: string; [key: string]: unknown };
