import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = () => cookies.get('token');

export const setToken = token => {
  cookies.set('token', token, { path: '/' });
};
