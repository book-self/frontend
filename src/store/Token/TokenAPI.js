import axios from 'axios'

export function createUser(payload) {
  const json = JSON.stringify(payload);

  axios.post(process.env.REACT_APP_API_URL+'/v1/users/new-user', json, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
      console.log(response)
      return response.token
  })
}

export function fetchUser(payload) {
  const json = JSON.stringify(payload);

  axios.post(process.env.REACT_APP_API_URL+'/v1/user', json, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
      console.log(response)
      return response.token
  })
}
