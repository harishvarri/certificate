# Vercel Deployment Guide

## Overview
This app is now configured for **Vercel serverless deployment**. The backend API endpoints are implemented as Vercel serverless functions in the `/api` folder.

## Key Changes Made

### 1. **Vercel API Routes**
- Created `/api/roadmaps.ts` - handles `GET /api/roadmaps` requests
- Created `/api/roadmaps/[id].ts` - handles `GET /api/roadmaps/:id` requests
- These are serverless functions that replace the Express server

### 2. **Frontend Updates**
- Created `src/lib/api.ts` - helper functions for all API calls
- Updated `src/hooks/useRoadmaps.ts` - uses the new API helper
- Automatically detects dev vs production environment

### 3. **Configuration**
- Added `vercel.json` - Vercel build configuration
- Updated `package.json`:
  - Changed `dev` script from `tsx server.ts` to `vite`
  - Added `@vercel/node` to devDependencies
  - Removed unnecessary `@types/express` and `tsx`

## Local Development

```bash
# Install dependencies
npm install

# Run local dev server (Vite)
npm run dev

# The app will run on http://localhost:5173
# API calls will go to http://localhost:3000 (configure as needed)
```

## Deployment to Vercel

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Connect GitHub to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect the configuration

### Environment Variables
If you have any API keys or secrets:
1. Go to Vercel Project Settings → Environment Variables
2. Add your variables (e.g., `GEMINI_API_KEY`)
3. They'll be available in serverless functions and the build

## How It Works

### Development (localhost)
```
Frontend (Vite) → API Helper → localhost:3000/api/...
```

### Production (Vercel)
```
Frontend (Static) → API Helper → *.vercel.app/api/... (serverless functions)
```

The `getApiBaseUrl()` in `src/lib/api.ts` automatically handles this.

## Testing API Endpoints

### Locally
```bash
curl http://localhost:3000/api/roadmaps
curl http://localhost:3000/api/roadmaps/aws
```

### After Deployment
```bash
curl https://your-project.vercel.app/api/roadmaps
curl https://your-project.vercel.app/api/roadmaps/aws
```

## Common Issues

### ❌ "Cannot find module '@vercel/node'"
**Solution:** Run `npm install` to install dependencies

### ❌ "API is returning 404"
**Solution:** Check that `/api` folder exists at the root, not in `src/`

### ❌ "Environment variables not working"
**Solution:** Add them in Vercel Project Settings, not in `.env.local`

## Removing Old Express Server

The `server.ts` file is no longer needed for deployment. You can:
- Keep it for reference, or
- Delete it: `rm server.ts`

The Express dependencies have been removed from package.json.

## Next Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Deploy to Vercel:**
   - Connect your GitHub repo to Vercel, or
   - Use `vercel deploy`

Enjoy your serverless deployment! 🚀
