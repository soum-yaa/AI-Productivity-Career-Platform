import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Guards nested routes — render an `<Outlet />` when the user has a JWT.
 * Wire real verification (e.g. `/api/auth/me`) when your backend is ready.
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
