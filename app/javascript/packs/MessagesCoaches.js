import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {keys, truncate, uniqBy, findIndex} from "lodash";
import moment from 'moment';
import { fetchMessages } from "./api_requests/get_requests";
import { sendMessage } from "./api_requests/post_requests";

class MessagesCoaches extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetVisibleMessages = this.handleSetVisibleMessages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleMsgContainers = this.handleToggleMsgContainers.bind(this);

    this.state = {
      messages: [],
      playerMsgsVisible: 0,
      message: '',
      error: '',
      players: []
    };
  }

  componentDidMount() {
    fetchMessages()
      .then(response => {
        this.setState({messages: response.messages, players: response.players})
      })
      .catch(error =>  this.setState({error: error}))
    this.setState({windowWidth: screen.width});
    if(screen.width < 700) {
      this.setState({msgContainerDisplay: false});
      this.setState({msgPreviewDisplay: true});
    } else {
      this.setState({msgContainerDisplay: true});
      this.setState({msgPreviewDisplay: true});
    }
  }

  handleToggleMsgContainers() {
    const {msgContainerDisplay, msgPreviewDisplay, windowWidth} = this.state;
    this.setState({
      msgPreviewDisplay: !msgPreviewDisplay,
      msgContainerDisplay: !msgContainerDisplay
    })
  }

  handleSetVisibleMessages(index) {
    const {windowWidth} = this.state;
    if(windowWidth < 700) {
      this.setState({msgContainerDisplay: true});
      this.setState({msgPreviewDisplay: false});
    }
    this.setState({playerMsgsVisible: index})
  }

  handleChange(text) {
    this.setState({message: text})
  }

  handleSubmit() {
    const {message, messages, playerMsgsVisible} = this.state;
    const playerIds = uniqBy(messages, (p) => p.player_id).map(msg => msg.player_id);

    if(message.length > 0) {
      const messagePayload = {
        message_text: message,
        auth_token: localStorage.getItem('token'),
        player_id: playerIds[playerMsgsVisible]
      }
      sendMessage(messagePayload)
        .then(response => {
          this.setState({messageText: '', success: true, error: ''});
          this.setState({message: ''});
          this.setState({playerMsgsVisible: 0});
          fetchMessages()
            .then(res => {
              this.setState({messages: res.messages, players: res.players})
            })
            .catch(error =>  this.setState({error: error}))
          })
          .catch(error =>  this.setState({error: error}))
        
    }
  }

  render () {
    const {
      messages,
      players,
      playerMsgsVisible,
      message,
      windowWidth,
      msgContainerDisplay,
      msgPreviewDisplay,
      error
    } = this.state;
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
    let playerName = players.length > 0 ? players.find(p => p.id == playerIds[playerMsgsVisible]).name : '';
    return (
      <div className='my-messages'>
        {error && <h2 className="error-msg">{error}</h2>}
        {localStorage.getItem('token') && <div>
          {!msgPreviewDisplay && <h3 className="msg-backbtn" onClick={this.handleToggleMsgContainers}>バック</h3>}
          {messages.length === 0 && <div>
            <h2>まだメッセージがありません。コーチのみ、会話を始める事ができます</h2>
            <Link to="/players-list">
              <RaisedButton label="選手の情報て" primary={true}/>
            </Link>
          </div>}
          {messages.length > 0 && <GridList cols={3} cellHeight='auto' padding={5}>
            <GridTile
              cols={msgContainerDisplay ? 1 : 3}
              style={{display: msgPreviewDisplay ? 'block' : 'none'}}
            >
              <div className='msg-previews'>
                {msgPreviews.map((msg, i) => {
                  let playerIndex = findIndex(players, (o) => o.id === msg.player_id)
                  return(
                    <Card
                      key={msg.id}
                      onClick={() => this.handleSetVisibleMessages(i)}
                      className={i === playerMsgsVisible ? 'active' : ''}
                    >
                      <CardHeader
                        title={`${players[playerIndex].name || '選手'}`}
                        subtitle={truncate(msg.japanese_text, {length: 50})}
                        avatar={<Avatar
                          className='avatar'
                          icon={<i className="material-icons avatar">account_circle</i>} />}
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
              <h2>{playerName} 選手</h2>
              <div className='messages'>
                <div className="text-input">
                  <TextField
                    value={message}
                    autoFocus={true}
                    hintText="メッセージを入力して下さい"
                    multiLine={true}
                    fullWidth={true}
                    onKeyPress={(ev) => {if(ev.key === 'Enter') {this.handleSubmit()}}}
                    onChange={(e, newVal) => this.handleChange(newVal)}
                  />
                  <RaisedButton
                    label="送信する"
                    primary={true}
                    style={{float: 'right'}}
                    onClick={this.handleSubmit}
                  />
                </div>
                {mainContainerMsgs.map((msg, i) => {
                  let sender = msg.sender === 'coach' ? '私' : '選手とし'
                  return (
                    <div key={i}>
                      <h4 className='sender-datetime'>{`${sender} at ${moment(msg.created_at).format('ddd MMM Do YYYY, h:mm:ss a')}`}</h4>
                      <p>{msg.japanese_text}</p>
                      <p className='japanese-text'>{msg.text}</p>
                    </div>
                  )
                })}

              </div>
            </GridTile>
          </GridList>}
        </div>}
      </div>
    )
  }
}

export default MessagesCoaches;
