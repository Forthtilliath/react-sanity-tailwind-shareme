import { Outlet } from 'react-router-dom';

import { Navbar } from '../components';

const Pins = (navProps) => {
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar {...navProps} />
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Pins;
