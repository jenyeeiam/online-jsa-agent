import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default class PlayerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    axios.get('/players', {headers: {'token': localStorage.getItem('token')}})
    .then(response => {
      this.setState({players: response.data})
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const {players} = this.state;
    const authToken = localStorage.getItem('token');
    return <div>
      {!authToken && <Redirect to="/"/>}
      {false && <p>{players[0].name}</p>}
    </div>
  }
}
