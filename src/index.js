window.addEventListener('DOMContentLoaded', e => {


  const gameContainer = document.querySelector("#game-container")



  // adapter.getUsers()
  // // .then(users => {
  // //   // users.forEach(user => {
  // //   // })
  // // })


  function randomizeLetters(){
    const lettersArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let randomIndex = Math.floor(Math.random()*26)
    let letterDiv = document.createElement("div")
    letterDiv.dataset.action = "falling-letter"
    letterDiv.className = "letter-tile"
    letterDiv.innerText = lettersArray[randomIndex]
    gameContainer.appendChild(letterDiv)
    console.log(gameContainer.children.length)

  }

  // function gameRunner(){
  //   do {setInterval(randomizeLetters,1000)}
  //   while (gameContainer.children.length < 64)
  //
  // }

  let gameRunner = setInterval(function(){
    randomizeLetters()
    if (gameContainer.children.length === 64){
      clearInterval(gameRunner)
    }
  }, 400)




});
