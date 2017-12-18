import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class CoachRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      team: '',
      email: '',
      password: '',
      token: ''
    };
  }

  componentDidMount() {
    this.setState({token: document.getElementsByTagName("meta")[1].content});
    console.log(document.getElementsByTagName("meta")[1].content);
    console.log(this.state)
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
    axios({
      method: 'post',
      url: '/coaches',
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
      },
      data: {
        team: team,
        email: email,
        password: password
      }
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });

  }

  render () {
    const {team, email, password} = this.state;

    return <div className="registration-form">
      <h1>Create an Account</h1>
      <div className="text-fields">
        <TextField
          hintText="Team"
          errorText="This field is required"
          onChange={(e, newVal) => this.handleChangeTeam(newVal)}
          value={team}
        />
        <TextField
          hintText="Email"
          errorText="This field is required"
          onChange={(e, newVal) => this.handleChangeEmail(newVal)}
          value={email}
        />
        <TextField
          hintText="Password"
          errorText="This field is required"
          type="password"
          onChange={(e, newVal) => this.handleChangePassword(newVal)}
          value={password}
        />
      </div>
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
  }
}