import express from 'express'
import multer from 'multer'
import { authenticate, authorize, AuthRequest } from '../middleware/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { uploadToCloudinary } from '../utils/cloudinary'

const router = express.Router()
const prisma = new PrismaClient()

const upload = multer({ storage: multer.memoryStorage() })

const createCompanySchema = z.object({
  name: z.string().min(1, 'Şirkət adı məcburidir'),
  description: z.string().optional(),
  website: z.preprocess(
    (val) => {
      if (!val || (typeof val === 'string' && val.trim() === '')) return undefined
      return val
    },
    z.string().url().optional()
  ),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.preprocess(
    (val) => {
      if (!val || (typeof val === 'string' && val.trim() === '')) return undefined
      return val
    },
    z.string().email().optional()
  ),
})

// Create/Update company profile
router.post('/create', authenticate, authorize('COMPANY'), upload.single('logo'), async (req: AuthRequest, res) => {
  try {
    // Parse body data (multer handles multipart/form-data)
    const bodyData = {
      name: req.body.name || '',
      description: req.body.description || '',
      website: req.body.website || '',
      city: req.body.city || '',
      phone: req.body.phone || '',
      email: req.body.email || '',
    }
    
    const validatedData = createCompanySchema.parse(bodyData)
    
    // Upload logo if provided
    let logoUrl = null
    if (req.file) {
      try {
        logoUrl = await uploadToCloudinary(req.file.buffer, 'image')
      } catch (uploadError: any) {
        console.error('Cloudinary upload error:', uploadError)
        return res.status(500).json({ 
          message: uploadError.message || 'Failed to upload logo',
          error: process.env.NODE_ENV === 'development' ? uploadError.message : undefined
        })
      }
    }

    // Check if company profile exists
    const existingCompany = await prisma.company.findUnique({
      where: { userId: req.user!.id },
    })

    let company
    if (existingCompany) {
      // Update existing
      company = await prisma.company.update({
        where: { userId: req.user!.id },
        data: {
          name: validatedData.name,
          description: validatedData.description || null,
          website: validatedData.website || null,
          city: validatedData.city || null,
          phone: validatedData.phone || null,
          email: validatedData.email || null,
          logo: logoUrl || existingCompany.logo,
        },
      })
    } else {
      // Create new
      company = await prisma.company.create({
        data: {
          userId: req.user!.id,
          name: validatedData.name,
          description: validatedData.description || null,
          website: validatedData.website || null,
          city: validatedData.city || null,
          phone: validatedData.phone || null,
          email: validatedData.email || null,
          logo: logoUrl,
        },
      })
    }

    res.status(201).json(company)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      return res.status(400).json({ 
        message: error.errors[0]?.message || 'Validation error',
        errors: error.errors 
      })
    }
    console.error('Company profile error:', error)
    res.status(500).json({ 
      message: error.message || 'Failed to create company profile',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
})

// List companies
router.get('/list', async (req, res) => {
  try {
    const { city, search } = req.query

    const where: any = {}

    if (city) where.city = city as string
    if (search) {
      where.name = { contains: search as string }
    }

    const companies = await prisma.company.findMany({
      where,
      include: {
        _count: {
          select: { jobs: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json(companies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch companies' })
  }
})

// Get company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.params.id },
      include: {
        jobs: {
          where: { isActive: true },
        },
      },
    })

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    res.json(company)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch company' })
  }
})

export default router

