# HumanCapital Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Setup Database

#### Setup MongoDB
**Option 1: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Connection string: `mongodb://localhost:27017/humancapital`

**Option 2: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string from Atlas dashboard

#### Configure Backend Environment
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL="mongodb://localhost:27017/humancapital"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/humancapital?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="7d"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
PORT=5000
```

#### Push Schema to Database
```bash
cd backend
npm run prisma:generate
npm run prisma:push
```

**Note:** MongoDB uses `prisma db push` instead of migrations.

### 3. Start Development Servers

From root directory:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Cloudinary Setup

1. Sign up at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to `backend/.env`

## Project Structure

```
HumanCapital-2/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # State management
│   │   └── lib/           # Utilities
│   └── public/            # Static assets
├── backend/           # Express + Prisma backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   └── utils/         # Utilities
│   └── prisma/            # Database schema
└── images/            # Project images
```

## Features

✅ Video CV upload and playback
✅ PDF CV upload
✅ Job posting and search
✅ Candidate profiles
✅ Company profiles
✅ Authentication (JWT)
✅ Role-based access (Candidate/Company)
✅ Dark/Light mode
✅ Responsive design
✅ Azerbaijani language interface

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running (if using local)
- Check DATABASE_URL in `.env`
- For MongoDB Atlas: Verify network access and credentials
- Test connection string format: `mongodb://` for local, `mongodb+srv://` for Atlas

### Cloudinary Upload Issues
- Verify Cloudinary credentials in `.env`
- Check file size limits (100MB for video, 10MB for PDF)

### Port Already in Use
- Change PORT in `backend/.env`
- Update proxy in `frontend/vite.config.ts`

## Next Steps

1. Customize branding and colors
2. Add more features as needed
3. Deploy to production
4. Set up CI/CD pipeline

