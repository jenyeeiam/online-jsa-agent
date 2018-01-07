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
      this.setState({error: response.data.error})
    } else {
      this.setState({messages: response.data})
    }
  })
  .catch(error => {
    this.setState({error: 'Messages failed to load 😢'})
  })
}

class MessagesPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetVisibleMessages = this.handleSetVisibleMessages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleMsgContainers = this.handleToggleMsgContainers.bind(this);

    this.state = {
      messages: [],
      coachMsgsVisible: 0,
      message: '',
      error: '',
      windowWidth: ''
    };
  }

  componentDidMount() {
    this.handleFetchMessages();
    this.setState({windowWidth: screen.width});
    if(screen.width < 700) {
      this.setState({msgContainerDisplay: false});
      this.setState({msgPreviewDisplay: true});
    } else {
      this.setState({msgContainerDisplay: true});
      this.setState({msgPreviewDisplay: true});
    }
  }

  handleFetchMessages() {
    axios({
      method: 'get',
      url: `/messages?auth_token=${localStorage.getItem('token')}`
    }).then(response => {
      if(response.data.error) {
        this.setState({error: response.data.error});
        if(response.data.error === "Please sign in again") {
          localStorage.removeItem('token')
        }
      } else {
        this.setState({messages: response.data})
      }
    })
    .catch(error => {
      this.setState({error: 'Messages failed to load 😢'})
    })
  }

  handleSetVisibleMessages(index) {
    const {windowWidth} = this.state;
    if(windowWidth < 700) {
      this.setState({msgContainerDisplay: true});
      this.setState({msgPreviewDisplay: false});
    }

    this.setState({coachMsgsVisible: index})
  }

  handleChange(text) {
    this.setState({message: text})
  }

  handleToggleMsgContainers() {
    const {msgContainerDisplay, msgPreviewDisplay, windowWidth} = this.state;
    this.setState({
      msgPreviewDisplay: !msgPreviewDisplay,
      msgContainerDisplay: !msgContainerDisplay
    })
  }

  handleSubmit() {
    const {message, messages, coachMsgsVisible} = this.state;
    const coachIds = uniqBy(messages, (p) => p.coach_id).map(msg => msg.coach_id);

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
          coach_id: coachIds[coachMsgsVisible]
        }
      }).then(response => {
        if(keys(response.data)[0] === 'error') {
          this.setState({error: response.data.error})
        } else {
          this.setState({messageText: '', success: true, error: ''});
          this.setState({message: ''});
          this.handleFetchMessages();
          this.setState({coachMsgsVisible: 0})
        }
      }).catch(error => {
        this.setState({error: 'Message failed to send 😢'})
      })
    }
  }

  render () {
    const {
      messages,
      coachMsgsVisible,
      message,
      windowWidth,
      msgContainerDisplay,
      msgPreviewDisplay,
      error
    } = this.state;
    // array to hold the first message for each unique message stream
    const msgPreviews = [];
      // unique player ids
    const coachIds = uniqBy(messages, (p) => p.coach_id).map(msg => msg.coach_id);
    // The message stream to show in the main container, it is defaulted to the player id at the 0th index
    const mainContainerMsgs = messages.filter(m => m.coach_id === coachIds[coachMsgsVisible]);
    coachIds.forEach(id => {
      let firstMsg = findIndex(messages, (o) => o.coach_id === id);
      msgPreviews.push(messages[firstMsg])
    });

    return (
      <div className='my-messages'>
        {error && <h2 className="error-msg">{error}</h2>}
        {localStorage.getItem('token') && <div>
          {messages.length === 0 && <h1>No messages yet. When a coach has messaged you, you will recieve an email from us.</h1>}
          {!msgPreviewDisplay && <h3 className="msg-backbtn" onClick={this.handleToggleMsgContainers}>Back</h3>}
          {messages.length > 0 && <div>
            <GridList cols={3} cellHeight='auto' padding={5}>
              <GridTile
                cols={msgContainerDisplay ? 1 : 3}
                style={{display: msgPreviewDisplay ? 'block' : 'none'}}
              >
                <div className='msg-previews'>
                  {msgPreviews.map((msg, i) => {
                    return(
                      <Card
                        key={msg.id}
                        onClick={() => this.handleSetVisibleMessages(i)}
                        className={i === coachMsgsVisible ? 'active' : ''}
                      >
                        <CardHeader
                          title={`Coach ${msg.coach_id}`}
                          subtitle={truncate(msg.text, {length: 50})}
                          avatar={<Avatar
                            color={'#ffbc49'}
                            backgroundColor={'#542e68'}
                            size={50}
                        >
                            {msg.coach_id}
                          </Avatar>}
                        />
                      </Card>
                    )
                  })}
                </div>
              </GridTile>
              <GridTile
                cols={msgPreviewDisplay ? 2 : 3}
                className='message-container'
                style={{display: msgContainerDisplay ? 'block' : 'none'}}
              >
                <h2>Coach {coachIds[coachMsgsVisible]}</h2>
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
                    let sender = msg.sender === 'player' ? 'Me' : 'Coach'
                    return (
                      <div key={i}>
                        <h4 className='sender-datetime'>{`${sender} at ${moment(msg.created_at).format('ddd MMM Do YYYY, h:mm:ss a')}`}</h4>
                        <p>{msg.text}</p>
                        <p className='japanese-text'>{msg.japanese_text}</p>
                      </div>
                    )
                  })}
                </div>
              </GridTile>
            </GridList>
          </div>}
        </div>}
      </div>
    )
  }
}

export default MessagesPlayers;
