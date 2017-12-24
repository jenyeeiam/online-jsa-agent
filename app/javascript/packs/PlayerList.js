import React from 'react';
import axios from 'axios';

export default class PlayerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem('token'))
    axios.get('/players', {headers: {'token': localStorage.getItem('token')}})
    .then(response => {
      console.log(response.data)
      this.setState({players: response.data})
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const {players} = this.state;
    return <div>
      {false && <p>{players[0].name}</p>}
    </div>
  }
}
