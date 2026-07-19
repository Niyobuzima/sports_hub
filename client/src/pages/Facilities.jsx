import { useEffect, useState } from 'react';
import { Card, Table, Badge, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import { listFacilities, bookFacility, myBookings } from '../api/facilities';

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [category, setCategory] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ facility_id: '', booking_date: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const [fac, bks] = await Promise.all([listFacilities(), myBookings()]);
    setFacilities(fac.facilities);
    setCategory(fac.category);
    setBookings(bks);
    const firstAllowed = fac.facilities.find((f) => f.accessible);
    if (firstAllowed && !form.facility_id) {
      setForm((f) => ({ ...f, facility_id: firstAllowed.id }));
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function book(e) {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      await bookFacility(Number(form.facility_id), form.booking_date);
      setMsg('Booking confirmed. You earned reward points!');
      setForm({ ...form, booking_date: '' });
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  }

  if (loading) return <Loading />;

  const allowed = facilities.filter((f) => f.accessible);

  return (
    <div>
      <h2 className="mb-3">Facilities</h2>
      <p>Your membership: <strong>{category || 'None'}</strong></p>

      <Row className="g-4">
        <Col md={6}>
          <h4>Available facilities</h4>
          <Table striped bordered responsive>
            <thead>
              <tr><th>Facility</th><th>Access</th></tr>
            </thead>
            <tbody>
              {facilities.map((f) => (
                <tr key={f.id}>
                  <td>{f.name}</td>
                  <td>
                    {f.accessible ? (
                      <Badge bg="success">Included</Badge>
                    ) : (
                      <Badge bg="secondary">Not included</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Book a facility</Card.Title>
              {msg && <Alert variant="success">{msg}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              {allowed.length === 0 ? (
                <p className="text-muted">No facilities available for your membership.</p>
              ) : (
                <Form onSubmit={book}>
                  <Form.Group className="mb-2">
                    <Form.Label>Facility</Form.Label>
                    <Form.Select name="facility_id" value={form.facility_id} onChange={update}>
                      {allowed.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="booking_date" value={form.booking_date} onChange={update} required />
                  </Form.Group>
                  <Button type="submit">Book</Button>
                </Form>
              )}
            </Card.Body>
          </Card>

          <h4>My bookings</h4>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <Table striped bordered responsive size="sm">
              <thead>
                <tr><th>Facility</th><th>Date</th></tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.facility}</td>
                    <td>{b.booking_date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}
