import { Auth0Provider } from "@auth0/auth0-react";
import { ComponentProps } from "react";

export const auth0Config: ComponentProps<typeof Auth0Provider> = {
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_CLIENT_ID as string,
  redirectUri: window.location.origin,
};
