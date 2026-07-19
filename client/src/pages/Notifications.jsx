import { useEffect, useState } from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import Loading from '../components/Loading';
import { myNotifications, markAllRead } from '../api/notifications';

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await myNotifications();
    setItems(data.notifications);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function readAll() {
    await markAllRead();
    await load();
  }

  if (loading) return <Loading />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Notifications</h2>
        <Button variant="outline-secondary" onClick={readAll}>Mark all read</Button>
      </div>
      {items.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ListGroup>
          {items.map((n) => (
            <ListGroup.Item key={n.id} className="d-flex justify-content-between align-items-start">
              <div>
                {!n.is_read && <Badge bg="primary" className="me-2">new</Badge>}
                {n.message}
              </div>
              <small className="text-muted">{new Date(n.created_at).toLocaleString()}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
