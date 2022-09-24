import { Navigate, Outlet } from 'react-router-dom';

import { useUserContext } from '../../utils/contexts/UserContext';

/**
 * If the user is not connected, redirect to the login page, otherwise, display the content of the
 * current page.
 */
const PrivateRoute = () => {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;
