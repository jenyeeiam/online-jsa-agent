import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

export default class PlayerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      position: '',
      bats: '',
      throws: '',
      email: '',
      almaMater: '',
      accolades: '',
      battingAvg: '',
      era: '',
      password: '',
      token: '',
      success: false
    };
  }

  componentDidMount() {
    this.setState({token: document.getElementsByTagName("meta")[1].content});
  }

  handleChangeName(name) {
    this.setState(state => ({ ...state, name}));
  }

  handleChangePosition(position) {
    this.setState(state => ({ ...state, position}));
  }

  handleChangeBats(bats) {
    this.setState(state => ({ ...state, bats}));
  }

  handleChangeThrows(throws) {
    this.setState(state => ({ ...state, throws}));
  }

  handleChangeEmail(email) {
    this.setState(state => ({ ...state, email}));
  }

  handleChangeAlmaMater(almaMater) {
    this.setState(state => ({ ...state, almaMater}));
  }

  handleChangeAccolades(accolades) {
    this.setState(state => ({ ...state, accolades}));
  }

  handleChangeBattingAvg(battingAvg) {
    this.setState(state => ({ ...state, battingAvg}));
  }

  handleChangeEra(era) {
    this.setState(state => ({ ...state, era}));
  }

  handleChangePassword(text) {
    this.setState(state => ({ ...state, password: text}));
  }

  handleSubmit() {
    const {name,
      position,
      bats,
      throws,
      email,
      almaMater,
      accolades,
      battingAvg,
      era,
      password
    } = this.state;
    axios({
      method: 'post',
      url: '/players',
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
      },
      data: {
        name,
        position,
        bats,
        throws,
        email,
        almaMater,
        accolades,
        battingAvg,
        era,
        password
      }
    }).then((response) => {
      this.setState({success: true})
    })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    const {name,
      position,
      bats,
      throws,
      email,
      almaMater,
      accolades,
      battingAvg,
      era,
      password
    } = this.state;
    return <div className="player-registration registration-form">
      <h1>Create an Account</h1>
      <div className="text-fields">
        <TextField
          hintText="Name"
          errorText={name.length > 0 ? '' : "This field is required"}
          onChange={(e, newVal) => this.handleChangeName(newVal)}
          value={name}
        />
        <TextField
          hintText="Email"
          errorText={email.length > 0 ? '' : "This field is required"}
          onChange={(e, newVal) => this.handleChangeEmail(newVal)}
          value={email}
        />
        <TextField
          hintText="Password"
          errorText={password.length > 0 ? '' : "This field is required"}
          type="password"
          onChange={(e, newVal) => this.handleChangePassword(newVal)}
          value={password}
        />
      </div>
      <h1>Player Information</h1>
      <p>These fields are not required, but it is encouraged to be as detailed as possible. Japanese coaches are not aware of players names and will contact you based on the merit you outline here.</p>
      <TextField
        hintText="Accolades"
        multiLine={true}
        rows={2}
      />
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