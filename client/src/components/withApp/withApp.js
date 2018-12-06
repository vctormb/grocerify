import React from 'react';

// components
import { AppContext } from './AppContext';

function withApp(Component) {
  return class extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {value => <Component {...this.props} withApp={value} />}
        </AppContext.Consumer>
      );
    }
  };
}

export default withApp;
