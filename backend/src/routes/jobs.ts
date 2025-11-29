import express from 'express'
import multer from 'multer'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { uploadToCloudinary } from '../utils/cloudinary'

const router = express.Router()
const prisma = new PrismaClient()

const upload = multer({ storage: multer.memoryStorage() })

const createJobSchema = z.object({
  title: z.string().min(1),
  companyName: z.string().min(1),
  city: z.string().min(1),
  salary: z.string().optional(),
  category: z.enum(['IT', 'Marketing', 'Design', 'Sales', 'HR', 'Finance', 'Education', 'Healthcare', 'Other']),
  experience: z.string().optional(),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  description: z.string().min(1),
})

// Create job
router.post('/create', authenticate, authorize('COMPANY'), upload.single('pdf'), async (req: AuthRequest, res) => {
  try {
    const validatedData = createJobSchema.parse(req.body)

    // Get company
    const company = await prisma.company.findUnique({
      where: { userId: req.user!.id },
    })

    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' })
    }

    // Upload PDF if provided
    let pdfUrl = null
    if (req.file) {
      pdfUrl = await uploadToCloudinary(req.file.buffer, 'pdf')
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        city: validatedData.city,
        salary: validatedData.salary,
        experience: validatedData.experience,
        requirements: validatedData.requirements,
        responsibilities: validatedData.responsibilities,
        pdfUrl,
      },
      include: {
        company: true,
      },
    })

    res.status(201).json(job)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message })
    }
    console.error(error)
    res.status(500).json({ message: 'Failed to create job' })
  }
})

// List jobs
router.get('/list', async (req, res) => {
  try {
    const { city, category, search } = req.query

    const where: any = { isActive: true }

    if (city) where.city = city as string
    if (category) where.category = category as string
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
      ]
    }

    const jobs = await prisma.job.findMany({
      where,
      include: {
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json(jobs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
})

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        company: true,
      },
    })

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.json(job)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch job' })
  }
})

export default router

