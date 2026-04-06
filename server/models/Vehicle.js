const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true, index: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    bodyType: {
      type: String,
      enum: ['sedan', 'suv', 'mpv', 'truck', 'van', 'coupe'],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ['gasoline', 'diesel', 'electric', 'hybrid'],
      required: true,
    },
    transmission: {
      type: String,
      enum: ['auto', 'manual'],
      required: true,
    },
    driveType: {
      type: String,
      enum: ['FWD', 'RWD', 'AWD', '4WD'],
      required: true,
    },
    engineCapacity: { type: String },
    color: { type: String },
    exteriorColor: { type: String },
    interiorColor: { type: String },
    vin: { type: String, unique: true, sparse: true },
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair'],
      default: 'good',
    },
    location: { type: String },
    port: { type: String },
    images: [{ type: String }],
    thumbnail: { type: String },
    description: { type: String },
    specs: { type: Map, of: String },
    features: [{ type: String }],
    stockStatus: {
      type: String,
      enum: ['available', 'reserved', 'sold'],
      default: 'available',
    },
    isFeatured: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create text index for search
vehicleSchema.index({ title: 'text', brand: 'text', model: 'text' });

module.exports = mongoose.model('Vehicle', vehicleSchema);
