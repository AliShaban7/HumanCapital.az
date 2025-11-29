import express from 'express'
import multer from 'multer'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { uploadToCloudinary } from '../utils/cloudinary'

const router = express.Router()
const prisma = new PrismaClient()

const upload = multer({ storage: multer.memoryStorage() })

const createCandidateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  city: z.string().optional(),
  profession: z.string().optional(),
  bio: z.string().optional(),
  portfolio: z.string().url().optional().or(z.literal('')),
  skills: z.string().optional(),
})

// Create/Update candidate profile
router.post('/create', authenticate, authorize('CANDIDATE'), upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]), async (req: AuthRequest, res) => {
  try {
    const validatedData = createCandidateSchema.parse(req.body)
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    // Parse skills
    let skills: string[] = []
    if (validatedData.skills) {
      try {
        skills = JSON.parse(validatedData.skills)
      } catch {
        skills = []
      }
    }

    // Upload video if provided
    let videoUrl = null
    if (files.video && files.video[0]) {
      videoUrl = await uploadToCloudinary(files.video[0].buffer, 'video')
    }

    // Upload CV if provided
    let cvUrl = null
    if (files.cv && files.cv[0]) {
      cvUrl = await uploadToCloudinary(files.cv[0].buffer, 'pdf')
    }

    // Check if candidate profile exists
    const existingCandidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    let candidate
    if (existingCandidate) {
      // Update existing
      candidate = await prisma.candidate.update({
        where: { userId: req.user!.id },
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          city: validatedData.city,
          profession: validatedData.profession,
          bio: validatedData.bio,
          portfolio: validatedData.portfolio || null,
          skills,
          videoUrl: videoUrl || existingCandidate.videoUrl,
          cvUrl: cvUrl || existingCandidate.cvUrl,
        },
      })
    } else {
      // Create new
      candidate = await prisma.candidate.create({
        data: {
          userId: req.user!.id,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          city: validatedData.city,
          profession: validatedData.profession,
          bio: validatedData.bio,
          portfolio: validatedData.portfolio || null,
          skills,
          videoUrl,
          cvUrl,
        },
      })
    }

    res.status(201).json(candidate)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message })
    }
    console.error(error)
    res.status(500).json({ message: 'Failed to create candidate profile' })
  }
})

// List candidates
router.get('/list', async (req, res) => {
  try {
    const { city, profession, search, limit } = req.query

    const take = limit ? parseInt(limit as string) : undefined

    // Fetch candidates - we'll filter in memory for case-insensitive search
    // Fetch a larger set to ensure we have enough candidates after filtering
    const fetchLimit = search || city || profession ? 5000 : (take ? take * 2 : 1000)
    
    let candidates = await prisma.candidate.findMany({
      take: fetchLimit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Apply case-insensitive filtering in memory
    if (city) {
      const cityLower = String(city).toLowerCase().trim()
      candidates = candidates.filter(c => 
        c.city && String(c.city).toLowerCase().trim() === cityLower
      )
    }

    if (profession) {
      const professionLower = String(profession).toLowerCase().trim()
      candidates = candidates.filter(c => 
        c.profession && String(c.profession).toLowerCase().trim().includes(professionLower)
      )
    }

    if (search) {
      const searchLower = String(search).toLowerCase().trim()
      candidates = candidates.filter(c => {
        const firstName = String(c.firstName).toLowerCase().trim()
        const lastName = String(c.lastName).toLowerCase().trim()
        const candidateProfession = c.profession ? String(c.profession).toLowerCase().trim() : ''
        
        return firstName.includes(searchLower) ||
               lastName.includes(searchLower) ||
               candidateProfession.includes(searchLower)
      })
    }

    // Apply limit after filtering
    if (take) {
      candidates = candidates.slice(0, take)
    }

    res.json(candidates)
  } catch (error) {
    console.error('Error fetching candidates:', error)
    res.status(500).json({ message: 'Failed to fetch candidates' })
  }
})

// Get candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: req.params.id },
    })

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' })
    }

    res.json(candidate)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch candidate' })
  }
})

export default router

