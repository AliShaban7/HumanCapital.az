import express from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Apply to job
router.post('/apply/:jobId', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const { jobId } = req.params

    // Get candidate
    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' })
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (!job.isActive) {
      return res.status(400).json({ message: 'This job is no longer active' })
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidate.id,
          jobId,
        },
      },
    })

    if (existing) {
      return res.status(400).json({ message: 'Already applied to this job' })
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId,
        status: 'pending',
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    })

    res.status(201).json(application)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to apply to job' })
  }
})

// Get candidate's applications
router.get('/my-applications', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' })
    }

    const applications = await prisma.application.findMany({
      where: { candidateId: candidate.id },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json(applications)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
})

// Get application count
router.get('/count', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.json({ count: 0 })
    }

    const count = await prisma.application.count({
      where: { candidateId: candidate.id },
    })

    res.json({ count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch application count' })
  }
})

export default router

