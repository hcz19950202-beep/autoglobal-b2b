const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerPhone: { type: String },
    company: { type: String },
    country: { type: String },
    shippingDestination: { type: String },
    quantity: { type: Number, default: 1 },
    message: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'negotiating', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
