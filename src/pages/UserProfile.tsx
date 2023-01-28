import { googleLogout } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

import { AttentionIcon, DeleteIcon } from 'components/Icons';

import { useConfirm } from 'utils/contexts/ConfirmContext';
import useUser from 'utils/hooks/useUser';
import {
  fetchUser,
  fetchUserCreatedPins,
  fetchUserSavedPins,
} from 'utils/queries';

import { TPin, TUserDB, UserProfileButtonType } from '../@types';
import { MasonryLayout, Spinner, UserImage } from '../components';
import { LOCALSTORAGE_KEY_USER } from '../utils/constants';

const randomImage =
  'https://source.unsplash.com/1600x900/?nature,photograpy,technology';

const states = ['Created', 'Saved'];

const confirmOptions = {
  title: 'Deactivate account',
  message:
    'Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.',
  confirm: 'Deactivate',
};

const UserProfile = () => {
  // const [user, setUser] = useState<TUserDB | null>(null);
  const [pins, setPins] = useState<TPin[]>([]);
  const [activeBtn, setActiveBtn] = useState(states[0]);
  const navigate = useNavigate();

  const { userId } = useParams();
  const { confirm } = useConfirm();

  // TODO useUser (useQuery)
  // const {
  //   isLoading,
  //   error,
  //   data: user,
  // } = useUser<string | undefined, TUserDB>(userId);
  // if (!userId) return null;

  const { isLoading, error, data: user } = useUser({ userId });

  // useEffect(() => {
  //   if (!userId) return;

  //   fetchUser(userId).then(setUser);
  // }, [userId]);
  console.log({ user });

  useEffect(() => {
    if (!userId) return;

    if (activeBtn === 'Created') {
      fetchUserCreatedPins(userId).then(setPins);
      return;
    }

    if (activeBtn === 'Saved') {
      fetchUserSavedPins(userId).then(setPins);
      return;
    }
  }, [activeBtn, userId]);

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

  if (isLoading) {
    return <Spinner message="Loading profile..." />;
  }

  if (error) {
    return <Spinner message="Error..." />;
  }

  const handleRemoveAccount = async () => {
    if (await confirm(confirmOptions)) {
      //remove the account
      console.log('Remove');
    }
  };

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
            <div className="relative w-full">
              <UserImage
                src={user.image}
                className="object-cover w-20 h-20 mx-auto -mt-10 rounded-full shadow-xl"
              />
              <button
                type="button"
                onClick={handleRemoveAccount}
                aria-label="Delete account"
                className="absolute grid top-1 right-1 place-content-center">
                <DeleteIcon className="w-12 h-12 text-red-500 hover:text-red-700 hover:scale-110" />
              </button>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-center">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 z-10 p-2">
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
                onClick={() => setActiveBtn(state)}
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

const Button: UserProfileButtonType = ({ label, isActive, onClick }) => {
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
