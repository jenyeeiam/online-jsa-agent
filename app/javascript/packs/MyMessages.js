import React from 'react';
import axios from 'axios';

class MyMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      error: ''
    };
  }


  componentDidMount() {
    axios({
      method: 'get',
      url: `/messages?auth_token=${localStorage.getItem('token')}`
    }).then(response => {
      if(response.data.error) {
        this.setState({error: respose.data.error})
      } else {
        this.setState({messages: response.data})
      }
    })
    .catch(error => {
      this.setState({error: 'Messages failed to load 😢'})
    })
  }

  render () {
    const {messages} = this.state;
    return (
      <div className='my-messages'>
        <h1>My Messages</h1>
      </div>
    )
  }
}

export default MyMessages;
