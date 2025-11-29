import express from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Save job
router.post('/save/:jobId', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const { jobId } = req.params

    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' })
    }

    // Check if already saved
    const existing = await prisma.savedJob.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidate.id,
          jobId,
        },
      },
    })

    if (existing) {
      return res.status(400).json({ message: 'Job already saved' })
    }

    const savedJob = await prisma.savedJob.create({
      data: {
        candidateId: candidate.id,
        jobId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    })

    res.status(201).json(savedJob)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to save job' })
  }
})

// Unsave job
router.delete('/unsave/:jobId', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const { jobId } = req.params

    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' })
    }

    await prisma.savedJob.deleteMany({
      where: {
        candidateId: candidate.id,
        jobId,
      },
    })

    res.json({ message: 'Job unsaved successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to unsave job' })
  }
})

// Get saved jobs
router.get('/my-saved', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.json([])
    }

    const savedJobs = await prisma.savedJob.findMany({
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

    res.json(savedJobs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch saved jobs' })
  }
})

// Get saved jobs count
router.get('/count', authenticate, authorize('CANDIDATE'), async (req: AuthRequest, res) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { userId: req.user!.id },
    })

    if (!candidate) {
      return res.json({ count: 0 })
    }

    const count = await prisma.savedJob.count({
      where: { candidateId: candidate.id },
    })

    res.json({ count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch saved jobs count' })
  }
})

export default router

