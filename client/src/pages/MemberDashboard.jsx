import { useEffect, useState } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { mySubscription } from '../api/subscription';
import Loading from '../components/Loading';

const STATUS_COLORS = {
  Active: 'success',
  'Expiring Soon': 'warning',
  Expired: 'danger',
  Suspended: 'secondary',
  None: 'light',
};

export default function MemberDashboard() {
  const { user } = useAuth();
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mySubscription()
      .then(setSub)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="mb-3">Welcome, {user?.full_name}</h2>
      <Row className="g-3">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Membership</Card.Title>
              <p className="mb-1">
                <strong>Status:</strong>{' '}
                <Badge bg={STATUS_COLORS[sub?.status] || 'light'} text={sub?.status === 'None' ? 'dark' : undefined}>
                  {sub?.status || 'None'}
                </Badge>
              </p>
              <p className="mb-1"><strong>Category:</strong> {sub?.category || '—'}</p>
              <p className="mb-1"><strong>Expiry date:</strong> {sub?.expiryDate || '—'}</p>
              <p className="mb-0"><strong>Days remaining:</strong> {sub?.remainingDays ?? 0}</p>
              {(!sub || sub.status === 'None') && (
                <p className="text-muted mt-2 mb-0">No active membership. Go to Payments to subscribe.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Account</Card.Title>
              <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
              <p className="mb-1"><strong>Role:</strong> {user?.role}</p>
              {user?.referral_code && (
                <p className="mb-1"><strong>Referral code:</strong> {user.referral_code}</p>
              )}
              <p className="mb-0"><strong>Reward points:</strong> {user?.reward_points ?? 0}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
