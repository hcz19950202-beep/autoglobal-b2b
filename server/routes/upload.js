const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { protect, admin } = require('../middleware/auth');
const crypto = require('crypto');
const path = require('path');

// Multer config - store in memory before uploading to R2
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  },
});

// Initialize S3 client for Cloudflare R2
const getR2Client = () => {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT, // https://<account_id>.r2.cloudflarestorage.com
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
};

// Generate unique filename
const generateFileName = (originalName) => {
  const ext = path.extname(originalName).toLowerCase();
  const hash = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now();
  return `vehicles/${timestamp}-${hash}${ext}`;
};

// @route   POST /api/upload
// @desc    Upload single image to R2
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const fileName = generateFileName(req.file.originalname);
    const r2 = getR2Client();

    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || 'autoglobal-images',
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }));

    // Construct the public URL
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

    res.status(201).json({
      url: publicUrl,
      key: fileName,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images to R2 (max 10)
// @access  Private/Admin
router.post('/multiple', protect, admin, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    const r2 = getR2Client();
    const results = [];

    for (const file of req.files) {
      const fileName = generateFileName(file.originalname);
      await r2.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'autoglobal-images',
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      results.push({
        url: `${process.env.R2_PUBLIC_URL}/${fileName}`,
        key: fileName,
        size: file.size,
      });
    }

    res.status(201).json({ images: results, count: results.length });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ message: 'Failed to upload images', error: error.message });
  }
});

// @route   DELETE /api/upload/:key
// @desc    Delete an image from R2
// @access  Private/Admin
router.delete('/:key(*)', protect, admin, async (req, res) => {
  try {
    const r2 = getR2Client();
    await r2.send(new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || 'autoglobal-images',
      Key: req.params.key,
    }));
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

module.exports = router;
