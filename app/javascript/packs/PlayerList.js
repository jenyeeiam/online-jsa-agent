import React from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import {keys} from 'lodash';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      error: ''
    };
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
      this.setState({error: "Couldn't retreive data"})
    })
  }

  render() {
    const {players, error} = this.state;
    return <div className="players-list">
      {error && <p>{error}</p>}
      {players.map((player, index) => {
        let subtitle = `Bats/Throws: ${player.bats}/${player.throws} | `;
        if(player.position === 'P') {
          subtitle += `ERA: ${player.era}`
        } else {
          subtitle += `AVG: ${player.batting_avg}`
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
                {player.position || 'N/A'}
              </Avatar>}
            />
            <CardTitle title={`Player ${player.id}`} subtitle={`College: ${player.alma_mater}`} />
            <CardText>
              {player.accolades}
            </CardText>
            <CardActions>
              <Link to={`/message/${player.id}`}>
                <FlatButton label={`Message Player ${player.id}`} secondary={true}/>
              </Link>
            </CardActions>
          </Card>)
      })}
    </div>
  }
}