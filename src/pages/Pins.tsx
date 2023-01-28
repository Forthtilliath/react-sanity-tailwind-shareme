import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../parts';

const Pins = () => {
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar />
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Pins;
