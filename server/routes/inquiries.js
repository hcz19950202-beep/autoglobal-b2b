const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, admin } = require('../middleware/auth');

// @route   POST /api/inquiries
// @desc    Create an inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    const createdInquiry = await inquiry.save();
    res.status(201).json(createdInquiry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid inquiry data' });
  }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).populate('vehicleId', 'title brand model price').sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (inquiry) {
      inquiry.status = req.body.status || inquiry.status;
      const updatedInquiry = await inquiry.save();
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid inquiry data' });
  }
});

module.exports = router;
