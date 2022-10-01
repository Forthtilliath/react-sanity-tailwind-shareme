import { IoIosArrowForward, IoMdSearch } from 'react-icons/io';
import { RiHomeFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { useUserContext } from '../utils/contexts/UserContext';
import { categories } from '../utils/data';

import { UserImage } from './';
import NavLinkMenu from './NavLinkMenu';

const Sidebar = ({ closeToggle }) => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col justify-between h-full overflow-y-scroll bg-white min-w-210 hide-scrollbar">
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
          <NavLinkMenu
            to="/"
            onClick={closeToggle}
            activeClassName="font-extrabold border-r-2 border-black text-black"
            className="flex items-center gap-3 px-5 text-gray-500 capitalize transition-all duration-200 ease-in-out outline-none hover:text-black focus:border-l-red-500 focus:border-l-8">
            <RiHomeFill /> Home
          </NavLinkMenu>
          <NavLinkMenu
            to="/search"
            onClick={closeToggle}
            activeClassName="font-extrabold border-r-2 border-black text-black"
            className="flex items-center gap-3 px-5 text-gray-500 capitalize transition-all duration-200 ease-in-out outline-none hover:text-black focus:border-l-red-500 focus:border-l-8">
            <IoMdSearch /> Search
          </NavLinkMenu>
          <h3 className="px-5 mt-2 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, -1).map((category) => (
            <NavLinkMenu
              key={category.name}
              to={`/category/${category.name}`}
              onClick={closeToggle}
              activeClassName="font-extrabold border-r-2 border-black text-black"
              className="flex items-center gap-3 px-5 text-gray-500 capitalize transition-all duration-200 ease-in-out outline-none hover:text-black focus:border-l-red-500 focus:border-l-8">
              {/* className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }> */}
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category"
              />
              {category.name}
            </NavLinkMenu>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex items-center gap-2 p-2 mx-3 my-5 mb-3 bg-white rounded-lg shadow-lg outline-red-500 outline-2"
          onClick={closeToggle}>
          <UserImage src={user.image} className="w-10 h-10 rounded-full" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
