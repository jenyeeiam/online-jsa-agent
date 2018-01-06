import React from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import {keys} from 'lodash';

const positionsLookup = {
  'P': '投手',
  'C': 'キャッチャー',
  '1B': '一塁',
  '2B': '二塁',
  '3B': '三塁',
  'SS': 'ショート',
  'LF': 'レフト',
  'RF': 'ライト',
  'CF': 'センター'
};

const rightLeft = {
  'L': '左',
  'R': '右'
};

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
      {players.map((player, index) => {
        let subtitle = `スタイル: ${player.bats} ${'\u00B7'} ${player.throws} ${'\u00A0'}|${'\u00A0'} `;
        subtitle += `打率: ${player.batting_avg}`
        if(/P/.test(player.position)) {
          subtitle += ` | 防御率: ${player.era}`
        }
        //if player has more than one position
        let position = player.position;
        let translatedPosition;
        if(/,/.test(position)) {
          let positionArray = position.split(', ');
          translatedPosition = positionArray.map(p => positionsLookup[p]).join(', ');
        } else {
          translatedPosition = positionsLookup[position]
        }

        return (
          <Card key={player.id}>
            <CardHeader
              title={`ポジション: ${translatedPosition || 'no position'}`}
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
              <FlatButton label='ビデオ' secondary={true} onClick={() => {
                this.handleFetchVideos(player.id);
                this.handleOpen();
              }}/>
            </CardActions>
          </Card>)
      })}
    </div>
  }
}
