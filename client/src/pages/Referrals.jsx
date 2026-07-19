import { useEffect, useState } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import Loading from '../components/Loading';
import { myReferrals } from '../api/referrals';

export default function Referrals() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myReferrals()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="mb-3">Referrals</h2>
      <Card className="mb-4" style={{ maxWidth: 480 }}>
        <Card.Body>
          <p className="mb-1">
            <strong>Your referral code:</strong>{' '}
            <Badge bg="primary" style={{ fontSize: '1rem' }}>{data.referralCode}</Badge>
          </p>
          <p className="mb-1"><strong>People referred:</strong> {data.referredCount}</p>
          <p className="mb-0"><strong>Total bonus earned:</strong> {data.totalBonus}</p>
          <small className="text-muted">
            Share your code. When someone signs up with it and pays, you earn a bonus.
          </small>
        </Card.Body>
      </Card>

      <h4>Members you referred</h4>
      {data.referred.length === 0 ? (
        <p>No referrals yet.</p>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {data.referred.map((r) => (
              <tr key={r.id}>
                <td>{r.full_name}</td>
                <td>{r.email}</td>
                <td>{r.account_status}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
