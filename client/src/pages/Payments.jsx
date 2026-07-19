import { useEffect, useState } from 'react';
import { Card, Form, Button, Table, Alert, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import { listCategories } from '../api/categories';
import { createPayment, myPayments } from '../api/payments';

const MONTH_OPTIONS = [1, 3, 6, 12];

export default function Payments() {
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ category_id: '', payment_type: 'monthly', months_paid: 1 });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const [cats, pays] = await Promise.all([listCategories(), myPayments()]);
    setCategories(cats);
    setPayments(pays);
    if (cats.length && !form.category_id) {
      setForm((f) => ({ ...f, category_id: cats[0].id }));
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function pay(e) {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const res = await createPayment({
        category_id: Number(form.category_id),
        payment_type: form.payment_type,
        months_paid: Number(form.months_paid),
      });
      if (res.subscription) {
        setMsg(`Payment successful. Membership valid until ${res.subscription.expiry_date}.`);
      } else {
        setMsg('Registration payment recorded.');
      }
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    }
  }

  if (loading) return <Loading />;

  const selected = categories.find((c) => c.id === Number(form.category_id));
  const estimate =
    form.payment_type === 'registration'
      ? Number(selected?.registration_fee || 0)
      : Number(selected?.monthly_fee || 0) * Number(form.months_paid);

  return (
    <div>
      <h2 className="mb-3">Payments</h2>
      {msg && <Alert variant="success">{msg}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4" style={{ maxWidth: 520 }}>
        <Card.Body>
          <Form onSubmit={pay}>
            <Form.Group className="mb-3">
              <Form.Label>Membership category</Form.Label>
              <Form.Select name="category_id" value={form.category_id} onChange={update}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (reg {c.registration_fee} / month {c.monthly_fee})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Payment type</Form.Label>
                  <Form.Select name="payment_type" value={form.payment_type} onChange={update}>
                    <option value="monthly">Monthly / renewal</option>
                    <option value="registration">Registration fee</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Months</Form.Label>
                  <Form.Select
                    name="months_paid"
                    value={form.months_paid}
                    onChange={update}
                    disabled={form.payment_type === 'registration'}
                  >
                    {MONTH_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <p><strong>Amount:</strong> {estimate.toFixed(2)}</p>
            <Button type="submit">Pay</Button>
          </Form>
        </Card.Body>
      </Card>

      <h4>Payment history</h4>
      {payments.length === 0 ? (
        <p>No payments yet.</p>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Months</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.paid_at).toLocaleDateString()}</td>
                <td>{p.payment_type}</td>
                <td>{p.months_paid}</td>
                <td>{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
