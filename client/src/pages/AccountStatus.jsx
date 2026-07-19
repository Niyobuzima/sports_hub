import { Alert, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const MESSAGES = {
  pending: {
    variant: 'warning',
    title: 'Waiting for approval',
    text: 'Your account is pending. An admin needs to approve it before you can use your dashboard. Please check back later.',
  },
  suspended: {
    variant: 'danger',
    title: 'Account suspended',
    text: 'Your account has been suspended. Please contact the admin for help.',
  },
  rejected: {
    variant: 'danger',
    title: 'Registration rejected',
    text: 'Your registration was rejected. Please contact the admin.',
  },
};

export default function AccountStatus() {
  const { user } = useAuth();
  const info =
    MESSAGES[user?.account_status] || {
      variant: 'info',
      title: 'Account',
      text: '',
    };

  return (
    <Card className="mx-auto" style={{ maxWidth: 500 }}>
      <Card.Body className="text-center">
        <h2>{info.title}</h2>
        <Alert variant={info.variant} className="mt-3">
          {info.text}
        </Alert>
        <p className="text-muted mb-0">Current status: {user?.account_status}</p>
      </Card.Body>
    </Card>
  );
}
