import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const cookies = new Cookies();

const getToken = () => cookies.get('token');

const setToken = token => {
  cookies.set('token', token, { path: '/' });
};

const removeToken = () => cookies.remove('token');

const decodeToken = token => jwt_decode(token);

export default {
  getToken,
  setToken,
  removeToken,
  decodeToken,
};
