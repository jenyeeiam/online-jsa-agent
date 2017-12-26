import React from 'react';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {keys, truncate, uniqBy, findIndex} from "lodash";
import moment from 'moment';

class MyMessages extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetVisibleMessages = this.handleSetVisibleMessages.bind(this);
    this.state = {
      messages: [],
      playerMsgsVisible: 0,
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

  handleSetVisibleMessages(index) {
    this.setState({playerMsgsVisible: index})
  }

  render () {
    const {messages, playerMsgsVisible} = this.state;
    const msgPreviews = [];
    const playerIds = uniqBy(messages, (p) => p.player_id).map(msg => msg.player_id);
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
          <GridTile cols={2}>
            <div className='messages'>
              <h2>Player {playerIds[playerMsgsVisible]}</h2>
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

// {false && keys(messages).forEach((playerId) => {
//   messages[playerId].map((message, index) => {
//     console.log(message)
//     return (
//       <div key={index} className='message'>
//         <h4>{`Player ${playerId}`}</h4>
//         <p>{`Last Message ${moment(message.created_at).format('ddd, MMM Do YYYY')}`}</p>
//         <p>{message.text}</p>
//       </div>
//     )
//   })
// })}

export default MyMessages;
