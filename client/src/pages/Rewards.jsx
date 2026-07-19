import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Loading from '../components/Loading';
import { myRewards } from '../api/rewards';

export default function Rewards() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    myRewards()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="mb-3">Reward Points</h2>
      <Card className="mb-4" style={{ maxWidth: 320 }}>
        <Card.Body className="text-center">
          <Card.Title>Balance</Card.Title>
          <h1 className="text-primary">{data.balance}</h1>
          <small className="text-muted">points</small>
        </Card.Body>
      </Card>

      <h4>History</h4>
      {data.transactions.length === 0 ? (
        <p>No points earned yet.</p>
      ) : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((t) => (
              <tr key={t.id}>
                <td>{new Date(t.created_at).toLocaleDateString()}</td>
                <td>{t.reason}</td>
                <td className={t.points < 0 ? 'text-danger' : 'text-success'}>
                  {t.points > 0 ? `+${t.points}` : t.points}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
