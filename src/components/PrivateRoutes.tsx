import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useUserContext } from 'utils/contexts/UserContext';

/**
 * If the user is logged in, render the route, otherwise redirect to the login page
 * @returns The PrivateRoutes component is being returned.
 */
const PrivateRoutes = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  console.log('PrivateRoutes', { user });

  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateRoutes;
