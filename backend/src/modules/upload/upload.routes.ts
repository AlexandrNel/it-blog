import express from 'express'
import { config } from '@/config/index.js'
import multer from 'multer'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { UploadError } from '@/shared/lib/upload-error.js'
import fs from 'node:fs'
import path from 'node:path'

const allowedMemtypes = {
  'image/jpeg': true,
  'image/png': true,
  'image/svg+xml': true,
  'image/pjpeg': true,
  'image/webp': true,
}

const uploadsDir = path.resolve(process.cwd(), 'uploads')
const maxUploadSizeBytes = 5 * 1024 * 1024

const ensureUploadsDir = async () => {
  await fs.promises.mkdir(uploadsDir, { recursive: true })
}


const storage = multer.diskStorage({
  destination: async (_, __, cb) => {
    await ensureUploadsDir()
    cb(null, uploadsDir)
  },
  filename(req, file, callback) {
    const name = crypto.randomUUID().slice(0, 8)
    const splitted = file.originalname.split('.')
    const extention = splitted[splitted.length - 1]

    if (
      extention &&
      allowedMemtypes[file.mimetype as keyof typeof allowedMemtypes]
    ) {
      callback(null, name.concat('.', extention))
    } else {
      callback(new UploadError(`${extention} unsupported file type`), '')
    }
  },
})
const upload = multer({ storage, limits: { fileSize: maxUploadSizeBytes } })

const router = express.Router()

router.use('/uploads', express.static(uploadsDir))

router.post(
  '/photos/upload',
  authMiddleware,
  upload.single('image'),
  async (req, res, next) => {
    const file = req.file

    if (!file) {
      res.status(400).json({ message: 'Failed to upload file' })
      return
    }

    try {
      const imagePath = `/api/uploads/${file.filename}`

      res.json({
        path: imagePath,
        url: new URL(imagePath, config.appUrl).toString(),
      })
    } catch (error) {
      next(error)
    }
  }
)

export default router
