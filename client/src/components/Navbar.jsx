import { useEffect, useState } from 'react';
import { Navbar as BsNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { myNotifications } from '../api/notifications';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (user) {
      myNotifications()
        .then((d) => setUnread(d.unread))
        .catch(() => setUnread(0));
    } else {
      setUnread(0);
    }
  }, [user]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="md">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          Sports HUB
        </BsNavbar.Brand>
        <BsNavbar.Toggle />
        <BsNavbar.Collapse>
          <Nav className="me-auto">
            {user && user.role !== 'admin' && user.account_status === 'active' && (
              <>
                <Nav.Link as={Link} to="/member">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
                <Nav.Link as={Link} to="/referrals">Referrals</Nav.Link>
                <Nav.Link as={Link} to="/rewards">Rewards</Nav.Link>
                <Nav.Link as={Link} to="/facilities">Facilities</Nav.Link>
              </>
            )}
            {user && user.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                <Nav.Link as={Link} to="/admin/categories">Categories</Nav.Link>
                <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                <Nav.Link as={Link} to="/notifications" className="text-light">
                  Notifications{' '}
                  {unread > 0 && <Badge bg="danger">{unread}</Badge>}
                </Nav.Link>
                <span className="text-light me-3">{user.full_name}</span>
                <Button size="sm" variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
