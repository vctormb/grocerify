import React from 'react';

// components
import { AuthContext } from './AuthContext';

function withAuth(Component) {
  return class extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {value => <Component {...this.props} withAuth={value} />}
        </AuthContext.Consumer>
      );
    }
  };
}

export default withAuth;
