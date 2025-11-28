# 🚀 Quick Deployment Guide

Get your e-commerce app online in 15 minutes!

## Prerequisites
- GitHub account
- Your code pushed to GitHub repository

---

## Step 1️⃣: Deploy Backend (Render) - 5 mins

1. **Sign up**: [render.com](https://render.com) with GitHub
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect Repo**: Select your e-commerce repository
4. **Configure**:
   - Name: `ecommerce-backend`
   - Build: `cd server && npm install`
   - Start: `cd server && npm start`
   - Plan: **Free**

5. **Environment Variables** (Add these in "Advanced"):
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://lokendrafranklin_db_user:8CbHjd3O57GEoXG1@cluster0.8uo37sh.mongodb.net/?appName=Cluster0
   JWT_SECRET=e8f9b2a7c4d6e1a3b5c7d9f2a4b6c8e0d1f3a5b7c9e1a3b5c7d9f2a4b6c8e0d2
   CLIENT_URL=https://your-app.vercel.app
   ```

6. **Deploy**: Click "Create Web Service"
7. **Copy URL**: Save your backend URL (e.g., `https://ecommerce-backend-abc.onrender.com`)

---

## Step 2️⃣: Deploy Frontend (Vercel) - 5 mins

1. **Sign up**: [vercel.com](https://vercel.com) with GitHub
2. **New Project**: Click "Add New..." → "Project"
3. **Import Repo**: Select your e-commerce repository
4. **Configure**:
   - Framework: **Vite** (auto-detected)
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Use the URL from Step 1)

6. **Deploy**: Click "Deploy"
7. **Copy URL**: Your app is live! (e.g., `https://your-app.vercel.app`)

---

## Step 3️⃣: Update CORS - 2 mins

1. Go back to **Render Dashboard**
2. Open your backend service
3. Go to **Environment** tab
4. Update `CLIENT_URL` with your Vercel URL from Step 2
5. Service will auto-redeploy

---

## ✅ Test Your App

Visit your Vercel URL and test:
- Sign up / Login works
- Products load
- Cart operations work
- Everything functions correctly

---

## 🎉 You're Live!

**Your URLs**:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/api/health`

---

## 📝 Important Notes

⚠️ **Free tier limitations**:
- Backend spins down after 15 min inactivity
- First request after sleep takes ~30-50 seconds
- Upgrade to Render Pro ($7/mo) for always-on

🔄 **Auto-deployment**:
- Every GitHub push triggers new deployment
- Both platforms update automatically

📚 **Full guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting

---

## Need Help?

Common issues:
- **CORS errors**: Check `CLIENT_URL` matches exactly
- **API not loading**: Verify `VITE_API_URL` is set correctly
- **MongoDB errors**: Check Atlas allows all IPs (0.0.0.0/0)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full troubleshooting guide.
