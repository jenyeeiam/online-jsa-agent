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
    this.state = {
      messages: [],
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
    const msgPreviews = [];
    console.log(messages)
    const playerIds = uniqBy(messages, (p) => p.player_id).map(msg => msg.player_id);
    const mainContainerMsgs = messages.filter(m => m.player_id === playerIds[0]);
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
                  <Card key={msg.id}>
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
              {mainContainerMsgs.map((msg, i) => {
                return (
                  <div key={i}>
                    <h4>Sender: {moment(msg.created_at).format('ddd, MMM Do YYYY')}</h4>

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
