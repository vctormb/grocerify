import React from 'react';
import { AppContext } from './AppContext';
// utils
import { auth } from '../../utils';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  isBlocking: false,
};

class AppProvider extends React.Component {
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

  setIsBlocking = isBlocking => {
    this.setState({
      isBlocking,
    });
  };

  render() {
    const value = {
      ...this.state,
      login: this.login,
      logout: this.logout,
      setIsBlocking: this.setIsBlocking,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
