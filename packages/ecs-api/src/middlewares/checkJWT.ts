const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

export const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [process.env.AUTH0_ISSUER],
  algorithms: [process.env.AUTH0_ALGORITHM],
});
