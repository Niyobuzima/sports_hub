const facilityModel = require('../models/facility.model');
const subModel = require('../models/subscription.model');
const categoryModel = require('../models/category.model');
const rewardModel = require('../models/reward.model');

// does this category's facilities string include the given facility?
function isAllowed(categoryFacilities, facilityName) {
  if (!categoryFacilities) return false;
  const items = categoryFacilities.split(',').map((s) => s.trim().toLowerCase());
  if (items.includes('all') || items.includes('all facilities')) return true;
  return items.includes(facilityName.toLowerCase());
}

async function memberCategory(userId) {
  const sub = await subModel.getLatestByUser(userId);
  if (!sub) return null;
  return categoryModel.getCategory(sub.category_id);
}

async function list(req, res, next) {
  try {
    const facilities = await facilityModel.listFacilities();
    const category = await memberCategory(req.user.id);
    const withAccess = facilities.map((f) => ({
      ...f,
      accessible: category ? isAllowed(category.facilities, f.name) : false,
    }));
    res.json({ facilities: withAccess, category: category ? category.name : null });
  } catch (err) {
    next(err);
  }
}

async function book(req, res, next) {
  try {
    const userId = req.user.id;
    const { facility_id, booking_date } = req.body;
    if (!facility_id || !booking_date) {
      return res.status(400).json({ error: 'Facility and date are required' });
    }

    const facility = await facilityModel.getFacility(Number(facility_id));
    if (!facility) return res.status(404).json({ error: 'Facility not found' });

    const category = await memberCategory(userId);
    if (!category) {
      return res.status(400).json({ error: 'You need an active membership to book' });
    }
    if (!isAllowed(category.facilities, facility.name)) {
      return res
        .status(403)
        .json({ error: `Your ${category.name} membership does not include ${facility.name}` });
    }

    const booking = await facilityModel.createBooking(userId, facility.id, booking_date);
    await rewardModel.addPoints(userId, rewardModel.POINTS.booking, 'Facility booking');

    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
}

async function myBookings(req, res, next) {
  try {
    res.json({ bookings: await facilityModel.listBookings(req.user.id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, book, myBookings };
