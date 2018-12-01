import React from 'react';
import { AuthContext } from './AuthContext';
// utils
import { getToken, setToken, removeToken, decodeToken } from '../../utils';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
};

class AuthProvider extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    if (getToken()) {
      this.login(getToken());
    }
  }

  login = token => {
    setToken(token);

    const decoded = decodeToken(token);

    this.setState({
      isLoggedIn: true,
      user: decoded,
    });
  };

  logout = () => {
    removeToken();
    this.setState(INITIAL_STATE);
  };

  render() {
    const value = {
      ...this.state,
      login: this.login,
      logout: this.logout,
    };

    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
