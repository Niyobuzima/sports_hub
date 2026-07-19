import { useEffect, useState } from 'react';
import { Table, Button, Badge, Alert } from 'react-bootstrap';
import Loading from '../components/Loading';
import { listRegistrations, updateRegistration } from '../api/registrations';

const STATUS_COLORS = {
  active: 'success',
  pending: 'warning',
  rejected: 'danger',
  suspended: 'secondary',
};

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      setRows(await listRegistrations());
    } catch (err) {
      setError('Could not load registrations');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function act(userId, action) {
    setError('');
    try {
      await updateRegistration(userId, action);
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Action failed');
    }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="mb-3">Registrations</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {rows.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.full_name}</td>
                <td>{r.email}</td>
                <td>{r.role}</td>
                <td>
                  <Badge bg={STATUS_COLORS[r.account_status] || 'light'}>
                    {r.account_status}
                  </Badge>
                </td>
                <td>
                  {r.account_status !== 'active' && (
                    <Button size="sm" variant="success" className="me-1"
                      onClick={() => act(r.user_id, 'approve')}>
                      Approve
                    </Button>
                  )}
                  {r.account_status !== 'rejected' && (
                    <Button size="sm" variant="danger" className="me-1"
                      onClick={() => act(r.user_id, 'reject')}>
                      Reject
                    </Button>
                  )}
                  {r.account_status === 'active' && (
                    <Button size="sm" variant="secondary"
                      onClick={() => act(r.user_id, 'suspend')}>
                      Suspend
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
