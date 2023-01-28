import { TCategorieData, TPinData } from '../@types';

export const categoriesPath = process.env.PUBLIC_URL + '/assets/categories/';

export const categories: TCategorieData[] = [
  {
    name: 'cars',
    image: categoriesPath + 'cars.jpg',
  },
  {
    name: 'fitness',
    image: categoriesPath + 'fitness.jpg',
  },
  {
    name: 'wallpaper',
    image: categoriesPath + 'wallpaper.jpg',
  },
  {
    name: 'websites',
    image: categoriesPath + 'websites.jpg',
  },
  {
    name: 'photo',
    image: categoriesPath + 'photo.jpg',
  },
  {
    name: 'food',
    image: categoriesPath + 'food.jpg',
  },
  {
    name: 'nature',
    image: categoriesPath + 'nature.jpg',
  },
  {
    name: 'art',
    image: categoriesPath + 'art.jpg',
  },
  {
    name: 'travel',
    image: categoriesPath + 'travel.jpg',
  },
  {
    name: 'quotes',
    image: categoriesPath + 'quotes.jpg',
  },
  {
    name: 'cats',
    image: categoriesPath + 'cats.jpg',
  },
  {
    name: 'dogs',
    image: categoriesPath + 'dogs.jpg',
  },
  {
    name: 'other',
    image:
      'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];

export const feedQuery = () => {
  return `*[_type == "pin"] | order(_createdAt desc) {
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
  } `;
};

export const pinDetailQuery = (pinId: string) => {
  return `*[_type == "pin" && _id == '${pinId}']{
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
    }`;
};

export const pinDetailMorePinQuery = (pin: TPinData) => {
  return `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
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
    }`;
};

export const searchQuery = (searchTerm: string) => {
  return `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
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
            }`;
};

export const userQuery = (userId: string) => {
  return `*[_type == "user" && _id == '${userId}']`;
};

export const userCreatedPinsQuery = (userId: string) => {
  return `*[_type == 'pin' && userId == '${userId}' ] | order(_createdAt desc){
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
    }`;
};

export const userSavedPinsQuery = (userId: string) => {
  return `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
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
    }`;
};
