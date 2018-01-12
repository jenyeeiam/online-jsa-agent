import axios from 'axios';

export function createCoach(team, email, password) {
  const promiseObj = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/coaches',
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
      },
      data: {
        team,
        email,
        password
      }
    })
    .then(response => resolve(response.data))
    .catch(() => {
        reject("Couldn't create Coach")
    })
  });
  return promiseObj
}

export function editProfile(profile) {
  const promiseObj = new Promise((resolve, reject) => {
    axios({
      method: 'patch',
      url: `/players/${localStorage.getItem('id')}`,
      headers: {
        "Content-Type": "application/json",
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRF-Token": document.getElementsByTagName("meta")[1].content
      },
      data: profile
    })
    .then(response => resolve(response.data))
    .catch(() => {
      reject("Couldn't update profile")
    })
  });
  return promiseObj
}
