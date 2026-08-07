# Vercel Next.js Test Lab

A small public project for verifying core Vercel behavior with no database, secrets, or third-party services.

## What it tests

- Next.js App Router build and rendering
- Node.js serverless route at `/api/health`
- Server-rendered dynamic route at `/test/hello-vercel`
- Vercel deployment metadata such as environment, region, and commit SHA
- A project-level response header configured through `vercel.json`

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then try:

- [Dashboard](http://localhost:3000/)
- [Health API](http://localhost:3000/api/health)
- [Dynamic route](http://localhost:3000/test/hello-vercel)

## Verify

```bash
npm test
npm run lint
npm run build
```

## Deploy to Vercel

1. In Vercel, choose **Add New → Project**.
2. Import this GitHub repository.
3. Keep the detected framework preset as **Next.js**.
4. Leave the root directory, build command, output directory, and environment variables unchanged.
5. Select **Deploy**.

After deployment, open `/api/health`. It should return HTTP 200 with `"ok": true`. Responses also include `X-Vercel-Test-Project: active` when deployed through Vercel.
