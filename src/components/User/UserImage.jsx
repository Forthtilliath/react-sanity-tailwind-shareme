import React from 'react';

const UserImage = ({ user, ...otherProps }) => {
  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <img
      src={user.image}
      alt="user-profile"
      referrerPolicy="no-referrer"
      {...otherProps}
    />
  );
};

export default UserImage;
