import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
    console.log(players)
    return <div className="players-list">
      {error && <p>{error}</p>}
      {players.map((player, index) => {
        return (
          <Card key={player.id}>
            <CardHeader
              avatar={<Avatar
                color={'#ffbc49'}
                backgroundColor={'#542e68'}
                size={50}
            >
                {player.position || 'N/A'}
              </Avatar>}
            />
          <CardTitle title={`Player ${player.id}`} subtitle={`Bats: ${player.bats || 'N/A'} | Throws: ${player.throws || 'N/A'} | AVG: ${player.batting_avg || 'N/A'} | ERA: ${player.era || 'N/A'}`} />
            <CardText>
              {player.accolades}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <FlatButton label={`Message Player ${player.id}`} secondary={true}/>
            </CardActions>
          </Card>)
      })}
    </div>
  }
}
