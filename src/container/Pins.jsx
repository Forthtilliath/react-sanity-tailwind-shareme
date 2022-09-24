import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { useDebounce } from '../utils/hooks';

import { CreatePin, Feed, Navbar, PinDetail, Search } from '../components';

const Pins = (navProps) => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const debouncedSearchTerm = useDebounce(searchTerm, 250);

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar {...navProps} />
      </div>
      <div className="h-full">
        {/* <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={<Search searchTerm={debouncedSearchTerm} />}
          />
        </Routes> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Pins;
