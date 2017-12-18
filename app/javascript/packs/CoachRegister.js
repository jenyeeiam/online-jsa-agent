import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import { Link } from "react-router-dom";

export default class CoachRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: '',
      email: ''
    };
  }

  render () {
    return <div className="registration-form">
      <h1>Create an Account</h1>
      <div className="text-fields">
        <TextField
          hintText="Team"
          errorText="This field is required"
        />
        <TextField
          hintText="Email"
          errorText="This field is required"
        />
        <TextField
          hintText="Password"
          errorText="This field is required"
          type="password"
        />
      </div>
      <RaisedButton
        className="signup-btn"
        label="Sign Up"
        primary={true}
      />
      <Link to="/" className="back-btn">
        <FlatButton
          label="Back Home"
          primary={true}
        />
      </Link>
    </div>
  }
}