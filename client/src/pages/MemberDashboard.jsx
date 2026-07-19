import { Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="mb-3">Welcome, {user?.full_name}</h2>
      <Card style={{ maxWidth: 400 }}>
        <Card.Body>
          <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
          <p className="mb-1"><strong>Role:</strong> {user?.role}</p>
          <p className="mb-1"><strong>Account:</strong> {user?.account_status}</p>
          {user?.referral_code && (
            <p className="mb-1"><strong>Referral code:</strong> {user.referral_code}</p>
          )}
          <p className="mb-0"><strong>Reward points:</strong> {user?.reward_points ?? 0}</p>
        </Card.Body>
      </Card>
      <p className="text-muted mt-3">
        Your membership status, expiry and payments will show here soon.
      </p>
    </div>
  );
}
