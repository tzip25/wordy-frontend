const URL = "http://localhost:3000/api/v1"

const adapter = {

  getUsers: () => {
    return fetch(URL)
    .then(res=>res.json())
  },

  createUser: (username) => {
    return fetch(`${URL}/users`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(username)
    })
    .then(res => res.json())
  },

}
