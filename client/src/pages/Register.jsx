import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { register } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setBusy(true);
    try {
      const res = await register(form);
      setSuccess(res.message);
      setForm({ full_name: '', email: '', password: '', role: 'customer' });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Body>
        <h2 className="mb-3">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              name="full_name"
              value={form.full_name}
              onChange={update}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={update}
              minLength={6}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Register as</Form.Label>
            <Form.Select name="role" value={form.role} onChange={update}>
              <option value="customer">Customer</option>
              <option value="instructor">Instructor</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" disabled={busy} className="w-100">
            {busy ? 'Submitting...' : 'Register'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
