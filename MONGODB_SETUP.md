# MongoDB Atlas Setup Guide

## Environment Configuration

Your `.env` file is protected by `.gitignore` for security (which is correct!). You need to create it manually in the `server` directory.

### Step 1: Create .env File

Navigate to the server directory and create a new file named `.env`:

```bash
cd "c:\Users\loken\Downloads\react -comerce   website\server"
```

Then create a file named `.env` with the following content:

```env
# Backend Environment Variables

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database - MongoDB Atlas
MONGO_URI=mongodb+srv://lokendrafranklin_db_user:8CbHjd3O57GEoXG1@cluster0.8uo37sh.mongodb.net/?appName=Cluster0

# JWT Secret (randomly generated - change for production deployment)
JWT_SECRET=e8f9b2a7c4d6e1a3b5c7d9f2a4b6c8e0d1f3a5b7c9e1a3b5c7d9f2a4b6c8e0d2

# Cloudinary Configuration (Optional - configure when ready to upload images)
# Sign up at https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration (Optional - configure when ready for payment processing)
# Get keys from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Step 2: Quick Setup Commands

**Option A: Using PowerShell (Recommended)**
```powershell
cd "c:\Users\loken\Downloads\react -comerce   website\server"

@"
# Backend Environment Variables

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database - MongoDB Atlas
MONGO_URI=mongodb+srv://lokendrafranklin_db_user:8CbHjd3O57GEoXG1@cluster0.8uo37sh.mongodb.net/?appName=Cluster0

# JWT Secret
JWT_SECRET=e8f9b2a7c4d6e1a3b5c7d9f2a4b6c8e0d1f3a5b7c9e1a3b5c7d9f2a4b6c8e0d2

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
"@ | Out-File -FilePath ".env" -Encoding utf8
```

**Option B: Manual Creation**
1. Open Notepad or your preferred text editor
2. Copy the environment variables content above
3. Save as `.env` in the `server` directory

### Step 3: Verify Setup

Run the server to verify the MongoDB connection:

```bash
cd server
npm install
npm run dev
```

You should see:
- ✅ MongoDB Connected: cluster0.8uo37sh.mongodb.net
- 🚀 Server running in development mode on port 5000

### Step 4: Test the API

Open your browser or use a tool like Postman to test:
```
http://localhost:5000/api/health
```

Expected response:
```json
{"message": "API is running..."}
```

## Deployment on Any System

To deploy this project on any system:

1. **Clone/Copy the project** to the target system
2. **Create `.env` file** in the server directory with the same variables
3. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```
4. **Run the server**:
   ```bash
   npm run dev  # Development
   npm start    # Production
   ```

### Cloud Deployment (Render, Railway, Vercel, etc.)

For cloud platforms, add these environment variables in the platform's dashboard:

| Variable | Value |
|----------|-------|
| `MONGO_URI` | `mongodb+srv://lokendrafranklin_db_user:8CbHjd3O57GEoXG1@cluster0.8uo37sh.mongodb.net/?appName=Cluster0` |
| `JWT_SECRET` | `e8f9b2a7c4d6e1a3b5c7d9f2a4b6c8e0d1f3a5b7c9e1a3b5c7d9f2a4b6c8e0d2` |
| `PORT` | `5000` (or use platform default) |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | Your frontend URL |

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env` files to Git (already protected by `.gitignore`)
- Use different passwords for production environments
- Rotate secrets regularly
- Use environment-specific variables for staging/production
- Consider using secret management services for production
