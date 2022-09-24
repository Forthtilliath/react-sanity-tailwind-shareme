const UserImage = ({ src, ...otherProps }) => {
  if (!src) {
    return <p>Error src</p>;
  }

  return (
    <img
      src={src}
      alt="user-profile"
      referrerPolicy="no-referrer"
      {...otherProps}
    />
  );
};

export default UserImage;
