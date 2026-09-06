/**
 * Convex ↔ Clerk trust configuration.
 * 1. In Clerk Dashboard → JWT Templates → create a template named "convex".
 * 2. Copy the Issuer URL (https://<your-app>.clerk.accounts.dev) into the
 *    Convex dashboard as the env var CLERK_JWT_ISSUER_DOMAIN.
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
