import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

import SearchInput from 'components/SearchInput';

import { UserImage } from '../components';
import { useUserContext } from '../utils/contexts/UserContext';

const Navbar = () => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <div className="flex w-full gap-2 mt-5 md:gap-5 pb-7">
      <SearchInput />
      <div className="flex gap-3">
        <Link
          to={`user-profile/${user._id}`}
          aria-label="Your Profile"
          className="hidden rounded-lg md:block focus:outline outline-red-500 outline-2 outline-offset-0">
          <UserImage src={user.image} className="h-12 rounded-lg w-14" />
        </Link>
        <Link
          to="create-pin"
          aria-label="Create a Pin"
          className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-lg md:w-14 md:h-12 focus:outline outline-red-500 outline-2 outline-offset-0">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
