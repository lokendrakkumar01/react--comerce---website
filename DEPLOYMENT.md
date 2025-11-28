# E-Commerce Application Deployment Guide

Complete guide to deploy your e-commerce application to production using free hosting platforms.

## 🚀 Quick Overview

- **Backend**: Render (Free Tier)
- **Frontend**: Vercel (Free Tier)  
- **Database**: MongoDB Atlas (Already Configured ✅)

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Your Code

✅ **Already Done!**
- `render.yaml` configuration file created
- MongoDB connection configured
- Health check endpoint ready at `/api/health`

### Step 2: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Verify your email if needed

### Step 3: Deploy Backend

#### Option A: Deploy from Dashboard (Recommended)

1. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or upload project)
   - Select the repository containing your e-commerce project

2. **Configure Service**
   - **Name**: `ecommerce-backend` (or your preferred name)
   - **Region**: Singapore (or closest to you)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty
   - **Runtime**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add these:

   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://lokendrafranklin_db_user:8CbHjd3O57GEoXG1@cluster0.8uo37sh.mongodb.net/?appName=Cluster0
   JWT_SECRET=e8f9b2a7c4d6e1a3b5c7d9f2a4b6c8e0d1f3a5b7c9e1a3b5c7d9f2a4b6c8e0d2
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

   **Note**: Update `CLIENT_URL` after deploying frontend in Part 2

4. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Your backend URL will be: `https://ecommerce-backend-xxxx.onrender.com`

5. **Verify Deployment**
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"message":"API is running..."}`

#### Option B: Deploy with render.yaml

1. Push `render.yaml` to your GitHub repository
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect repository and select `render.yaml`
4. Add environment variables manually in dashboard
5. Click "Apply"

### Important Notes for Render

⚠️ **Free Tier Limitations**:
- Service spins down after 15 minutes of inactivity
- First request after spin-down may take 30-50 seconds
- Upgrade to paid tier ($7/month) for always-on service

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Update Environment Variables

1. **Copy your backend URL** from Render (e.g., `https://ecommerce-backend-xxxx.onrender.com`)

2. **Update server CORS** (Important!)
   - Go to Render Dashboard → Your Service → Environment
   - Update `CLIENT_URL` to your Vercel URL (you'll get this after deployment)

### Step 2: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

### Step 3: Deploy Frontend

1. **Import Project**
   - Click "Add New..." → "Project"
   - Select your e-commerce repository
   - Vercel will auto-detect it's a Vite project

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com
   ```

   Replace `your-backend-url` with your actual Render backend URL

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your frontend URL will be: `https://your-project-name.vercel.app`

5. **Update Backend CORS**
   - Go back to Render Dashboard
   - Update `CLIENT_URL` environment variable to your Vercel URL
   - Service will auto-redeploy

### Step 4: Test Full Application

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Products display correctly
- ✅ User registration/login works
- ✅ Cart functionality works
- ✅ API calls succeed

---

## Part 3: Alternative - Deploy Both on Render

If you prefer to deploy both on Render:

### Backend Configuration
- Same as Part 1 above

### Frontend Configuration
1. Create second Web Service on Render
2. **Build Command**: `cd client && npm install && npm run build`
3. **Start Command**: `cd client && npx serve -s dist -l 10000`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`

---

## Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://lokendrafranklin_db_user:8CbHjd3O57GEoXG1@cluster0.8uo37sh.mongodb.net/?appName=Cluster0
JWT_SECRET=e8f9b2a7c4d6e1a3b5c7d9f2a4b6c8e0d1f3a5b7c9e1a3b5c7d9f2a4b6c8e0d2
CLIENT_URL=https://your-frontend-url.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name (optional)
CLOUDINARY_API_KEY=your_api_key (optional)
CLOUDINARY_API_SECRET=your_api_secret (optional)
STRIPE_SECRET_KEY=sk_test_your_key (optional)
STRIPE_WEBHOOK_SECRET=whsec_your_secret (optional)
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key (optional)
```

---

## Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check build logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB Atlas IP whitelist (allow all: `0.0.0.0/0`)

**CORS Errors**
- Verify `CLIENT_URL` matches your frontend URL exactly
- Include `https://` in the URL
- Restart backend service after updating

**MongoDB Connection Failed**
- Verify MongoDB Atlas is accessible
- Check connection string is correct
- Confirm MongoDB Atlas allows connections from all IPs

### Frontend Issues

**"Failed to fetch" or API errors**
- Verify `VITE_API_URL` is set correctly
- Check backend is deployed and running
- Open browser console for detailed errors

**Blank page after deployment**
- Check build logs in Vercel
- Verify `vercel.json` is in client directory
- Check browser console for errors

**Routes not working (404)**
- Ensure `vercel.json` is configured correctly
- Verify it's in the `client` directory

---

## Post-Deployment Checklist

- [ ] Backend health endpoint responds: `GET /api/health`
- [ ] Frontend loads without errors
- [ ] User can register/login
- [ ] Products display correctly
- [ ] Cart operations work
- [ ] MongoDB connection stable
- [ ] CORS configured correctly
- [ ] Environment variables all set

---

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record

---

## Continuous Deployment

Both Render and Vercel support auto-deployment:
- Push to GitHub → Automatic deployment
- Each push triggers new build
- Check deployment status in dashboards

---

## Cost Summary

**Current Setup (FREE)**:
- Render Free Tier: $0/month (with spin-down)
- Vercel Free Tier: $0/month
- MongoDB Atlas Free Tier: $0/month (512MB)

**Upgrade Options**:
- Render Pro: $7/month (always-on + better performance)
- Vercel Pro: $20/month (better bandwidth + features)
- MongoDB Atlas: $9/month for 2GB shared cluster

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

---

## Security Reminders

🔒 **Important**:
- Never commit `.env` files
- Rotate JWT secrets regularly in production
- Use different passwords for production
- Enable MongoDB Atlas IP whitelist for production
- Monitor application logs regularly
- Keep dependencies updated

---

**Your e-commerce application is ready for the world! 🎉**
