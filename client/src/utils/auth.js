import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

export const getToken = () => cookies.get('token');

export const setToken = token => {
  cookies.set('token', token, { path: '/' });
};

export const removeToken = () => {
  cookies.remove('token');
};

export const decodeToken = token => {
  return jwt_decode(token);
};
