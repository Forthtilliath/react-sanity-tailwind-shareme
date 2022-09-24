export const categories = [
  {
    name: 'cars',
    image: process.env.PUBLIC_URL + '/assets/categories/cars.jpg',
  },
  {
    name: 'fitness',
    image: process.env.PUBLIC_URL + '/assets/categories/fitness.jpg',
  },
  {
    name: 'wallpaper',
    image: process.env.PUBLIC_URL + '/assets/categories/wallpaper.jpg',
  },
  {
    name: 'websites',
    image: process.env.PUBLIC_URL + '/assets/categories/websites.jpg',
  },
  {
    name: 'photo',
    image: process.env.PUBLIC_URL + '/assets/categories/photo.jpg',
  },
  {
    name: 'food',
    image: process.env.PUBLIC_URL + '/assets/categories/food.jpg',
  },
  {
    name: 'nature',
    image: process.env.PUBLIC_URL + '/assets/categories/nature.jpg',
  },
  {
    name: 'art',
    image: process.env.PUBLIC_URL + '/assets/categories/art.jpg',
  },
  {
    name: 'travel',
    image: process.env.PUBLIC_URL + '/assets/categories/travel.jpg',
  },
  {
    name: 'quotes',
    image: process.env.PUBLIC_URL + '/assets/categories/quotes.jpg',
  },
  {
    name: 'cats',
    image: process.env.PUBLIC_URL + '/assets/categories/cats.jpg',
  },
  {
    name: 'dogs',
    image: process.env.PUBLIC_URL + '/assets/categories/dogs.jpg',
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

export const pinDetailQuery = (pinId) => {
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

export const pinDetailMorePinQuery = (pin) => {
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

export const searchQuery = (searchTerm) => {
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

export const userQuery = (userId) => {
  return `*[_type == "user" && _id == '${userId}']`;
};

export const userCreatedPinsQuery = (userId) => {
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

export const userSavedPinsQuery = (userId) => {
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
