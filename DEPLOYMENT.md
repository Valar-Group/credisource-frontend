# 🚀 DEPLOYMENT GUIDE - CREDISOURCE FRONTEND

## Quick Deploy to Vercel (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free - sign up with GitHub at vercel.com)

---

## Step 1: Push to GitHub

```bash
cd /home/claude/credisource-frontend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Credisource MVP frontend - ready for deployment"

# Create GitHub repo first at https://github.com/new
# Then connect and push:
git branch -M main
git remote add origin https://github.com/Valar-Group/credisource-frontend.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Option A: Web Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository: `credisource-frontend`
4. Vercel auto-detects Next.js settings ✅
5. Click "Deploy"
6. Wait 2-3 minutes
7. Your site is live! 🎉

### Option B: Vercel CLI (Fast)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? credisource-frontend
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain: `credisource.com` or `app.credisource.com`
4. Follow DNS configuration instructions
5. Vercel auto-provisions SSL certificate

---

## Environment Variables

### For Production

If you need to change the API URL:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL`
3. Value: `https://credisource-production.up.railway.app`
4. Redeploy

Or in code, edit `components/VerifyInterface.tsx`:
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://credisource-production.up.railway.app';
```

---

## Auto-Deployments

Once connected to GitHub:
- Every push to `main` branch → auto-deploys to production
- Pull requests → create preview deployments
- Rollback anytime in Vercel dashboard

---

## Monitoring

Vercel Dashboard shows:
- ✅ Deployment status
- 📊 Analytics (page views, visitors)
- ⚡ Performance metrics (Web Vitals)
- 🐛 Error logs
- 📈 Function invocations

---

## Performance Optimization

Already included:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Static page generation
- ✅ Fast CDN delivery
- ✅ Automatic caching

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Common fix: Make sure all dependencies in package.json

### API Connection Issues
- Verify Railway backend is running
- Check CORS settings on backend
- Test API endpoint manually

### Slow Loading
- Check Network tab in browser dev tools
- Verify Railway backend response times
- Consider adding loading states

---

## URLs After Deployment

- **Production**: https://credisource-frontend.vercel.app
- **Custom Domain**: https://credisource.com (after DNS setup)
- **API Backend**: https://credisource-production.up.railway.app

---

## Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Share URL with your designer
3. ✅ Test on mobile devices
4. ✅ Run through verification flows
5. ✅ Monitor for errors in Vercel dashboard

---

## Cost

**Vercel Hobby (Free) Plan:**
- 100GB bandwidth/month
- Unlimited websites
- Automatic SSL
- Perfect for MVP!

**Upgrade later ($20/mo):**
- More bandwidth
- Team features
- Advanced analytics

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create issues in your repo

---

**You're all set! 🎉**

Deploy now and share the link with your designer tomorrow!
