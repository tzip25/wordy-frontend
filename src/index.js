window.addEventListener('DOMContentLoaded', e => {
  const gameContainer = document.querySelector("#game-container")
  const wordForm = document.querySelector("#input-form")
  const wordInputField = document.querySelector("#word-input-field")
  const wordSubConfirm = document.querySelector('#word-submit-confirm')
  const gameClock = document.querySelector("#game-clock")
  const gameScore = document.querySelector("#game-score")
  const playButton = document.querySelector("#play-button")
  const userIcon = document.querySelector("#user-icon")
  const gameIcon = document.querySelector("#game-icon")
  const rightContainer = document.querySelector("#right-container")
  const loginForm = document.querySelector("#login-form")
  const loginFormDiv = document.querySelector("#login-form-div")

  let username;
  let signedIn = false;
  let scoreMult = 1;
  let gameWordsArray = [];



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
     //Checking submitted word against highlighted letters
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
         gameWordsArray.push(wordSubmit)
        scoreCalculator(wordSubmit)
        highlitedLetters.forEach(letter => {
          gameContainer.removeChild(letter)

          rightContainer.innerHTML =
          `<h1>${wordSubmit}</h1>`

          wordForm.reset()

        })
      } else {
        highlitedLetters.forEach(letter => {
          rightContainer.innerHTML = `<h1>Invalid Word</h1>`
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
      rightContainer.innerText = ""
      gameWordsArray = []
      gameClock.innerText = "0"
      gameScore.innerText = "0"
      let clockCounter = 0
      const gameTime = setInterval(gameClockFunction, 1000)
      function gameClockFunction(){
         ++clockCounter
         gameClock.innerText = clockCounter
      }
      let gameRunner = setInterval(function(){
        randomizeLetters()
        if (gameContainer.children.length === 60){
          clearInterval(gameRunner)
          clearInterval(gameTime)
           wordInputField.value = ""
           wordInputField.disabled = true
           wordInputField.style.background = "lightgray"
           playButton.style.display = "block"
           const longestWord = gameWordsArray.sort(function(a, b) {
             return b.length - a.length
           })[0]
           let finalClock = gameClock.innerHTML
           let finalScore = gameScore.innerHTML
           const body = {username: username, score: finalScore, longest_word: longestWord, time: finalClock}
           adapter.createGame(body)



        }
      }, 300)
    }

    function scoreCalculator(word){
        let wordScore = word.length*(scoreMult)
        let parsedScore = parseInt(gameScore.innerText)
        parsedScore+= wordScore
        gameScore.innerText = parsedScore
    }

    userIcon.addEventListener('click', ev => {
      if(signedIn){
        userStats()
      } else {
        rightContainer.appendChild(loginFormDiv)
      }
    })

    loginForm.addEventListener('submit', e=> {
      e.preventDefault()
      let user = document.querySelector("#login-field").value
      let body = {username: user}
      adapter.createUser(body).then(res=> {
        signedIn = true;
        username = user
        userStats()
      })
    });

    function userStats() {
      userIcon.innerHTML = `<i class="smile icon"></i> My Stats`

      rightContainer.innerHTML =
      `<h2>Welcome ${username.toUpperCase()}</h2>

      <h3>Your High Scores:</h3>
      <span id="high-scores"></span>

      <h3>Your Longest Games:</h3>
      <span id="longest-games"></span>

      <h3>Your Longest Word:</h3>
      <span id="longest-word"></span>
      `

      adapter.getUsers().then(users => {

          const currentUser = users.find(user => {
            return user.username === username
          })

          const scoreArr = []
          const timeArr = []
          const wordArr = []

          currentUser.games.forEach(game => {
            scoreArr.push(game.score)
            timeArr.push(game.time)
            wordArr.push(game.longest_word)
          })

          scoreArr.sort().reverse().slice(0,2).forEach(score => {
            const gameScores = document.querySelector('#high-scores')
            gameScores.innerHTML += `<p>${score}</p>`
          })

          timeArr.sort().reverse().slice(0,2).forEach(time => {
            const gameLengths = document.querySelector('#longest-games')
            gameLengths.innerHTML += `<p>${time}</p>`
          })

          wordArr.sort(function(a, b) {
            return b.length - a.length
          })

          const wordLengths = document.querySelector('#longest-word')
          wordLengths.innerHTML += `<p>${wordArr[0]}</p>`

      })
    }



});
