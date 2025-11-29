import express from 'express'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get company's jobs
router.get('/my-jobs', authenticate, authorize('COMPANY'), async (req: AuthRequest, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.user!.id },
    })

    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' })
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      include: {
        _count: {
          select: {
            applications: true,
            savedBy: true,
          },
        },
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

// Get applications for company's jobs
router.get('/applications', authenticate, authorize('COMPANY'), async (req: AuthRequest, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.user!.id },
    })

    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' })
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      select: { id: true },
    })

    const jobIds = jobs.map(job => job.id)

    const applications = await prisma.application.findMany({
      where: {
        jobId: { in: jobIds },
      },
      include: {
        candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profession: true,
            city: true,
            cvUrl: true,
            videoUrl: true,
            skills: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
            company: {
              select: {
                name: true,
              },
            },
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

// Get company stats
router.get('/stats', authenticate, authorize('COMPANY'), async (req: AuthRequest, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { userId: req.user!.id },
    })

    if (!company) {
      return res.json({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0,
        pendingApplications: 0,
        acceptedApplications: 0,
        rejectedApplications: 0,
      })
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      select: { id: true, isActive: true },
    })

    const jobIds = jobs.map(job => job.id)

    const [totalApplications, pendingApplications, acceptedApplications, rejectedApplications] = await Promise.all([
      prisma.application.count({ where: { jobId: { in: jobIds } } }),
      prisma.application.count({ where: { jobId: { in: jobIds }, status: 'pending' } }),
      prisma.application.count({ where: { jobId: { in: jobIds }, status: 'accepted' } }),
      prisma.application.count({ where: { jobId: { in: jobIds }, status: 'rejected' } }),
    ])

    res.json({
      totalJobs: jobs.length,
      activeJobs: jobs.filter(job => job.isActive).length,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})

// Update application status
router.patch('/applications/:applicationId/status', authenticate, authorize('COMPANY'), async (req: AuthRequest, res) => {
  try {
    const { applicationId } = req.params
    const { status } = req.body

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    // Verify the application belongs to company's job
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    })

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    const company = await prisma.company.findUnique({
      where: { userId: req.user!.id },
    })

    if (application.job.companyId !== company!.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
      include: {
        candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profession: true,
            city: true,
            cvUrl: true,
            videoUrl: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update application status' })
  }
})

export default router

