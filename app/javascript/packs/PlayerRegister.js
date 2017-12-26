import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import { Link, Redirect } from "react-router-dom";
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

const positions = [
  'LF',
  'CF',
  'RF',
  '3B',
  'SS',
  '2B',
  '1B',
  'P',
  'C'
];

export default class PlayerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangBats = this.handleChangeBats.bind(this);
    this.state = {
      name: '',
      position: [],
      bats: '',
      throws: '',
      email: '',
      almaMater: '',
      accolades: '',
      battingAvg: 0.00,
      era: 0.00,
      password: '',
      token: '',
      error: ''
    };
  }

  componentDidMount() {
    this.setState({token: document.getElementsByTagName("meta")[1].content});
  }

  handleChangeName(name) {
    this.setState(state => ({ ...state, name}));
  }

  handleChangePosition = (event, index, value) => {
    this.setState({position: value});
  }

  handleChangeBats = (event, index, value) => {
    this.setState({bats: value});
  }

  handleChangeThrows = (event, index, value) => {
    this.setState({throws: value});
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

  handleValidateParams(team, email, password) {
    return team.length > 0 && email.length > 0 && password.length > 5
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
        alma_mater: almaMater,
        accolades,
        batting_avg: battingAvg,
        era,
        password
      }
    }).then((response) => {
      localStorage.setItem('token', response.data.token)
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
      password,
      error
    } = this.state;

    return <div className="player-registration registration-form">
      {error.length > 0 && <h3>{error}</h3>}
      <h1>Create an Account</h1>
      <GridList
        cellHeight='auto'
        cols={2}
        padding={6}
      >
        <GridTile>
          <TextField
            autoFocus={true}
            hintText="Name"
            errorText={name.length > 0 ? '' : "This field is required"}
            onChange={(e, newVal) => this.handleChangeName(newVal)}
            value={name}
          />
        </GridTile>
        <GridTile>
          <TextField
            hintText="Email"
            errorText={email.length > 0 ? '' : "This field is required"}
            onChange={(e, newVal) => this.handleChangeEmail(newVal)}
            value={email}
          />
        </GridTile>
        <GridTile>
          <TextField
            hintText="Password"
            errorText={password.length > 5 ? '' : "Must be 6 or more characters"}
            type="password"
            onChange={(e, newVal) => this.handleChangePassword(newVal)}
            value={password}
          />
        </GridTile>
      </GridList>
      <h1>Player Information</h1>
      <p>{"These fields are not required, but it is encouraged to be as detailed as possible. Japanese coaches are not aware of players' names and will contact you based on the merit you outline here. If a coach is interested in you they will send you a message"}</p>
      <GridList
        cellHeight='auto'
        cols={2}
        padding={6}
      >
        <GridTile cols={2}>
          <div className='bats-throws-picker'>
            <SelectField
              value={bats}
              floatingLabelText="Bats"
              onChange={this.handleChangeBats}
              style={{width: '30%', marginRight: '10px'}}
            >
              <MenuItem value={'R'} primaryText="Right" />
              <MenuItem value={'L'} primaryText="Left" />
            </SelectField>
            <SelectField
              value={throws}
              floatingLabelText="Throws"
              onChange={this.handleChangeThrows}
              style={{width: '30%', marginRight: '10px'}}
            >
              <MenuItem value={'R'} primaryText="Right" />
              <MenuItem value={'L'} primaryText="Left" />
            </SelectField>
            <SelectField
              value={position}
              floatingLabelText="Position(s)"
              onChange={this.handleChangePosition}
              style={{width: '30%'}}
              multiple={true}
            >
              {positions.map((pos, i) => <MenuItem key={i} value={pos} primaryText={pos} />)}
            </SelectField>
          </div>
        </GridTile>
        <GridTile>
          <span className='span-labels'>Batting Average last season {battingAvg.toFixed(3)}</span>
          <Slider
            defaultValue={battingAvg}
            value={battingAvg}
            step={0.001}
            style={{width: '80%'}}
            onChange={(e, newVal) => this.handleChangeBattingAvg(newVal)}
          />
        </GridTile>
        <GridTile>
          <span className='span-labels'>ERA last season {era}</span>
          <Slider
            defaultValue={0}
            max={5}
            value={era}
            style={{width: '80%'}}
            onChange={(e, newVal) => this.handleChangeEra(newVal)}
          />
        </GridTile>
        <GridTile>
          <TextField
            hintText="College"
            onChange={(e, newVal) => this.handleChangeAlmaMater(newVal)}
          />
        </GridTile>
        <GridTile cols={2}>
          <TextField
            hintText="Accolades"
            multiLine={true}
            rows={2}
            fullWidth={true}
            onChange={(e, newVal) => this.handleChangeAccolades(newVal)}
          />
        </GridTile>
      </GridList>
      <div className='signup-btns'>
        <RaisedButton
          label="Sign Up"
          primary={true}
          onClick={() => this.handleSubmit()}
        />
        <Link to="/">
          <FlatButton
            label="Back Home"
            primary={true}
          />
        </Link>
      </div>
    </div>
  }
}
