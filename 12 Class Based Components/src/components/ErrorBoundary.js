import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  // The componentDidCatch() method is invoked if some error occurs during the rendering phase of any lifecycle methods or any children components. This method is used to implement the Error Boundaries for the React application
  
  componentDidCatch(error) {
    this.setState({
      hasError: true,
    });
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
