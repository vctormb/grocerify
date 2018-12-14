import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = throttle(this.onScroll, 600);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      // prettier-ignore
      (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 &&
      !this.props.isLoading
    ) {
      this.props.onFetchData();
    }
  };

  render() {
    return this.props.children;
  }
}

InfiniteScroll.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onFetchData: PropTypes.func.isRequired,
};

export default InfiniteScroll;
