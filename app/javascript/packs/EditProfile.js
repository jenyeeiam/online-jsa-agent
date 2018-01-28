import React from 'react';
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import { Link, Redirect } from "react-router-dom";
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import {replace, keys} from 'lodash';
import { validateEmail, validateYoutube } from "./shared/functions";
import { fetchPlayer } from "./api_requests/get_requests";
import { editProfile } from "./api_requests/post_requests";
import { positions } from "./shared/constants";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      position: [],
      bats: '',
      throws: '',
      email: '',
      password: '',
      almaMater: '',
      accolades: '',
      battingAvg: 0.00,
      era: 0.00,
      token: '',
      error: '',
      success: false,
      video0: '',
      video1: '',
      video2: ''
    }
  }

  componentDidMount() {
    this.setState({token: document.getElementsByTagName("meta")[1].content});
    fetchPlayer(this.props.match.params.player_id)
      .then(response => {
        const player = response.player;
        const videos = response.videos;
        const videoState = {}
        videos.forEach((vid, i) => {
          videoState[`video${i}`] = vid.url
        });
        this.setState(videoState);
        this.setState({
          name: player.name || '',
          position: player.position.split(', ') || '',
          bats: player.bats  || '',
          throws: player.throws  || '',
          email: player.email || '',
          almaMater: player.alma_mater || '',
          accolades: player.accolades || '',
          battingAvg: player.batting_avg || 0,
          era: player.era || 0
        });
      })
      .catch(error => this.setState(error))

  }

  handleChangeVideo(video, text) {
    const newState = {};
    const urlError = validateYoutube(text);
    newState[video] = text;
    newState[`${video}Error`] = urlError ? '' : 'Provide a valid YouTube link';
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
      video0,
      video1,
      video2
    } = this.state;

    if(!!email && !validateEmail(email)) {
      this.setState({error: 'Provide a valid email'})
    } else if(!!password && password.length < 7) {
      this.setState({error: 'Password must be more than 6 characters'})
    } else {
      const videos = [
        validateYoutube(video0),
        validateYoutube(video1),
        validateYoutube(video2)
      ];
      const videosWithLinks = videos.filter(v => !!v);
      const profileData = {
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
      };
      editProfile(profileData)
        .then(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', 'player');
          this.setState({success: true})
        })
        .catch(error => this.setState({error: error}))
    }
  }

  render () {
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
      video0,
      video1,
      video2,
      video0Error,
      video1Error,
      video2Error
    } = this.state;

    return <div className="player-registration registration-form">
      {error && <h3 className="error-msg">{error}</h3>}
      {success && <Redirect to="/my-messages/player"/>}
      {localStorage.getItem('token') && <div>
        <h1>Account Information</h1>
        <div className="player-info">
          <div className="name">
            <TextField
              autoFocus={true}
              hintText="Name"
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
              errorText={"Change password (optional)"}
              type="password"
              onChange={(e, newVal) => this.handleChangePassword(newVal)}
              value={password}
            />
          </div>
        </div>
        <h1>Player Information</h1>
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
            <span className='span-labels'>Batting Average last season {battingAvg}</span>
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
        <div className="video-urls">
          <div className="inline-box-button">
            <TextField
              name='1'
              style={{width: '45%'}}
              value={video0}
              hintText="e.g. https://www.youtube.com/watch..."
              onChange={(e, newVal) => this.handleChangeVideo('video0', newVal)}
              errorText={video0Error}
            />
          </div>
          <div className="inline-box-button">
            <TextField
              name='2'
              value={video1}
              style={{width: '45%'}}
              hintText="e.g. https://www.youtube.com/watch..."
              onChange={(e, newVal) => this.handleChangeVideo('video1', newVal)}
              errorText={video1Error}
            />
          </div>
          <div className="inline-box-button">
            <TextField
              name='3'
              value={video2}
              style={{width: '45%'}}
              hintText="e.g. https://www.youtube.com/watch..."
              onChange={(e, newVal) => this.handleChangeVideo('video2', newVal)}
              errorText={video2Error}
            />
          </div>
        </div>
        <div className='signup-btns'>
          <RaisedButton
            label="Edit Profile"
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
      </div>}
    </div>
  }
}

export default EditProfile;
