import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState(state => ({ ...state, hasError: true }));
  }

  render() {
    if (this.state.hasError) {
      return <div>Sorry, something went wrong.</div>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;