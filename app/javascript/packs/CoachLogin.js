import React from 'react'
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class CoachLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChangeEmail(text) {
    this.setState(state => ({ ...state, email: text}));
  }

  handleChangePassword(text) {
    this.setState(state => ({ ...state, password: text}));
  }

  handleSubmit() {
    const {email, password} = this.state;
  }

  render () {
    const {email, password} = this.state;

    return (
      <div className="coach-registration registration-form">
        <h1>Welcome Back</h1>
        <div className="text-fields">
          <TextField
            hintText="Email"
            onChange={(e, newVal) => this.handleChangeEmail(newVal)}
            value={email}
          />
          <TextField
            hintText="Password"
            onChange={(e, newVal) => this.handleChangePassword(newVal)}
            value={password}
          />
        </div>
        <div className="btns">
          <RaisedButton
            className="signup-btn"
            label="Login"
            primary={true}
            onClick={() => this.handleSubmit()}
          />
          <Link to="/" className="back-btn">
            <FlatButton
              label="Back Home"
              primary={true}
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default CoachLogin;
