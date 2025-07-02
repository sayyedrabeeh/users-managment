import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (isAuthenticated) {
    return user?.is_admin ? <Navigate to="/home" /> : <Navigate to="/home" />;
  }

  return children;
}
