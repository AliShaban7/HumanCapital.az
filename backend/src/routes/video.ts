import express from 'express'
import multer from 'multer'
import { authenticate, AuthRequest } from '../middleware/auth'
import { uploadToCloudinary } from '../utils/cloudinary'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else {
      cb(new Error('Only video files are allowed'))
    }
  },
})

// Upload video
router.post('/upload', authenticate, upload.single('video'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file provided' })
    }

    const videoUrl = await uploadToCloudinary(req.file.buffer, 'video')

    res.json({ url: videoUrl })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Failed to upload video' })
  }
})

export default router

