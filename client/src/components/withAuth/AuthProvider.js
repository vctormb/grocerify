import React from 'react';
import { AuthContext } from './AuthContext';
// utils
import { auth } from '../../utils';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
};

class AuthProvider extends React.Component {
  state = INITIAL_STATE;

  componentDidMount() {
    if (auth.getToken()) {
      this.login(auth.getToken());
    }
  }

  login = token => {
    auth.setToken(token);

    const decoded = auth.decodeToken(token);

    this.setState({
      isLoggedIn: true,
      user: decoded,
    });
  };

  logout = () => {
    auth.removeToken();
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
