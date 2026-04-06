const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/vehicles
// @desc    Get all vehicles with filters, search, and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      brand,
      model,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      bodyType,
      fuelType,
      transmission,
      search,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { stockStatus: 'available' };

    // Filters
    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (minYear || maxYear) {
      query.year = {};
      if (minYear) query.year.$gte = Number(minYear);
      if (maxYear) query.year.$lte = Number(maxYear);
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minMileage || maxMileage) {
      query.mileage = {};
      if (minMileage) query.mileage.$gte = Number(minMileage);
      if (maxMileage) query.mileage.$lte = Number(maxMileage);
    }
    if (bodyType) query.bodyType = bodyType;
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Sort
    let sortQuery = { createdAt: -1 };
    if (sort) {
      const parts = sort.split(':');
      sortQuery = { [parts[0]]: parts[1] === 'desc' ? -1 : 1 };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const vehicles = await Vehicle.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    const total = await Vehicle.countDocuments(query);

    res.json({
      vehicles,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/vehicles/featured
// @desc    Get featured vehicles
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isFeatured: true, stockStatus: 'available' }).limit(6);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/vehicles/brands
// @desc    Get distinct brands list
// @access  Public
router.get('/brands', async (req, res) => {
  try {
    const brands = await Vehicle.distinct('brand');
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/vehicles/:id
// @desc    Get vehicle detail
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      // Increment view count
      vehicle.viewCount += 1;
      await vehicle.save();
      res.json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/vehicles
// @desc    Create a vehicle
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid vehicle data' });
  }
});

// @route   PUT /api/vehicles/:id
// @desc    Update a vehicle
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      Object.assign(vehicle, req.body);
      const updatedVehicle = await vehicle.save();
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid vehicle data' });
  }
});

// @route   DELETE /api/vehicles/:id
// @desc    Delete a vehicle
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      await vehicle.deleteOne();
      res.json({ message: 'Vehicle removed' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
