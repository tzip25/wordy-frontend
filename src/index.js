window.addEventListener('DOMContentLoaded', e => {

  const gameContainer = document.querySelector("#game-container")
  const wordForm = document.querySelector("#input-form")

  // adapter.getUsers()
  // // .then(users => {
  // //   // users.forEach(user => {
  // //   // })
  // // })


  //event listener for user input - matching letters to tiles
  wordForm.addEventListener("input", e=> {
    e.preventDefault()

    //reset letter tile color to white unless in user input
    const preInputLetterTile = document.querySelectorAll(".letter-tile")
    preInputLetterTile.forEach(letter => {
      letter.style.background = "white"
    })

    //change letter tile color to yellow when user input matches letter
    const userInput = e.target.value
    inputArray = userInput.split("")

    const letterCounter = {}
    inputArray.forEach(letter => {
      if (letterCounter[letter]){ letterCounter[letter]+=1
      } else {
        letterCounter[letter] = 1
      }
      let letterTile = document.querySelectorAll(`[data-id = '${letter}']`)[letterCounter[letter]-1]
      if(letterTile) {
        letterTile.style.background = "yellow"
      }

    })
    console.log(letterCounter)
  })

  //event listener for user submit word
  wordForm.addEventListener("submit", e=> {
    e.preventDefault()
    console.log(e);
  })

  function randomizeLetters(){
    const lettersArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let randomIndex = Math.floor(Math.random()*26)
    let letterDiv = document.createElement("div")
    letterDiv.dataset.action = "falling-letter"
    letterDiv.className = "letter-tile"
    letterDiv.innerText = lettersArray[randomIndex]
    letterDiv.dataset.id = letterDiv.innerText
    gameContainer.appendChild(letterDiv)
  }


  let gameRunner = setInterval(function(){
    randomizeLetters()
    if (gameContainer.children.length === 64){
      clearInterval(gameRunner)
    }
  }, 1000)




});
