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
