import { Route, Routes, useNavigate } from 'react-router-dom';

import { useUserContext } from './utils/contexts/UserContext';
import { useEffectOnce } from './utils/hooks';

import {
  CreatePin,
  Feed,
  Login,
  PinDetail,
  Search,
  UserProfile,
} from './components';
import Home from './container/Home';
import Pins from './container/Pins';

function App() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  /* It will check if the user is logged in and if not,
  it will redirect to the login page. */
  useEffectOnce(() => {
    if (user === undefined) return;
    if (user === null) navigate('/login');
  }, [user]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />}>
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/" element={<Pins />}>
          <Route index element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetail />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/**
 * TODO List
 * [ ] Fix hover on pin
 */
