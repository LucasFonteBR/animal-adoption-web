import { getUserAuth } from '../storage/AuthenticatorStorage';
import jwtDecode from 'jwt-decode';

const getToken = () => {
  const userAuth = getUserAuth();
  if (!userAuth) {
    return null;
  }
  const { accessToken } = userAuth;
  if (!accessToken) {
    return null;
  }
  return accessToken;
};

const getJwtDecode = (accessToken) => {
  if (accessToken) {
    return jwtDecode(accessToken);
  }
  return null;
};

const getPayload = async () => {
  const accessToken = await getToken();

  const user = getJwtDecode(accessToken);

  if (!user) {
    return null;
  }

  return user.payload || null;
};

export { getToken, getJwtDecode, getPayload };
