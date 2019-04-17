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
  const leaderboardIcon = document.querySelector("#leaderboard-icon")
  const rightContainer = document.querySelector("#right-container")
  const loginForm = document.querySelector("#login-form")
  const loginFormDiv = document.querySelector("#login-form-div")
  const leftMenu = document.querySelector("#left-menu")
  const userNameField = document.querySelector("#login-field")

  let username;
  let signedIn = false;
  let scoreMult = 1;
  let gameWordsArray = [];
  let gameRunner;

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

      //check if word exists in regex dictionary.js file
      function checkRegex(word) {
        return regex.test(word)
      }


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

      //check if all letters of word submitted are on the DOM and if word submitted is in regex dictionary
      if(sortedWord.join('') === sortedWordSubmit.join('') && checkRegex(wordSubmit)){
          //add word to temp game array of words so we can later find longest word
          gameWordsArray.push(wordSubmit)
          //calculate score based on length of word
          scoreCalculator(wordSubmit)
          //remove submitted letters from the DOM and display submitted word in right container
          highlitedLetters.forEach(letter => {
            gameContainer.removeChild(letter)
            rightContainer.innerHTML =
            `<h1>${wordSubmit}</h1>`
            //clear word input field
            wordForm.reset()
          })
      } else {
          rightContainer.innerHTML = `<h1>Invalid Word</h1>`
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
        const lettersArray = ['e','e','e','e','e','e','e','e','e','e','e','a','a','a','a','a','a','a','a','r','r','r','r','r','r','r','r','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','t','t','t','t','t','t','t','n','n','n','n','n','n','n','s','s','s','s','s','s','l','l','l','l','l','c','c','c','c','c','u','u','u','u','d','d','d','p','p','p','m','m','m','h','h','h','g','g','b','b','f','f','y','y','w','k','v','x','z','j','q'];
        let randomIndex = Math.floor(Math.random()*103)
        let letterDiv = document.createElement("div")
        letterDiv.dataset.action = "falling-letter"
        letterDiv.className = "letter-tile"
        letterDiv.innerText = lettersArray[randomIndex]
        letterDiv.dataset.id = letterDiv.innerText
        gameContainer.appendChild(letterDiv)
      }

      let speed = 1500
      let clockCounter = 0
      let speedInterval;

      function gameClockFunction(){
         ++clockCounter
         gameClock.innerText = clockCounter
      }


      function gameSpeedControl(gameTime) {
        clearInterval(gameRunner)
        speed = speed * (0.95)
        gameRunner = setInterval(function(){
        randomizeLetters()
        gameOver(gameRunner, gameTime)
      }, speed)
    }

    function startPlay() {
      rightContainer.innerText = ""
      gameWordsArray = []
      gameClock.innerText = "0"
      gameScore.innerText = "0"
      const gameTime = setInterval(gameClockFunction, 1000)

        gameRunner = setInterval(function(){
        randomizeLetters()
        gameOver(gameRunner, gameTime)

      }, 1500)

      speedInterval = setInterval(() => gameSpeedControl(gameTime), 5000)


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

        rightContainer.innerHTML = ""
        rightContainer.appendChild(loginFormDiv)
      }
    })

    leaderboardIcon.addEventListener('click', ev=> {
      LeaderboardStats()
    })

    loginForm.addEventListener('submit', e=> {
      e.preventDefault()
      let user = userNameField.value
      let body = {username: user}

      if(user){
        adapter.createUser(body).then(res=> {
          signedIn = true;
          playButton.disabled = false
          username = user
          userStats()
          //create and show logout button when user is logged in
          const logout = document.createElement('a')
          logout.href = "javascript:window.location.reload(true)"
          logout.className = "item"
          logout.id = "logout-icon"
          logout.innerHTML = `<i class="smile icon"></i>Logout`
          leftMenu.appendChild(logout)
        })
      } else {
        alert("Please enter a username")
      }

    });

    function userStats() {
      //change icon from login to my stats
      userIcon.innerHTML = `<i class="block layout icon"></i> My Stats`

      rightContainer.innerHTML =
      `<h2>Welcome ${username.toUpperCase()}</h2>

      <div class="ui raised segment">
      <a class="ui red ribbon label">Your High Scores</a>
      <br><br>
      <span id="high-scores"></span>
      </div>

      <div class="ui raised segment">
      <a class="ui orange ribbon label">Your Longest Games</a>
      <br><br>
      <span id="longest-games"></span>
      </div>

      <div class="ui raised segment">
      <a class="ui black ribbon label">Your Longest Word</a>
      <br><br>
      <span id="longest-word"></span>
      </div>
      `

      adapter.getUsers().then(users => {

          const currentUser = users.find(user => {
            return user.username === username
          })

          const scoreArr = []
          const timeArr = []
          const wordArr = []

          currentUser.games.forEach(game => {
            scoreArr.push(parseInt(game.score))
            timeArr.push(parseInt(game.time))
            wordArr.push(game.longest_word)
          })

          scoreArr.sort(function(a, b){return b-a}).slice(0,3).forEach(score => {
            const gameScores = document.querySelector('#high-scores')
            gameScores.innerHTML += `<p>${score}</p>`
          })

          timeArr.sort(function(a, b){return b-a}).slice(0,3).forEach(time => {
            const gameLengths = document.querySelector('#longest-games')
            gameLengths.innerHTML += `<p>${time} seconds</p>`
          })

          wordArr.sort(function(a, b) {
            return b.length - a.length
          })

          if (wordArr[0]) {
            const wordLengths = document.querySelector('#longest-word')
            wordLengths.innerHTML += `<p>${wordArr[0]}</p>`
          }

      })
    }


    function LeaderboardStats() {
      rightContainer.innerHTML =
      `<h2>Leaderboard</h2>

      <div class="ui raised segment">
      <a class="ui red ribbon label">Highest Scores</a>
      <br><br>
      <span id="high-scores"></span>
      </div>

      <div class="ui raised segment">
      <a class="ui black ribbon label">Longest Words</a>
      <br><br>
      <span id="legendary-words"></span>
      </div>
      `

      adapter.getUsers().then(users => {

          const scoreObj = {}

          users.forEach(user => {
            user.games.forEach(game => {
              if(scoreObj[game.score]){
                scoreObj[game.score].push(user.username)
              } else {
                scoreObj[game.score] = []
                scoreObj[game.score].push(user.username)
              }
            })
          })

          const highScores = document.querySelector('#high-scores')
          const tempDiv = document.createElement('div')

          const sorted = Object.keys(scoreObj).sort(function(a,b) {
            return b-a
          })

          sorted.forEach(score => {
            scoreObj[score].forEach(user => {
              tempDiv.innerHTML += `<p>${user}: ${score}</p>`
            })
          })

          const ps = tempDiv.querySelectorAll('p')
          const tempArr = [...ps]

          tempArr.slice(0,5).forEach(p => {
            highScores.innerHTML += `<p>${p.innerText}</p>`
          })


          const wordArr = []
          users.forEach(user=>{
            user.games.forEach(game => {
              wordArr.push(game.longest_word)
            })
          })

          wordArr.sort(function(a, b) {
            return b.length - a.length
          })

          if (wordArr[0]) {
            const legendaryWords = document.querySelector('#legendary-words')
            wordArr.slice(0,5).forEach(word=> {
              legendaryWords.innerHTML += `<p>${word}</p>`
            })
          }

      })

      }

            function gameOver(gameRunner,gameTime){
              if (gameContainer.children.length === 60){
                clearInterval(gameRunner)
                clearInterval(gameTime)
                clearInterval(speedInterval)
                 wordInputField.value = ""
                 wordInputField.disabled = true
                 wordInputField.style.background = "lightgray"
                 playButton.style.display = "block"
                 let longestWord;
                 if (gameWordsArray[0]) {
                     longestWord = gameWordsArray.sort(function(a, b) {
                       return b.length - a.length
                     })[0]
                    }
                else {longestWord = ""}
                 let finalClock = gameClock.innerHTML
                 let finalScore = gameScore.innerHTML
                 const body = {username: username, score: finalScore, longest_word: longestWord, time: finalClock}
                 adapter.createGame(body)

              }
          }




});
