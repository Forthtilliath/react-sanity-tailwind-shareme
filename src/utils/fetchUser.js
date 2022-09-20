export const fetchUser = () => {
  const userInfo =
    JSON.parse(localStorage.getItem('user')) ?? localStorage.clear();

  return userInfo;
};
