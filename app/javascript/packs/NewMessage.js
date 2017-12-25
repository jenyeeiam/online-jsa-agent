import React from 'react'
import axios from 'axios';

class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      messageTitle: ''
    }
  }

  handleSubmit() {
    const {messageText, messageTitle} = this.state;
    if(messageText.length > 0) {
      axios({
        method: 'post',
        url: '/messages',
        headers:
          "Content-Type": "application/json",
          'X-Requested-With': 'XMLHttpRequest',
          "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
        },
        data: {
          messageText,
          messageTitle,
          player_id: this.props.match.params
        }
      }).then(response => {
        if(keys(response.data)[0] === 'error') {
          this.setState({error: response.data.error})
        } else {

        }
      }).catch(error => {
        this.setState({error: 'Message ailed to send 😢'})
      })
    }
  }

  render () {
    const {messageText, messageTitle} = this.state;
    return (
      <div className='new-message'>make a message</div>
    )
  }
}

export default NewMessage;
