import express from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()

// Record profile view (public endpoint - can be called without auth)
router.post('/view/:candidateId', async (req: any, res) => {
  try {
    const { candidateId } = req.params
    
    // Try to get user from token if available, but don't require it
    let viewedBy = null
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
        viewedBy = decoded.id
      }
    } catch {
      // No token or invalid token - anonymous view
    }

    await prisma.profileView.create({
      data: {
        candidateId,
        viewedBy,
      },
    })

    res.json({ message: 'View recorded' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to record view' })
  }
})

// Get profile views count
router.get('/count/:candidateId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { candidateId } = req.params

    // Verify it's the candidate's own profile
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    })

    if (!candidate || candidate.userId !== req.user!.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const count = await prisma.profileView.count({
      where: { candidateId },
    })

    res.json({ count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch view count' })
  }
})

export default router

