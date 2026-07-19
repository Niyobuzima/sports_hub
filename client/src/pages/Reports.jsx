import { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Button } from 'react-bootstrap';
import Loading from '../components/Loading';
import { reportSummary } from '../api/reports';

// turn an array of objects into a CSV string and trigger a download
function downloadCsv(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  rows.forEach((r) => lines.push(headers.map((h) => r[h]).join(',')));
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Stat({ label, value }) {
  return (
    <Col md={3} sm={6}>
      <Card className="text-center h-100">
        <Card.Body>
          <div className="text-muted small">{label}</div>
          <h3 className="mb-0">{value}</h3>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportSummary()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const overviewRows = [
    { metric: 'Total members', value: data.totalMembers },
    { metric: 'Active members', value: data.activeMembers },
    { metric: 'Expired memberships', value: data.expiredMemberships },
    { metric: 'Monthly revenue', value: data.monthlyRevenue },
    { metric: 'Total revenue', value: data.totalRevenue },
    { metric: 'Referrals', value: data.referralCount },
    { metric: 'Referral bonus total', value: data.referralBonusTotal },
    { metric: 'Points issued', value: data.pointsIssued },
    { metric: 'Points withdrawn', value: data.pointsWithdrawn },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Reports</h2>
        <div className="d-print-none">
          <Button variant="outline-secondary" className="me-2" onClick={() => downloadCsv('report-overview.csv', overviewRows)}>
            Export Excel (CSV)
          </Button>
          <Button variant="outline-secondary" onClick={() => window.print()}>
            Export PDF (Print)
          </Button>
        </div>
      </div>

      <Row className="g-3 mb-4">
        <Stat label="Total members" value={data.totalMembers} />
        <Stat label="Active members" value={data.activeMembers} />
        <Stat label="Expired memberships" value={data.expiredMemberships} />
        <Stat label="Monthly revenue" value={data.monthlyRevenue} />
        <Stat label="Total revenue" value={data.totalRevenue} />
        <Stat label="Referrals" value={data.referralCount} />
        <Stat label="Points issued" value={data.pointsIssued} />
        <Stat label="Points withdrawn" value={data.pointsWithdrawn} />
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Category distribution</h4>
            <Button size="sm" variant="link" className="d-print-none"
              onClick={() => downloadCsv('category-distribution.csv', data.categoryDistribution)}>
              CSV
            </Button>
          </div>
          <Table striped bordered responsive size="sm">
            <thead><tr><th>Category</th><th>Members</th></tr></thead>
            <tbody>
              {data.categoryDistribution.map((c) => (
                <tr key={c.name}><td>{c.name}</td><td>{c.members}</td></tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Facility utilization</h4>
            <Button size="sm" variant="link" className="d-print-none"
              onClick={() => downloadCsv('facility-utilization.csv', data.facilityUtilization)}>
              CSV
            </Button>
          </div>
          <Table striped bordered responsive size="sm">
            <thead><tr><th>Facility</th><th>Bookings</th></tr></thead>
            <tbody>
              {data.facilityUtilization.map((f) => (
                <tr key={f.name}><td>{f.name}</td><td>{f.bookings}</td></tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
