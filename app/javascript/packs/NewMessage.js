import React from 'react'
import TextField from 'material-ui/TextField';
import { Link, Redirect } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from 'material-ui/FlatButton';
import {keys} from 'lodash';
import axios from 'axios';
import { sendMessage } from "./api_requests/post_requests";

class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      messageText: '',
      success: false,
      error: ''
    }
  }

  handleChange(text) {
    this.setState({messageText: text})
  }

  handleSubmit() {
    const {messageText, messageTitle} = this.state;
    if(messageText.length > 0) {
      const messagePayload = {
        message_text: messageText,
        auth_token: localStorage.getItem('token'),
        player_id: Number(this.props.match.params.player_id)
      };
      sendMessage(messagePayload)
        .then(response => {
          if(keys(response)[0] === 'error') {
            this.setState({error: response.error})
          } else {
            this.setState({messageText: '', success: true, error: ''})
          }
        })
        .catch(error => this.setState({error: error}))
      
    }
  }

  render () {
    const {messageText, success, error} = this.state;
    return (
      <div className='new-message'>
        {error && <p>{error}</p>}
        {success && <Redirect to="/my-messages/coach"/>}
        <h1>New Message</h1>
          <TextField
            hintText="Write here"
            multiLine={true}
            fullWidth={true}
            onChange={(e, newVal) => this.handleChange(newVal)}
            onKeyPress={(ev) => {if(ev.key === 'Enter') {this.handleSubmit()}}}
          />
        <RaisedButton
          label='Send'
          primary={true}
          onClick={this.handleSubmit}
        />
        <Link to='/players-list'>
          <FlatButton
            label='Back'
            secondary={true}
          />
        </Link>
      </div>
    )
  }
}

export default NewMessage;
