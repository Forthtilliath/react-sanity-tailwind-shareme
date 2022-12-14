import React from 'react';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import { useSearchContext } from '../utils/contexts/SearchContext';
import { useUserContext } from '../utils/contexts/UserContext';
import { useRouter } from '../utils/hooks';

import { UserImage } from '.';

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearchContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  let { pathname } = useRouter();

  if (!user) return null;

  return (
    <div className="flex w-full gap-2 mt-5 md:gap-5 pb-7">
      <div className="flex items-center justify-start w-full px-2 bg-white border-none rounded-md outline-none focus-within:shadow-sm focus-within:outline-2 focus-within:outline-red-500">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          // Tab only works in search route ! To not be redirected on focus
          tabIndex={'/search' === pathname ? 0 : -1}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          onFocus={() => navigate('/search')}
          className="w-full p-2 bg-white outline-none"
        />
      </div>
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
