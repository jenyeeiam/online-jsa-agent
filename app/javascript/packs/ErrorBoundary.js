import React from "react";
import fail from "../../assets/images/sad_puppy.jpg";
import RaisedButton from 'material-ui/RaisedButton';

export class ErrorBoundary extends React.Component {

  componentDidCatch(error, info) {
    // Display fallback UI
    this.props.errorActions.throwError()
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.props.errors.hasError) {
      // You can render any custom fallback UI
      // return <h1>Something went wrong.</h1>;
      return <div className="error-page">
        <img src={fail} alt="Something went wrong"/>
        <div className="home-button">
          <RaisedButton
            primary={true}
            label="Back Home"
            onClick={() => location.reload()}
          />
        </div>
      </div>;
    } else {
      return this.props.children;
    }
  }
}
