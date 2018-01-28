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
import {replace} from 'lodash';
import { validateEmail, validateParams, validateYoutube } from "./shared/functions";
import { positions } from "./shared/constants";
import {keys} from "lodash";

export default class PlayerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeVideo = this.handleChangeVideo.bind(this);
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
      error: '',
      success: false,
      firstVideo: '',
      secondVideo: '',
      thirdVideo: ''
    };
  }

  componentDidMount() {
    this.setState({token: document.getElementsByTagName("meta")[1].content});
  }

  handleChangeVideo(video, text) {
    const newState = {};
    const url = validateYoutube(text);
    newState[video] = url ? url : '';
    newState[`${video}Error`] = url ? '' : 'Provide a valid YouTube link';
    this.setState(newState);
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
      password,
      firstVideo,
      secondVideo,
      thirdVideo
    } = this.state;

    if(!validateEmail(email)) {
      this.setState({error: 'Provide a valid email'})
    } else if(!validateParams(name, password)) {
      this.setState({error: 'Fill in all required fields'})
    } else {
      const videos = [firstVideo, secondVideo, thirdVideo];
      const videosWithLinks = videos.filter(v => v.length > 0);
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
          position: position.join(', '),
          bats,
          throws,
          email: email.toLowerCase(),
          alma_mater: almaMater,
          accolades,
          batting_avg: battingAvg,
          era,
          password,
          videos: videosWithLinks
        }
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', 'player');
        localStorage.setItem('id', response.data.id);
        this.setState({success: true});
      }).catch((error) => {
        this.setState({error: 'Profile unable to be saved 😢'})
      });
    }
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
      error,
      success,
      firstVideo,
      secondVideo,
      thirdVideo,
      firstVideoError,
      secondVideoError,
      thirdVideoError
    } = this.state;

    return <div className="player-registration registration-form">
      {error.length > 0 && <h3>{error}</h3>}
      {success && <Redirect to="/my-messages/player"/>}
      <h1>Create an Account</h1>
      <div className="player-info">
        <div className="name">
          <TextField
            autoFocus={true}
            hintText="Name"
            errorText={name.length > 0 ? '' : "This field is required"}
            onChange={(e, newVal) => this.handleChangeName(newVal)}
            value={name}
          />
        </div>
        <div className="email">
          <TextField
            hintText="Email"
            errorText={validateEmail(email) ? '' : "Provide a valid email"}
            onChange={(e, newVal) => this.handleChangeEmail(newVal)}
            value={email}
          />
        </div>
        <div className="password">
          <TextField
            hintText="Password"
            errorText={password.length > 5 ? '' : "Must be 6 or more characters"}
            type="password"
            onChange={(e, newVal) => this.handleChangePassword(newVal)}
            value={password}
          />
        </div>
      </div>
      <h1>Player Information</h1>
      <p>{"These fields are not required, but it is encouraged to be as detailed as possible. Japanese coaches are not aware of players' names and will contact you based on the merit you outline here. If a coach is interested in you they will send you a message"}</p>
      <div className='player-merits'>
        <div className='bats'>
          <SelectField
            value={bats}
            floatingLabelText="Bats"
            onChange={this.handleChangeBats}
            style={{width: '50%', marginRight: '10px'}}
          >
            <MenuItem value={'R'} primaryText="Right" />
            <MenuItem value={'L'} primaryText="Left" />
          </SelectField>
        </div>
        <div className='throws'>
          <SelectField
            value={throws}
            floatingLabelText="Throws"
            onChange={this.handleChangeThrows}
            style={{width: '50%', marginRight: '10px'}}
          >
            <MenuItem value={'R'} primaryText="Right" />
            <MenuItem value={'L'} primaryText="Left" />
          </SelectField>
        </div>
        <div className='position'>
          <SelectField
            value={position}
            floatingLabelText="Position(s)"
            onChange={this.handleChangePosition}
            style={{width: '50%'}}
            multiple={true}
          >
            {keys(positions).map((pos, i) => <MenuItem key={i} value={pos} primaryText={pos} />)}
          </SelectField>
        </div>
        <div className="avg">
          <span className='span-labels'>Batting Average last season {battingAvg.toFixed(3)}</span>
          <Slider
            defaultValue={battingAvg}
            value={battingAvg}
            step={0.001}
            style={{width: '80%'}}
            max={0.7}
            onChange={(e, newVal) => this.handleChangeBattingAvg(newVal)}
          />
        </div>
        <div className="era">
          <span className='span-labels'>ERA last season {era}</span>
          <Slider
            defaultValue={0}
            max={5}
            value={era}
            style={{width: '80%'}}
            onChange={(e, newVal) => this.handleChangeEra(newVal)}
          />
        </div>
        <div className="college">
          <TextField
            value={almaMater}
            hintText="College"
            onChange={(e, newVal) => this.handleChangeAlmaMater(newVal)}
          />
        </div>
        <div className="accolades">
          <TextField
            value={accolades}
            hintText="Accolades"
            multiLine={true}
            fullWidth={true}
            onChange={(e, newVal) => this.handleChangeAccolades(newVal)}
          />
        </div>
      </div>
      <h1>Videos</h1>
      <p>{"Video is the best way for Japanese coaches to evaluate a player. In most cases coaches are not aware of who's who in NCAA or NPF softball. Please provide a maxiumum of 3 links to YouTube videos of games or practice in the boxes below. If you don't have videos now don't worry, you can provide links to videos later by editing your profile."}</p>
      <div className="video-urls">
        <div className="inline-box-button">
          <TextField
            name='1'
            style={{width: '45%'}}
            hintText="e.g. https://www.youtube.com/watch..."
            onChange={(e, newVal) => this.handleChangeVideo('firstVideo', newVal)}
            errorText={firstVideoError}
          />
        </div>
        <div className="inline-box-button">
          <TextField
            name='2'
            style={{width: '45%'}}
            hintText="e.g. https://www.youtube.com/watch..."
            onChange={(e, newVal) => this.handleChangeVideo('secondVideo', newVal)}
            errorText={secondVideoError}
          />
        </div>
        <div className="inline-box-button">
          <TextField
            name='3'
            style={{width: '45%'}}
            hintText="e.g. https://www.youtube.com/watch..."
            onChange={(e, newVal) => this.handleChangeVideo('thirdVideo', newVal)}
            errorText={thirdVideoError}
          />
        </div>
      </div>
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
