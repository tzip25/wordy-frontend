window.addEventListener('DOMContentLoaded', e => {

  const gameContainer = document.querySelector("#game-container")
  const wordForm = document.querySelector("#input-form")
  const wordInputField = document.querySelector("#word-input-field")
  const wordSubConfirm = document.querySelector('#word-submit-confirm')
  const gameClock = document.querySelector("#game-clock")
  const playButton = document.querySelector("#play-button")

  // adapter.getUsers()
  // // .then(users => {
  // //   // users.forEach(user => {
  // //   // })
  // // })

  //event listener for user input - matching letters to tiles
  wordForm.addEventListener("input", e=> {
    e.preventDefault()

    //reset letter tile color to white unless in user input
    const preInputLetterTile = document.querySelectorAll(".highlited")
    preInputLetterTile.forEach(letter => {
      letter.className = "letter-tile"
    })

    //change letter tile color to yellow when user input matches letter
    const userInput = e.target.value
    inputArray = userInput.split('')
    const letterCounter = {}

    inputArray.forEach(letter => {

      if (letterCounter[letter]){ letterCounter[letter]+=1
      } else {
        letterCounter[letter] = 1
      }

      let letterTile = document.querySelectorAll(`[data-id = '${letter}']`)[letterCounter[letter]-1]
      if(letterTile) {
        letterTile.className = "highlited"
      }

    })
  })

  //event listener for user submit word
   wordForm.addEventListener("submit", submitListener)

function submitListener(e){
  e.preventDefault()
  const wordSubmit = e.target.children[0].value

  let word = ""
  let highlitedLetters = document.querySelectorAll(".highlited")
  highlitedLetters.forEach(letter => {
    word += letter.innerText
  })
  //sorted word from highlited
  const sortedWord = word.split('').sort()
  //sorted word from user input
  const sortedWordSubmit = wordSubmit.split('').sort()

  if(sortedWord.join('') === sortedWordSubmit.join('')){
    highlitedLetters.forEach(letter => {
      gameContainer.removeChild(letter)
      wordSubConfirm.innerText = `"${wordSubmit}" submitted`
      wordForm.reset()
    })
  } else {
    highlitedLetters.forEach(letter => {
      wordSubConfirm.innerText = "Invalid word!"
    })
  }
}

playButton.addEventListener('click', ev => {
  wordInputField.disabled = false
  wordInputField.style.background = "white"
  gameContainer.innerHTML = ""
  startPlay()
  ev.target.style.display = "none"
})

  function randomizeLetters(){
    const lettersArray = ['a','a', 'a', 'e', 'e', 'i', 'i', 'o', 'o', 'u', 'u', 'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let randomIndex = Math.floor(Math.random()*26)
    let letterDiv = document.createElement("div")
    letterDiv.dataset.action = "falling-letter"
    letterDiv.className = "letter-tile"
    letterDiv.innerText = lettersArray[randomIndex]
    letterDiv.dataset.id = letterDiv.innerText
    gameContainer.appendChild(letterDiv)
  }



function startPlay() {
  gameClock.innerText = "Time: 0"
  let clockCounter = 0
  const gameTime = setInterval(gameClockFunction, 1000)
  function gameClockFunction(){
     ++clockCounter
     gameClock.innerText = "Time: " + clockCounter
  }
  let gameRunner = setInterval(function(){
    randomizeLetters()
    if (gameContainer.children.length === 60){
      clearInterval(gameRunner)
      clearInterval(gameTime)
      console.log(gameClock.innerText)
       wordInputField.value = ""
       wordInputField.disabled = true
       wordInputField.style.background = "lightgray"
       playButton.style.display = "block"
    }
  }, 200)
}






});
