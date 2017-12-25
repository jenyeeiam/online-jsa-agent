import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {keys} from 'lodash';

export default class PlayerRegister extends React.Component {
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
    const authToken = localStorage.getItem('token');
    return <div>
      {false && <Redirect to="/"/>}
      {error && <p>{error}</p>}
      {false && <p>{players[0].name}</p>}
    </div>
  }
}
