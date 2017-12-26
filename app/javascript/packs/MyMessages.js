import React from 'react';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {keys, truncate, uniqBy, findIndex} from "lodash";
import moment from 'moment';

function fetchMessages() {
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

class MyMessages extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetVisibleMessages = this.handleSetVisibleMessages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      messages: [],
      playerMsgsVisible: 0,
      message: '',
      error: ''
    };
  }

  handleFetchMessages() {
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

  componentDidMount() {
    this.handleFetchMessages()
  }

  handleSetVisibleMessages(index) {
    this.setState({playerMsgsVisible: index})
  }

  handleChange(text) {
    this.setState({message: text})
  }

  handleSubmit() {
    const {message, messages, playerMsgsVisible} = this.state;
    const playerIds = uniqBy(messages, (p) => p.player_id).map(msg => msg.player_id);

    if(message.length > 0) {
      axios({
        method: 'post',
        url: '/messages',
        headers: {
          "Content-Type": "application/json",
          'X-Requested-With': 'XMLHttpRequest',
          "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
        },
        data: {
          message_text: message,
          auth_token: localStorage.getItem('token'),
          player_id: playerIds[playerMsgsVisible]
        }
      }).then(response => {
        if(keys(response.data)[0] === 'error') {
          this.setState({error: response.data.error})
        } else {
          this.setState({messageText: '', success: true, error: ''});
          this.setState({message: ''});
          this.handleFetchMessages();
          this.setState({playerMsgsVisible: 0})
        }
      }).catch(error => {
        this.setState({error: 'Message failed to send 😢'})
      })
    }
  }

  render () {
    const {messages, playerMsgsVisible, message} = this.state;
    // array to hold the first message for each unique message stream
    const msgPreviews = [];
      // unique player ids
    const playerIds = uniqBy(messages, (p) => p.player_id).map(msg => msg.player_id);
    // The message stream to show in the main container, it is defaulted to the player id at the 0th index
    const mainContainerMsgs = messages.filter(m => m.player_id === playerIds[playerMsgsVisible]);
    playerIds.forEach(id => {
      let firstMsg = findIndex(messages, (o) => o.player_id === id);
      msgPreviews.push(messages[firstMsg])
    });

    return (
      <div className='my-messages'>
        <GridList cols={3} cellHeight='auto' padding={5}>
          <GridTile cols={1}>
            <div className='msg-previews'>
              {msgPreviews.map((msg, i) => {
                return(
                  <Card
                    key={msg.id}
                    onClick={() => this.handleSetVisibleMessages(i)}
                    className={i === playerMsgsVisible ? 'active' : ''}
                  >
                    <CardHeader
                      title={`Player ${msg.player_id}`}
                      subtitle={truncate(msg.text, {length: 50})}
                      avatar={<Avatar
                        color={'#ffbc49'}
                        backgroundColor={'#542e68'}
                        size={50}
                    >
                        {msg.player_id}
                      </Avatar>}
                    />
                  </Card>
                )
              })}
            </div>
          </GridTile>
          <GridTile cols={2} className='message-container'>
            <h2>Player {playerIds[playerMsgsVisible]}</h2>
            <div className='messages'>
              <div className="text-input">
                <TextField
                  value={message}
                  autoFocus={true}
                  hintText="Type a message..."
                  multiLine={true}
                  fullWidth={true}
                  onKeyPress={(ev) => {if(ev.key === 'Enter') {this.handleSubmit()}}}
                  onChange={(e, newVal) => this.handleChange(newVal)}
                />
                <RaisedButton
                  label="Send"
                  primary={true}
                  style={{float: 'right'}}
                  onClick={this.handleSubmit}
                />
              </div>
              {mainContainerMsgs.map((msg, i) => {
                let sender = msg.sender === 'coach' ? 'Me' : 'Player'
                return (
                  <div key={i}>
                    <h4>{`${sender} at ${moment(msg.created_at).format('ddd MMM Do YYYY, h:mm:ss a')}`}</h4>
                    <p>{msg.text}</p>
                  </div>
                )
              })}

            </div>
          </GridTile>
        </GridList>
      </div>
    )
  }
}

export default MyMessages;
