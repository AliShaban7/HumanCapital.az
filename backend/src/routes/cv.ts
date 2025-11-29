import express from 'express'
import multer from 'multer'
import { authenticate, AuthRequest } from '../middleware/auth'
import { uploadToCloudinary } from '../utils/cloudinary'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed'))
    }
  },
})

// Upload CV
router.post('/upload', authenticate, upload.single('cv'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No CV file provided' })
    }

    const cvUrl = await uploadToCloudinary(req.file.buffer, 'pdf')

    res.json({ url: cvUrl })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Failed to upload CV' })
  }
})

export default router

