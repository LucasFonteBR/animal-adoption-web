const KEY_STORAGE = 'AUTH';

const setUserAuth = (data) => {
  sessionStorage.setItem(KEY_STORAGE, data);
};

const getUserAuth = () => {
  const item = sessionStorage.getItem(KEY_STORAGE);
  if (item && item !== '') {
    return JSON.parse(item);
  }
  return null;
};

const removeUserAuth = () => {
  sessionStorage.removeItem(KEY_STORAGE);
};

export { setUserAuth, getUserAuth, removeUserAuth };
