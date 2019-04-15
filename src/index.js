window.addEventListener('DOMContentLoaded', e => {
console.log("DOM has loaded");



  adapter.getUsers()
  .then(users => {
    users.forEach(user => {
      const p = document.createElement('p')
      p.innerText = user.username
      document.querySelector("#test").append(p)
    })
  })




});
