import { auth0Config } from "../../../../auth0Config";

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

export const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: auth0Config.jwksUri,
  }),
  audience: auth0Config.audience,
  issuer: [auth0Config.issuer],
  algorithms: [auth0Config.algorithm],
});
