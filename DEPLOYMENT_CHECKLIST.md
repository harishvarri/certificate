# ✅ Vercel Deployment Checklist

This checklist ensures your project is properly prepared for Vercel deployment.

## Pre-Deployment Setup

- [ ] **Install dependencies locally**
  ```bash
  npm install
  ```

- [ ] **Set up environment variables**
  - Copy `.env.local.example` to `.env.local`
  - Fill in `GEMINI_API_KEY` with your actual API key
  ```bash
  GEMINI_API_KEY=your-actual-api-key
  ```

- [ ] **Test locally**
  ```bash
  npm run build
  npm run preview
  ```

## Deployment to Vercel

### Option 1: Using Vercel CLI (Quick)
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy from project root
vercel
```

### Option 2: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Vercel will auto-detect the configuration and deploy

### Option 3: GitLab/Bitbucket Integration
Similar to GitHub - connect your repository and let Vercel handle the deployment

## Post-Deployment Configuration

### Add Environment Variables in Vercel

1. Go to your **Vercel Project Settings** → **Environment Variables**
2. Add the following variables:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Your actual Gemini API key
   - **Environments:** Production, Preview, Development (select all)
3. Click "Save"
4. Redeploy your project

### Verify Deployment

Test your API endpoints after deployment:

```bash
# List all roadmaps
curl https://your-project.vercel.app/api/roadmaps

# Get specific roadmap
curl https://your-project.vercel.app/api/roadmaps/aws
```

## Project Structure (Required for Vercel)

Ensure your project follows this structure:

```
.
├── api/                          # ✅ Serverless functions
│   ├── roadmaps.ts
│   └── roadmaps/
│       └── [id].ts
├── src/                          # React frontend
├── dist/                         # Build output (created by npm run build)
├── package.json                  # Build & dev scripts
├── vercel.json                   # Vercel configuration
├── vite.config.ts               # Vite build config
├── tsconfig.json                # TypeScript config
├── .env.local.example           # Environment variables template
└── .gitignore
```

## Troubleshooting

### ❌ "Cannot find module '@vercel/node'"
**Solution:** Run `npm install` to ensure all dependencies are installed

### ❌ "API returning 404"
**Causes:**
- Missing `/api` folder at project root (NOT in `/src`)
- Incorrect file names in API routes
- Route files not exported as default functions

**Solution:** Verify `/api` folder structure matches above

### ❌ "Build failed: TypeScript errors"
**Solution:** Run `npm run build` locally to find errors:
```bash
npm run build  # This will show TypeScript errors
```

### ❌ "Environment variables not working"
**Solution:**
- Add variables in **Vercel Project Settings** (not `.env.local`)
- After adding, trigger a redeploy
- Variables are only available at build time and runtime, not client-side
- Use `process.env.VAR_NAME` in serverless functions only

### ❌ "Build takes too long or times out"
**Solution:**
- Check Vercel build logs for errors
- Ensure `npm ci --prefer-offline` is used in `installCommand`
- Consider splitting large files or optimizing dependencies

## Performance Optimization

### API Response Caching
The `vercel.json` file is configured with cache headers:
- API responses cache for 60 seconds (server + client)
- This reduces load and improves response times

### Bundle Analysis
To check your frontend bundle size:
```bash
npm run build
# Check `dist/` folder size
du -sh dist/
```

## Deployment Environments

### Production
- Triggered by: Pushes to main branch
- Domain: `https://your-project.vercel.app`
- Environment variables: All (Production, Preview, Development)

### Preview
- Triggered by: Pull requests and other branches
- Domain: Auto-generated URL (e.g., `https://your-project-pr-123.vercel.app`)
- Environment variables: Preview + Development

### Development
- Local `npm run dev`
- Uses `.env.local` file
- Environment variables: Development only

## Rollback

If deployment goes wrong:

1. Go to Vercel Dashboard → Project → Deployments
2. Find the last successful deployment
3. Click the three dots (⋯)
4. Select "Redeploy"

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org

---

**Last Updated:** April 2026
**Project:** Certification Path Finder
