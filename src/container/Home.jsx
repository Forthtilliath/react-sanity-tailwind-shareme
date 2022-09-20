import React, { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link, Route, Routes } from 'react-router-dom';

import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
import { useEffectOnce, useToggle } from '../utils/hooks';

import { client } from '../client';
import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';

const Home = () => {
  const [showSidebar, _toggleSidebar, openSidebar, closeSidebar] = useToggle();
  const [user, setUser] = useState();
  const scrollRef = useRef();

  const userInfo = fetchUser();

  useEffectOnce(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => setUser(data[0]));
  }, []);

  useEffectOnce(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex flex-col h-screen duration-75 ease-out bg-gray-50 md:flex-row transition-height">
      <div className="flex-initial hidden h-screen md:flex">
        <Sidebar user={user} closeToggle={closeSidebar} />
      </div>
      <div className="flex flex-row md:hidden">
        <div className="flex flex-row items-center justify-between w-full p-2 shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={openSidebar}
          />
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + '/assets/logo.png'}
              alt="logo"
              className="w-28"
            />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link>
        </div>
        {showSidebar && (
          <div className="fixed z-10 w-4/5 h-screen overflow-y-auto bg-white shadow-md animate-slide-in">
            <div className="absolute top-0 right-0 p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={closeSidebar}
              />
            </div>
            <Sidebar user={user} closeToggle={closeSidebar} />
          </div>
        )}
      </div>
      <div className="flex-1 h-screen pb-2 overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
