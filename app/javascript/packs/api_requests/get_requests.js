import axios from 'axios';

export function fetchPlayer(playerId) {
  const promiseObj = new Promise((resolve, reject) => {
    axios.get(`/players/${playerId}/edit`, {headers: {'token': localStorage.getItem('token')}})
      .then((response) => {
        resolve(response.data)
      })
      .catch(() => {
        reject("Couldn't retrieve profile")
      })
  });
  return promiseObj
}

export function fetchMessages() {
  const promiseObj = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `/messages?auth_token=${localStorage.getItem('token')}`
    })
    .then(response => {
      if(response.data.error) {
        reject(response.data.error)
      } else {
        resolve(response.data)
      }
    })
    .catch(error => {
      reject('Messages failed to load 😢')
    })
  });
  return promiseObj
}

export function fetchVideos(playerId) {
  const promiseObj = new Promise((resolve, reject) => {
    axios.get(`/videos?player_id=${playerId}`, {headers: {'token': localStorage.getItem('token')}})
    .then(response => {
      if(response.data.error) {
        reject(response.data.error)
      } else {
        resolve(response.data)
      }
    })
    .catch(error => {
      reject('Unable to retrieve videos')
    })
  });
  return promiseObj
}

export function fetchPlayers() {
  const promiseObj = new Promise((resolve, reject) => {
    axios.get('/players', {headers: {'token': localStorage.getItem('token')}})
    .then(response => {
      if(response.data.error) {
        reject(response.data.error)
      } else {
        resolve(response.data)
      }
    })
    .catch(error => {
      reject("Couldn't retreive players")
    })
  });
  return promiseObj
}
