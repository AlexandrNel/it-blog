import express from 'express'
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
      callback(new UploadError(extention + ' не поддерживаемый тип файла'), '')
    }
  },
})
const upload = multer({ storage, limits: { fileSize: 5242880 } })

const router = express.Router()

router.use('/uploads', express.static(uploadsDir))

router.post(
  '/photos/upload',
  authMiddleware,
  upload.single('image'),
  (req, res) => {
    const file = req.file
    if (!file) {
      res.status(400).json({ message: 'Не удалось загрузить файл' })
    }

    res.json({
      url: `/uploads/${req.file?.filename}`,
    })
  }
)

export default router
