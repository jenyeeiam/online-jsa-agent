import React from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import {keys} from 'lodash';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      players: [],
      error: '',
      videosOpen: false,
      videos: []
    };
  }

  handleOpen() {
    this.setState({videosOpen: true});
  };

  handleClose() {
    this.setState({videosOpen: false});
  };

  handleFetchVideos(playerId) {
    axios.get(`/videos?player_id=${playerId}`, {headers: {'token': localStorage.getItem('token')}})
    .then(response => {
      if(keys(response.data)[0] === 'error') {
        this.setState({error: response.data.error})
      } else {
        this.setState({videos: response.data})
      }
    }).catch(error => {
      this.setState({error: "Couldn't retreive videos"})
    })
  }

  componentDidMount() {
    axios.get('/players', {headers: {'token': localStorage.getItem('token')}})
    .then(response => {
      if(keys(response.data)[0] === 'error') {
        this.setState({error: response.data.error})
      } else {
        this.setState({players: response.data})
      }
    }).catch(error => {
      this.setState({error: "Couldn't retreive players"})
    })
  }

  render() {
    const {players, error, videosOpen, videos} = this.state;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return <div className="players-list">
      {error && <p>{error}</p>}
      <Dialog
          title="Videos"
          actions={actions}
          modal={false}
          open={videosOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {videos.length > 0 && videos.map((video, i) => {
            return <iframe
              key={i}
              className="embedded-video"
              src={video.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
            ></iframe>
          })}
          {videos.length === 0 && <h3>No Videos</h3>}
      </Dialog>
      {players.map((player, index) => {
        let subtitle = `Bats/Throws: ${player.bats}/${player.throws} | `;
        subtitle += `AVG: ${player.batting_avg}`
        if(/P/.test(player.position)) {
          subtitle += ` | ERA: ${player.era}`
        }
        //if player has more than one position
        let position = player.position;
        if(/,/.test(position)) {
          let positionArray = position.split(',');
          position = positionArray[0]
        }

        return (
          <Card key={player.id}>
            <CardHeader
              title={`Position: ${player.position}`}
              subtitle={subtitle}
              avatar={<Avatar
                color={'#ffbc49'}
                backgroundColor={'#542e68'}
                size={50}
            >
                {position || 'N/A'}
              </Avatar>}
            />
          <CardTitle title={player.name} subtitle={`College: ${player.alma_mater}`} />
            <CardText>
              <p>{player.accolades}</p>
              <p>{player.japanese_accolades}</p>
            </CardText>
            <CardActions>
              <Link to={`/message/${player.id}`}>
                <FlatButton label={`Message Player ${player.id}`} secondary={true}/>
              </Link>
              <FlatButton label='Videos' secondary={true} onClick={() => {
                this.handleFetchVideos(player.id);
                this.handleOpen();
              }}/>
            </CardActions>
          </Card>)
      })}
    </div>
  }
}
