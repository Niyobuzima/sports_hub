const { query } = require('../db/pool');

async function listFacilities() {
  const res = await query('SELECT * FROM facilities WHERE is_active = true ORDER BY id');
  return res.rows;
}

async function getFacility(id) {
  const res = await query('SELECT * FROM facilities WHERE id = $1', [id]);
  return res.rows[0];
}

async function createBooking(userId, facilityId, bookingDate) {
  const res = await query(
    `INSERT INTO bookings (user_id, facility_id, booking_date)
     VALUES ($1,$2,$3) RETURNING *`,
    [userId, facilityId, bookingDate]
  );
  return res.rows[0];
}

async function listBookings(userId) {
  const res = await query(
    `SELECT b.id, to_char(b.booking_date,'YYYY-MM-DD') AS booking_date,
            b.created_at, f.name AS facility
     FROM bookings b JOIN facilities f ON f.id = b.facility_id
     WHERE b.user_id = $1 ORDER BY b.booking_date DESC`,
    [userId]
  );
  return res.rows;
}

module.exports = { listFacilities, getFacility, createBooking, listBookings };
