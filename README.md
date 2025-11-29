# HumanCapital - Azərbaycanın İnnovativ Video-CV İş Platforması

"İnsan kapitalına sərmayə, gələcəyə dəyər."

## 🚀 Texnologiyalar

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Zustand

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Prisma ORM
- Cloudinary (Video/PDF upload)
- JWT Authentication

## 📦 Quraşdırma

### Tələblər
- Node.js 18+
- MongoDB (local və ya MongoDB Atlas)
- npm və ya yarn

### Addımlar

1. **Repository-ni klonlayın**
```bash
git clone <repository-url>
cd HumanCapital-2
```

2. **Bütün paketləri quraşdırın**
```bash
npm run install:all
```

3. **Backend konfiqurasiyası**
```bash
cd backend
cp .env.example .env
```

`.env` faylını redaktə edin və lazımi məlumatları daxil edin:
- `DATABASE_URL` - MongoDB connection string (məsələn: `mongodb://localhost:27017/humancapital` və ya MongoDB Atlas connection string)
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials

4. **Database setup**
```bash
cd backend
npm run prisma:generate
npm run prisma:push
```

**Qeyd:** MongoDB üçün `prisma migrate` əvəzinə `prisma db push` istifadə olunur.

5. **Development server-ləri işə salın**

Root qovluqda:
```bash
npm run dev
```

Bu həm frontend (port 3000), həm də backend (port 5000) server-lərini işə salacaq.

Və ya ayrı-ayrılıqda:
```bash
# Frontend
npm run dev:frontend

# Backend
npm run dev:backend
```

## 📁 Layihə Strukturu

```
HumanCapital-2/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable komponentlər
│   │   ├── pages/          # Səhifələr
│   │   ├── store/          # Zustand stores
│   │   ├── lib/            # Utility funksiyalar
│   │   └── App.tsx         # Əsas app komponenti
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── utils/          # Utility funksiyalar
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
└── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Qeydiyyat
- `POST /api/auth/login` - Giriş

### Users
- `GET /api/users/me` - Cari istifadəçi məlumatları

### Jobs
- `POST /api/jobs/create` - İş elanı yaratmaq (Company)
- `GET /api/jobs/list` - İş elanlarının siyahısı
- `GET /api/jobs/:id` - İş elanı detalları

### Candidates
- `POST /api/candidates/create` - Namizəd profili yaratmaq/redaktə etmək
- `GET /api/candidates/list` - Namizədlərin siyahısı
- `GET /api/candidates/:id` - Namizəd detalları

### Companies
- `POST /api/companies/create` - Şirkət profili yaratmaq/redaktə etmək
- `GET /api/companies/list` - Şirkətlərin siyahısı
- `GET /api/companies/:id` - Şirkət detalları

### Uploads
- `POST /api/video/upload` - Video yükləmə
- `POST /api/cv/upload` - CV yükləmə

## 🎨 Əsas Xüsusiyyətlər

- ✅ Video CV yükləmə və izləmə
- ✅ PDF CV yükləmə
- ✅ İş elanları yaratmaq və axtarmaq
- ✅ Namizəd profilləri
- ✅ Şirkət profilləri
- ✅ Dark/Light mode
- ✅ Responsive dizayn
- ✅ JWT Authentication
- ✅ Role-based access control

## 📝 Qeydlər

- Video fayllar Cloudinary-ə yüklənir (max 100MB)
- PDF fayllar Cloudinary-ə yüklənir (max 10MB)
- Bütün interfeys və mətnlər Azərbaycan dilindədir

## 🔧 Development

### Frontend
```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
npm run dev           # Development server (tsx watch)
npm run build         # TypeScript compile
npm run start         # Production server
npm run prisma:push   # Push schema changes to MongoDB
npm run prisma:studio # Prisma Studio (database GUI)
```

## 📄 Lisenziya

Bu layihə özəl mülkiyyətdir.

