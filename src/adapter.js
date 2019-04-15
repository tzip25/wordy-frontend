const URL = "http://localhost:3000/api/v1/users"

const adapter = {

  getUsers: () => {
    return fetch(URL)
    .then(res=>res.json())
  },

}
