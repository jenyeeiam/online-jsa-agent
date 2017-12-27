import React from 'react'
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import { Link, Redirect } from "react-router-dom";
import {keys} from "lodash";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      signedIn: false
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
    if(email.length > 0 && password.length > 0) {
      axios({
        method: 'post',
        url: '/login',
        headers: {
          "Content-Type": "application/json",
          'X-Requested-With': 'XMLHttpRequest',
          "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
        },
        data: {
          email,
          password
        }
      }).then((response) => {
        if(keys(response.data)[0] === 'error') {
          this.setState({error: response.data.error})
        } else {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user);
          this.setState({signedIn: true})
        }
      })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({error: 'Please fill in all required fields'})
    }
  }

  render () {
    const {email, password, error, signedIn} = this.state;

    return (
      <div className="coach-registration registration-form">
        {error.length > 0 && <h3>{error}</h3>}
        {signedIn && <Redirect to={`/my-messages/${localStorage.getItem('user')}`} />}
        <h1>Welcome Back</h1>
        <div className="text-fields">
          <TextField
            autoFocus={true}
            hintText="Email"
            onChange={(e, newVal) => this.handleChangeEmail(newVal)}
            value={email}
          />
          <TextField
            hintText="Password"
            onChange={(e, newVal) => this.handleChangePassword(newVal)}
            value={password}
            type="password"
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

export default Login;