import { useEffect, useState } from 'react';
import { Card, Table, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import { myRewards } from '../api/rewards';
import { withdrawPoints, myWithdrawals } from '../api/withdrawals';

export default function Rewards() {
  const [data, setData] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const [rewards, wds] = await Promise.all([myRewards(), myWithdrawals()]);
    setData(rewards);
    setWithdrawals(wds);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function redeem(e) {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const res = await withdrawPoints(Number(points));
      setMsg(`Withdrawal successful. New balance: ${res.balance}.`);
      setPoints('');
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Withdrawal failed');
    }
  }

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="mb-3">Reward Points</h2>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Balance</Card.Title>
              <h1 className="text-primary">{data.balance}</h1>
              <small className="text-muted">points</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Redeem points</Card.Title>
              {msg && <Alert variant="success">{msg}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={redeem} className="d-flex gap-2 align-items-end">
                <Form.Group>
                  <Form.Label>Points to withdraw</Form.Label>
                  <Form.Control
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit">Withdraw</Button>
              </Form>
              <small className="text-muted">
                Minimum withdrawal depends on your membership category.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <h4>Points history</h4>
          {data.transactions.length === 0 ? (
            <p>No points yet.</p>
          ) : (
            <Table striped bordered responsive size="sm">
              <thead>
                <tr><th>Date</th><th>Reason</th><th>Points</th></tr>
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
        </Col>
        <Col md={6}>
          <h4>Withdrawals</h4>
          {withdrawals.length === 0 ? (
            <p>No withdrawals yet.</p>
          ) : (
            <Table striped bordered responsive size="sm">
              <thead>
                <tr><th>Date</th><th>Points</th><th>Status</th></tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td>{new Date(w.created_at).toLocaleDateString()}</td>
                    <td>{w.points}</td>
                    <td>{w.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}
