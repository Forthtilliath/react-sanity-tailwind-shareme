import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { RiHomeFill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';

import { categories } from '../utils/data';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ user, closeToggle }) => {
  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-white min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-5 pt-1 my-6 w-190">
          <img
            src={process.env.PUBLIC_URL + '/assets/logo.png'}
            alt="logo"
            className="w-full"
            onClick={closeToggle}
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={closeToggle}>
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="px-5 mt-2 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, -1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={closeToggle}
              key={category.name}>
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex items-center gap-2 p-2 mx-3 my-5 mb-3 bg-white rounded-lg shadow-lg"
          onClick={closeToggle}>
          <img
            src={user.image}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
