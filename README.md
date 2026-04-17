# Certification Path Finder

Career path and certification explorer for Data, Cloud, Security, AI, and Software tracks.

## Local Development

Prerequisites: Node.js 20+ and npm.

1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm run dev`
3. Open:
   - `http://localhost:5173`

## Production Build Check

Run these before deploying:

- `npm run lint`
- `npm run build`
- `npm run preview`

## GitHub Push (First Time)

1. Initialize git (if needed):
   - `git init`
2. Commit your code:
   - `git add .`
   - `git commit -m "Prepare production-ready Vercel deployment"`
3. Add your GitHub remote:
   - `git remote add origin <your-repo-url>`
4. Push:
   - `git branch -M main`
   - `git push -u origin main`

## Easy Vercel Deployment (GitHub)

1. Go to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. Vercel auto-detects this as a Vite app using `vercel.json`.
4. Click **Deploy**.

For every new push to `main`, Vercel will auto-deploy.

## Notes

- Static frontend output is in `dist/`.
- API routes are in `api/` (`/api/roadmaps`, `/api/roadmaps/:id`).
- The NCPL logo is served from `public/ncpl-logo.png`.
