const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log("App is running on port " + port);
});

// const URL = "http://localhost:3000/api/v1"
const URL = "https://wwn-backend.herokuapp.com/api/v1/"

const adapter = {

  getUsers: () => {
    return fetch(`${URL}/users`)
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

  createGame: (body) => {
    return fetch(`${URL}/games`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  },

}
