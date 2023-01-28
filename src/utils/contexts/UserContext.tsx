import jwt_decode from 'jwt-decode';
import jwt_encode from 'jwt-encode';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { fetchUser } from 'utils/queries';

import { TSetter, TUser, TUserDB } from '../../@types';
import { LOCALSTORAGE_KEY_USER } from '../constants';
import { getSeconds } from '../methods';

export interface IUserContext {
  user: TUser | null | undefined;
  setUser: TSetter<TUser | null | undefined>;
  encode: (data: TUser) => string;
  login: (data: TUserDB) => void;
}

const UserContext = createContext<IUserContext | null>(null);

function UserProvider({ children }: PropsWithChildren) {
  const userLS = window.localStorage.getItem(LOCALSTORAGE_KEY_USER);
  const userInfo: TUser | null = userLS ? jwt_decode(userLS) : null;
  const [user, setUser] = useState<TUser | undefined | null>();

  useEffect(() => {
    if (userInfo) {
      fetchUser(userInfo._id).then((user) => {
        console.log('userContext', { userInfo, user });
        setUser(user);
        if (!user) {
          window.localStorage.removeItem(LOCALSTORAGE_KEY_USER);
        }
      });
    } else {
      setUser(null);
      window.localStorage.removeItem(LOCALSTORAGE_KEY_USER);
    }
  }, []);

  const login = (data: TUserDB) => {
    if (!process.env.REACT_APP_TOKEN_KEY)
      throw new Error('REACT_APP_TOKEN_KEY not found!');

    const dataToEncode = {
      _id: data._id,
      _createdAt: data._createdAt,
      _updatedAt: data._updatedAt,
      userName: data.userName,
      image: data.image,
      roles: data.roles,
      iat: getSeconds(),
      exp: getSeconds() + 7 * 24 * 60 * 60,
    };
    setUser(dataToEncode);
    window.localStorage.setItem(LOCALSTORAGE_KEY_USER, encode(dataToEncode));
  };

  const encode = (data: TUser) => {
    if (!process.env.REACT_APP_TOKEN_KEY)
      throw new Error('REACT_APP_TOKEN_KEY not found!');

    const encodeOptions = {
      expiresIn: '7d',
      algorithm: 'HS512',
    };
    return jwt_encode(data, process.env.REACT_APP_TOKEN_KEY, encodeOptions);
  };

  const value = {
    user,
    setUser,
    encode,
    login,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUserContext was used outside of its Provider');
  }

  return context;
};

export { UserProvider, useUserContext };
