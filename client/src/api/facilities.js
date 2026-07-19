import api from './axios';

export async function listFacilities() {
  const res = await api.get('/facilities');
  return res.data;
}

export async function bookFacility(facility_id, booking_date) {
  const res = await api.post('/facilities/book', { facility_id, booking_date });
  return res.data;
}

export async function myBookings() {
  const res = await api.get('/facilities/bookings');
  return res.data.bookings;
}
