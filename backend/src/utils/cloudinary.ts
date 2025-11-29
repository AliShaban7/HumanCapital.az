import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your-cloud-name' &&
    process.env.CLOUDINARY_API_KEY !== 'your-api-key' &&
    process.env.CLOUDINARY_API_SECRET !== 'your-api-secret'
  )
}

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
} else {
  console.warn('⚠️  Cloudinary is not configured. File uploads will fail.')
  console.warn('   Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file.')
  console.warn('   Sign up at https://cloudinary.com to get your credentials.')
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  resourceType: 'image' | 'video' | 'pdf' | 'raw'
): Promise<string> => {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file. ' +
      'Sign up at https://cloudinary.com to get your credentials.'
    )
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType === 'pdf' ? 'raw' : resourceType,
        folder: 'humancapital',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result?.secure_url || '')
        }
      }
    )

    const readableStream = new Readable()
    readableStream.push(buffer)
    readableStream.push(null)
    readableStream.pipe(uploadStream)
  })
}

