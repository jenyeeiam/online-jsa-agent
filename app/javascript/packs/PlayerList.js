import React from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { fetchVideos, fetchPlayers } from "./api_requests/get_requests";
import { positions, rightLeft } from "./shared/constants";
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
    fetchVideos(playerId)
      .then(res => {
        this.setState({videos: res})
      })
      .catch(error => this.setsState({error: error}))
  }

  componentDidMount() {
    fetchPlayers()
      .then(res => {
        this.setState({players: res})
      })
      .catch(error => {
        this.setState({error: error})
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
      {error && <h2 className="error-msg">{error}</h2>}
      <Dialog
          title="ビデオ"
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
          {videos.length === 0 && <h3>ビデオはありません</h3>}
      </Dialog>
      {localStorage.getItem('token') && <div>
        {players.map((player, index) => {
          let subtitle = `スタイル: ${rightLeft[player.bats] || ''}打ち ${'\u00B7'} ${rightLeft[player.throws] || ''}投げ ${'\u00A0'}|${'\u00A0'} `;
          subtitle += `打率: ${player.batting_avg}`
          if(/P/.test(player.position)) {
            subtitle += ` | 防御率: ${player.era}`
          }
          //if player has more than one position
          let position = player.position;
          let translatedPosition;
          if(/,/.test(position)) {
            let positionArray = position.split(', ');
            translatedPosition = positionArray.map(p => positions[p]).join(', ');
          } else {
            translatedPosition = positions[position]
          }

          return (
            <Card key={player.id}>
              <CardHeader
                title={`ポジション: ${translatedPosition || ''}`}
                subtitle={subtitle}
              />
            <CardTitle title={player.name} subtitle={`出身校: ${player.alma_mater}`} />
              <CardText>
                <p>{player.accolades}</p>
                <p>{player.japanese_accolades}</p>
              </CardText>
              <CardActions>
                <Link to={`/message/${player.id}`}>
                  <FlatButton label={`${player.name}にメッセージを送る`} secondary={true}/>
                </Link>
                <FlatButton label='ビデオを見る' secondary={true} onClick={() => {
                  this.handleFetchVideos(player.id);
                  this.handleOpen();
                }}/>
              </CardActions>
            </Card>)
          })}
      </div>}
    </div>
  }
}
