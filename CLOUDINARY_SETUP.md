# Cloudinary Setup Guide

## Why Cloudinary?

Cloudinary is used for uploading and storing:

- Company logos
- Candidate CVs (PDF)
- Video CVs
- Job posting PDFs

## Setup Steps

### 1. Sign Up for Cloudinary

1. Go to https://cloudinary.com
2. Click "Sign Up" (free tier available)
3. Complete the registration

### 2. Get Your Credentials

After signing up, go to your Dashboard:

- **Cloud Name**: Found at the top of your dashboard
- **API Key**: Found in the "Account Details" section
- **API Secret**: Found in the "Account Details" section (click "Reveal" to see it)

### 3. Add to Backend .env File

Open `backend/.env` and add/update these lines:

```env
CLOUDINARY_CLOUD_NAME="your-actual-cloud-name"
CLOUDINARY_API_KEY="your-actual-api-key"
CLOUDINARY_API_SECRET="your-actual-api-secret"
```

**Important:** Replace the placeholder values with your actual credentials from Cloudinary dashboard.

### 4. Restart Backend Server

After updating `.env`, restart your backend server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
cd backend
npm run dev
```

## Free Tier Limits

Cloudinary's free tier includes:

- 25 GB storage
- 25 GB monthly bandwidth
- 25,000 monthly transformations

This is usually sufficient for development and small projects.

## Troubleshooting

### Error: "Unknown API key your-cloudinary-api-key"

This means you haven't replaced the placeholder values in `.env`. Make sure you:

1. Have actual credentials from Cloudinary dashboard
2. Replaced all placeholder values in `backend/.env`
3. Restarted the backend server after updating `.env`

### Error: "Invalid API key"

- Double-check that you copied the API key correctly (no extra spaces)
- Make sure you're using the API Key, not the Cloud Name
- Verify the API Secret is correct

### File Upload Fails

- Check file size limits (100MB for video, 10MB for PDF)
- Verify your Cloudinary account is active
- Check backend console for detailed error messages

## Alternative: Local File Storage

If you don't want to use Cloudinary, you can modify the code to store files locally or use another service like AWS S3, Google Cloud Storage, etc.
