import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

import { LOCALSTORAGE_KEY_USER } from '../../utils/constants';
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../../utils/data';

import { MasonryLayout, Spinner, UserImage } from '../';
import { client } from '../../client';

const randomImage =
  'https://source.unsplash.com/1600x900/?nature,photograpy,technology';

const states = ['Created', 'Saved'];

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [pins, setPins] = useState([]);
  const [text, setText] = useState(states[0]);
  const [activeBtn, setActiveBtn] = useState(states[0]);
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => setUser(data[0]));
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => setPins(data));
      return;
    }
    if (text === 'Saved') {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => setPins(data));
      return;
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_USER);
    try {
      googleLogout();
    } catch (err) {
      console.log({ err });
    }
    navigate('/login');
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative items-center justify-center h-full pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col items-center justify-center">
            <img
              src={randomImage}
              alt="banner"
              className="object-cover w-full shadow-lg h-370 2xl:h-510"
            />
            <UserImage
              src={user.image}
              className="object-cover w-20 h-20 -mt-10 rounded-full shadow-xl"
            />
            <h1 className="mt-3 text-3xl font-bold text-center">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 p-2 z-1">
              {userId === user._id && (
                <button
                  type="button"
                  aria-label="Log out"
                  className="p-2 bg-white border-4 border-white rounded-full shadow-md outline-none cursor-pointer hocus:border-red-500"
                  onClick={logout}>
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            {states.map((state) => (
              <Button
                key={state}
                label={state}
                isActive={activeBtn === state}
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn(state);
                }}
              />
            ))}
          </div>

          {pins.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} setPins={setPins} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full mt-2 text-xl font-bold">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Button = ({ label, isActive, onClick }) => {
  if (isActive)
    return (
      <button
        key={label}
        type="button"
        tabIndex={-1}
        onClick={onClick}
        className="w-20 p-2 mx-1 font-bold text-white bg-red-500 rounded-full outline-none">
        {label}
      </button>
    );

  return (
    <button
      key={label}
      type="button"
      tabIndex={0}
      onClick={onClick}
      className="w-20 p-2 mx-1 font-bold text-black border-4 border-transparent rounded-full outline-none hocus:border-red-500 hocus:text-red-500">
      {label}
    </button>
  );
};

export default UserProfile;
