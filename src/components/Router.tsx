import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  CreatePin,
  Feed,
  Home,
  Login,
  PinDetail,
  Pins,
  Search,
  UserProfile,
} from '../pages';
import PrivateRoutes from './PrivateRoutes';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Home />}>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/" element={<Pins />}>
            <Route index element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/pin-detail/:pinId" element={<PinDetail />} />
            <Route path="/create-pin" element={<CreatePin />} />
            <Route path="*" element={<p>Page Not Found</p>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
