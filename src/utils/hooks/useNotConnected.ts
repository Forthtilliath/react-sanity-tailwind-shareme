import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

/**
 * If the user is not logged in, redirect to the login page
 */
export const useNotConnected = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useNotConnected', { user });
    if (user === null) navigate('/login');
  }, [user]);
};

export default useNotConnected;
