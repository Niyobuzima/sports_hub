import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import Loading from '../components/Loading';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/categories';

const EMPTY = {
  name: '',
  registration_fee: 0,
  monthly_fee: 0,
  referral_percent: 0,
  withdrawal_limit: 0,
  reward_multiplier: 1,
  facilities: '',
};

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null); // id when editing
  const [form, setForm] = useState(EMPTY);

  async function load() {
    try {
      setCats(await listCategories());
    } catch {
      setError('Could not load categories');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setShow(true);
  }

  function openEdit(c) {
    setEditing(c.id);
    setForm({
      name: c.name,
      registration_fee: c.registration_fee,
      monthly_fee: c.monthly_fee,
      referral_percent: c.referral_percent,
      withdrawal_limit: c.withdrawal_limit,
      reward_multiplier: c.reward_multiplier,
      facilities: c.facilities || '',
    });
    setShow(true);
  }

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function save(e) {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await updateCategory(editing, form);
      } else {
        await createCategory(form);
      }
      setShow(false);
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  }

  async function remove(id) {
    if (!window.confirm('Delete this category?')) return;
    setError('');
    try {
      await deleteCategory(id);
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
    }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Membership Categories</h2>
        <Button onClick={openNew}>New Category</Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg fee</th>
            <th>Monthly</th>
            <th>Referral %</th>
            <th>Withdraw limit</th>
            <th>Reward x</th>
            <th>Facilities</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.registration_fee}</td>
              <td>{c.monthly_fee}</td>
              <td>{c.referral_percent}</td>
              <td>{c.withdrawal_limit}</td>
              <td>{c.reward_multiplier}</td>
              <td>{c.facilities}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-1" onClick={() => openEdit(c)}>
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => remove(c.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={save}>
          <Modal.Header closeButton>
            <Modal.Title>{editing ? 'Edit' : 'New'} Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={update} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Registration fee</Form.Label>
              <Form.Control type="number" step="0.01" name="registration_fee" value={form.registration_fee} onChange={update} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Monthly fee</Form.Label>
              <Form.Control type="number" step="0.01" name="monthly_fee" value={form.monthly_fee} onChange={update} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Referral percent</Form.Label>
              <Form.Control type="number" step="0.01" name="referral_percent" value={form.referral_percent} onChange={update} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Withdrawal limit (points)</Form.Label>
              <Form.Control type="number" step="1" name="withdrawal_limit" value={form.withdrawal_limit} onChange={update} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Reward multiplier</Form.Label>
              <Form.Control type="number" step="0.01" name="reward_multiplier" value={form.reward_multiplier} onChange={update} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Facilities (comma separated)</Form.Label>
              <Form.Control name="facilities" value={form.facilities} onChange={update} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
