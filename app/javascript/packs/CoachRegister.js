import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function validateParams(team, password) {
  return team.length > 0 && password.length > 5
}

export default class CoachRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      team: '',
      email: '',
      password: '',
      token: '',
      signedIn: false,
      error: ''
    };
  }

  componentDidMount() {
    this.setState({token: document.getElementsByTagName("meta")[1].content});
  }

  handleChangeTeam(text) {
    this.setState(state => ({ ...state, team: text}));
  }

  handleChangeEmail(text) {
    this.setState(state => ({ ...state, email: text}));
  }

  handleChangePassword(text) {
    this.setState(state => ({ ...state, password: text}));
  }

  handleSubmit() {
    const {team, email, password} = this.state;
    if(!validateEmail(email)) {
      this.setState({error: 'Provide a valid email'})
    } else if (!validateParams(team, password)) {
      this.setState({error: 'Fill in all required fields'})
    } else {
      axios({
        method: 'post',
        url: '/coaches',
        headers: {
          "Content-Type": "application/json",
          'X-Requested-With': 'XMLHttpRequest',
          "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
        },
        data: {
          team,
          email: email.toLowerCase(),
          password
        }
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', 'coach');
        this.setState({signedIn: true})
      }).catch((error) => {
        this.setState({error: 'Accont unable to be saved 😢'})
      });
    }
  }

  render () {
    const {team, email, password, signedIn, error} = this.state;
    return <div className="coach-registration registration-form">
      {signedIn && <Redirect to="/players-list"/>}
      {error.length > 0 && <h3>{error}</h3>}
      <h1>Create an Account</h1>
      <div className="text-fields">
        <TextField
          autoFocus={true}
          hintText="Team"
          errorText={team.length > 0 ? '' : "This field is required"}
          onChange={(e, newVal) => this.handleChangeTeam(newVal)}
          value={team}
        />
        <TextField
          hintText="Email"
          errorText={validateEmail(email) ? '' : "Provide a valid email"}
          onChange={(e, newVal) => this.handleChangeEmail(newVal)}
          value={email}
        />
        <TextField
          hintText="Password"
          errorText={password.length > 5 ? '' : "Must be 6 or more characters"}
          type="password"
          onChange={(e, newVal) => this.handleChangePassword(newVal)}
          value={password}
        />
      </div>
      <div className="btns">
        <RaisedButton
          className="signup-btn"
          label="Sign Up"
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
  }
}
