import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) return <Navigate to="/" />;

  if (adminOnly && !user?.is_admin) return <Navigate to="/home" />;

  return children;
}
