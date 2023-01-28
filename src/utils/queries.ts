import { client } from 'sanityClient';

import {
  SearchQueryType,
  TPinData,
  TUserDB,
  TUserGoogle,
  UserQueryType,
} from '@types';

import { ROLES } from './constants';

/**
 * Get all pins. Some parameters can be sent to filter the results.
 *
 * Pins can be filtered by :
 * - **searchTerm** : search terms are searched across about , titles and categories
 * - **category** : category name is searched across about, titles and categories
 * - **searchTerm** & **category** : search terms are searched among about and titles,
 * of the displayed category
 */
export const fetchFeed: SearchQueryType = ({ queryKey }) => {
  console.log(queryKey);
  const [_key, { searchTerm = '', category = '' }] = queryKey;

  const matches = {
    title: searchTerm || category,
    category: category || searchTerm,
    about: searchTerm || category,
  };

  let searchQuery = '';
  if (searchTerm.length && category.length) {
    searchQuery = ` && category match '${matches.category}*' && (title match '${matches.title}*' || about match '${matches.about}*')`;
  } else if (searchTerm.length) {
    searchQuery = ` && category match '${matches.category}*' || title match '${matches.title}*' || about match '${matches.about}*'`;
  } else if (category.length) {
    searchQuery = ` && category match '${matches.category}*'`;
  }

  return client.fetch(`*[_type == "pin"${searchQuery}] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    title,about,category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`);
};

export const fetchPinDetail = (pinId: string) => {
  return () =>
    client.fetch(`*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`);
};

export const fetchMorePins = (pin: TPinData) => {
  return () =>
    client.fetch(`*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`);
};

export const fetchUser = async (userId: string): Promise<TUserDB | null> => {
  return client
    .fetch(`*[_type == "user" && _id == '${userId}']`)
    .then((data) => data[0] ?? null);
};

export const fetchUser2: UserQueryType = ({ queryKey }) => {
  const [_key, { userId }] = queryKey;
  console.log('fetchUser', { userId });

  return client
    .fetch(`*[_type == "user" && _id == '${userId}']`)
    .then((data) => data[0] ?? null);
};

/**
 * TODO faire ca en une seule querie
sanityClient.fetch(`{
    "communityMembers": ${INITIAL_QUERY},
    "techOptions": ${TECH_OPTIONS_QUERY},
  }`);
 */
export const fetchUserCreatedPins = (userId: string) => {
  return client.fetch(`*[_type == 'pin' && userId == '${userId}' ] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`);
};

export const fetchUserSavedPins = (userId: string) => {
  return client.fetch(`*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`);
};

export const createUserIfNotExists = (user: TUserGoogle) => {
  const { name, sub, picture } = user;

  const doc = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
    roles: [ROLES.user],
  };

  return client.createIfNotExists(doc);
};

export const createPin = (file: File) => {
  return client.assets.upload('image', file, {
    contentType: file.type,
    filename: file.name,
  });
};
