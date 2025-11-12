# PlannerX — Vercel-only Deploy (Drag & Deploy)

This folder is ready to deploy on **Vercel** with almost no setup.

## TL;DR — Fastest path

1. **Create a GitHub repo** and upload this folder's contents.
2. In Vercel: **Import Git Repository** → pick your repo.
3. When prompted, click **"Add Vercel Postgres"** (this injects `DATABASE_URL`).
4. Add one env var: `NEXTAUTH_SECRET` (any long random string).
5. Deploy. Done 🎉

The build script automatically runs Prisma migrations:  
`npm run build` → `prisma migrate deploy && next build`

## URLs to use

- `NEXTAUTH_URL` should be your Vercel URL, e.g. `https://your-project.vercel.app`.

You can set it upfront in your Vercel Project → Settings → Environment Variables. If omitted, NextAuth will infer from request host in many cases, but setting it is safest.

## After deploy

- Visit your domain → Sign up (email + password + **unique username**) → Log in.
- **Dashboard**: add items, toggle public, create invite links.
- **Public page**: `/planner/<username>`
- **Explore**: `/explore`

## Notes

- Database = **Vercel Postgres** (you added it in step 3).
- Prisma migrations run automatically at build.
- No local setup required.
- If you later fork/modify code, just push to GitHub to redeploy.
