import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import jobRoutes from './routes/jobs'
import candidateRoutes from './routes/candidates'
import companyRoutes from './routes/companies'
import videoRoutes from './routes/video'
import cvRoutes from './routes/cv'
import applicationRoutes from './routes/applications'
import savedJobRoutes from './routes/savedJobs'
import profileViewRoutes from './routes/profileViews'
import companyJobRoutes from './routes/companyJobs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/candidates', candidateRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/saved-jobs', savedJobRoutes)
app.use('/api/profile-views', profileViewRoutes)
app.use('/api/company', companyJobRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HumanCapital API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})

