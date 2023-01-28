import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import { RiHomeFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { SidebarType } from '../@types';
import { NavLinkMenuItem } from '../components';
import { categories } from '../utils/data';

const Sidebar: SidebarType = ({ closeToggle }) => {
  return (
    <div className="flex flex-col justify-between h-full overflow-y-scroll bg-white min-w-210 scrollbar-hide">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex items-center gap-2 pt-1 mx-auto my-6 w-190 outline-2 outline-red-500 outline-offset-4"
          onClick={closeToggle}>
          <img
            src={process.env.PUBLIC_URL + '/assets/logo.png'}
            alt="logo"
            className="w-full"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLinkMenuItem
            to="/"
            onClick={closeToggle}
            activeClassName="font-extrabold border-r-2 border-black text-black"
            className="flex items-center gap-3 px-5 text-gray-500 capitalize transition-all duration-200 ease-in-out outline-none hover:text-black focus:border-l-red-500 focus:border-l-8">
            <RiHomeFill /> Home
          </NavLinkMenuItem>
          <h3 className="px-5 mt-2 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, -1).map((category) => (
            <NavLinkMenuItem
              key={category.name}
              to={`/category/${category.name}`}
              onClick={closeToggle}
              activeClassName="font-extrabold border-r-2 border-black text-black"
              className="flex items-center gap-3 px-5 text-gray-500 capitalize transition-all duration-200 ease-in-out outline-none hover:text-black focus:border-l-red-500 focus:border-l-8">
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category"
              />
              {category.name}
            </NavLinkMenuItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
