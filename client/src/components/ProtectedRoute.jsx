import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

export default function ProtectedRoute({ role, requireActive = true, children }) {
  const { user, token, loading } = useAuth();

  if (loading) return <Loading />;
  if (!token) return <Navigate to="/login" replace />;

  // pending/suspended/rejected users can't reach the dashboards
  if (requireActive && user?.account_status !== 'active') {
    return <Navigate to="/account" replace />;
  }

  if (role && user?.role !== role) return <Navigate to="/" replace />;

  return children;
}
