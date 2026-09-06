# Convex backend (community features)

Powers cross-device progress sync, course chat, and "who is online" presence.
The site works without it — these files only matter once you run:

```bash
npx convex dev        # first run: log in + create a project, writes VITE_CONVEX_URL to .env.local
npx convex deploy     # production
```

Then in the Convex dashboard set `CLERK_JWT_ISSUER_DOMAIN` (from your Clerk
JWT template named `convex`). See ../SETUP.md for the full walkthrough.
