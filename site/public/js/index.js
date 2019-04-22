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
  const rulesIcon = document.querySelector("#rules-icon")
  const volumeIcon = document.querySelector("#volume-icon")
  const bombDiv =  document.querySelector("#bomb-div")

  let username;
  let signedIn = false;
  let wordScore;
  let scoreMult = 1;
  let timeMult = 1;
  let gameWordsArray = [];
  let gameRunner;
  let speed = 1500
  let clockCounter = 0;
  let speedInterval;
  let bombArray;
  let soundOn = true;



      userNameField.focus()

      //abstracted event listeners
      wordForm.addEventListener("submit", submitListener)
      playButton.addEventListener('click', playGame)
      leaderboardIcon.addEventListener('click', leaderboardStats)
      rulesIcon.addEventListener('click', displayRules)
      document.addEventListener('keyup', bombFunction)
      volumeIcon.addEventListener('click',toggleSound)


      //event listener for user input - matching letters to tiles
      wordForm.addEventListener("input", e=> {
        e.preventDefault()
        //reset letter tile color to white unless in user input
        const preInputLetterTile = document.querySelectorAll(".highlited")
        preInputLetterTile.forEach(letter => {
          letter.className = "letter-tile"
        })
        //change letter tile color to yellow when user input matches letter
        const userInput = e.target.value.toLowerCase()
        inputArray = userInput.split('')
        const letterCounter = {}

        if (soundOn){
        sounds.playTileSound()
        }

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

      function fade(element) {
        let op = 1;  // initial opacity
        let timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 70);
      }

    //check if word exists in regex dictionary.js file
    function checkRegex(word) {
      return regex.test(word)
    }

    function submitListener(e){
      e.preventDefault()

      const wordSubmit = e.target.children[0].value.toLowerCase().replace(/\s/g, '');
     //Checking submitted word against highlighted letters
      let word = ""
      let highlitedLetters = document.querySelectorAll(".highlited")
      highlitedLetters.forEach(letter => {
        word += letter.innerText.toLowerCase()
      })
      //sorted word from highlited
      const sortedWord = word.split('').sort()
      //sorted word from user input
      const sortedWordSubmit = wordSubmit.split('').sort()

      //check if all letters of word submitted are on the DOM and if word submitted is in regex dictionary
      if(sortedWord.join('') === sortedWordSubmit.join('') && checkRegex(wordSubmit)){
          //play word submit sound
          if (soundOn) {
          sounds.playWordSound()
          }
          //add word to temp game array of words so we can later find longest word
          gameWordsArray.push(wordSubmit)
          //calculate score based on length of word
          scoreCalculator(wordSubmit)
          //remove submitted letters from the DOM and display submitted word in right container
          highlitedLetters.forEach(letter => {
            gameContainer.removeChild(letter)

            //fade out valid word
            rightContainer.innerHTML = ''
            const h1 = document.createElement('h1')
            h1.className = "valid-word"
            h1.innerHTML = `${wordSubmit.toUpperCase()}<br> + ${wordScore}`

            rightContainer.appendChild(h1)
            fade(h1)

            //clear word input field
            wordForm.reset()

          })
      } else {
        //play invalid word sound
        if (soundOn){
        sounds.playInvalidWordSound()
        }
        //fade out invalid word
        rightContainer.innerHTML = ''
        const h1 = document.createElement('h1')
        h1.className = "invalid-word"
        h1.innerHTML = `INVALID <br> WORD`
        rightContainer.appendChild(h1)
        fade(h1)
      }
    }

    function playGame(){
      wordInputField.disabled = false
      wordInputField.style.background = "white"
      gameContainer.innerHTML = ""
      startPlay()
      playButton.style.display = "none"
    }

      function randomizeLetters(){
        const lettersArray = ['e','e','e','e','e','e','e','e','e','e','e','a','a','a','a','a','a','a','a','r','r','r','r','r','r','r','r','i','i','i','i','i','i','i','i','o','o','o','o','o','o','o','t','t','t','t','t','t','t','n','n','n','n','n','n','n','s','s','s','s','s','s','l','l','l','l','l','c','c','c','c','c','u','u','u','u','d','d','d','p','p','p','m','m','m','h','h','h','g','g','b','b','f','f','y','y','w','k','v','x','z','j','q'];
        let randomIndex = Math.floor(Math.random()*103)
        let letterDiv = document.createElement("div")
        letterDiv.className = "letter-tile"
        letterDiv.innerText = lettersArray[randomIndex]
        letterDiv.dataset.id = letterDiv.innerText
        gameContainer.appendChild(letterDiv)
      }

      String.prototype.toMMSS = function () {
      var sec_num = parseInt(this, 10); // don't forget the second param
      var minutes = Math.floor((sec_num) / 60);
      var seconds = sec_num - (minutes * 60);

      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return minutes + ':' + seconds;
      }


      function gameClockFunction(){
         ++clockCounter
         gameClock.innerText = clockCounter.toString(10).toMMSS()
      }


      function gameSpeedControl(gameTime) {
        clearInterval(gameRunner)
        speed = speed * (0.95)
        timeMult = timeMult * 1.05
        gameRunner = setInterval(function(){
        randomizeLetters()
        gameOver(gameRunner, gameTime)
      }, speed)
    }

    function startPlay() {
      bombArray = [`<i class="bomb icon"></i>`, `<i class="bomb icon"></i>`,`<i class="bomb icon"></i>`]
      renderBombs(bombArray)
      wordInputField.focus()
      clockCounter = 0;
      rightContainer.innerText = ""
      gameWordsArray = []
      gameClock.innerText = "00:00"
      gameScore.innerText = "0"
      const gameTime = setInterval(gameClockFunction, 1000)

      gameRunner = setInterval(function(){
      randomizeLetters()
      gameOver(gameRunner, gameTime)
      }, 1500)

      speedInterval = setInterval(() => gameSpeedControl(gameTime), 5000)
    }


    function scoreCalculator(word){
       if (word.length === 5){
         scoreMult = 1.5
       }
       else if (word.length === 6){
         scoreMult = 2
       }
       else if (word.length >= 7){
         scoreMult = 2.5
       }
        wordScore = Math.round(word.length*scoreMult * timeMult)
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
        userNameField.focus()
      }
    })


    loginForm.addEventListener('submit', e=> {
      e.preventDefault()

      let user = userNameField.value
      user = capitalizeWord(user)

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
          logout.innerHTML = `<i class="frown icon"></i>Logout`
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
      `<h2>Welcome ${username}</h2>

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
            let timeString = time.toString(10).toMMSS()
            const gameLengths = document.querySelector('#longest-games')
            gameLengths.innerHTML += `<p>${timeString}</p>`
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


    function leaderboardStats() {
      rightContainer.innerHTML =
      `<h2>Leaderboard</h2>

      <div id="leaderboard-scores" class="ui raised segment">
      <a class="ui red ribbon label">Highest Scores</a>
      <br><br>
      <span id="high-scores"></span>
      </div>

      <div id="leaderboard-words" class="ui raised segment">
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

          tempArr.slice(0,10).forEach(p => {
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
            wordArr.slice(0,10).forEach(word=> {
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
                let gameClockString = gameClock.innerHTML;
                 let timeStringArray = gameClockString.split(":")
                 let secondCount = (parseInt(timeStringArray[0])*60) + parseInt(timeStringArray[1])
                 let finalClock = secondCount
                 let finalScore = gameScore.innerHTML
                 const body = {username: username, score: finalScore, longest_word: longestWord, time: finalClock}
                 adapter.createGame(body)
                 //reset game start speed and score mult for next game
                 speed = 1500
                 scoreMult = 1
                 timeMult = 1
                 //play game over sound
                 if (soundOn){
                 sounds.playGameOverSound()
                 }
                 //display game over text and game stats
                 gameOverText(finalScore, gameClockString, longestWord)
              }
          }


        function displayRules() {
          rightContainer.innerHTML = ''
          rightContainer.innerHTML =
          `<div class="ui raised segment">
          <a class="ui red ribbon label">Rules</a>
          <h2>Welcome Nerd!</h2>
          <p>If you’re a word enthusiast, then you’ve come to the right place. Form words by typing letters you see on the board and hitting ENTER. Letters do not need to be in order. The letters appear slowly at first, but don’t get too comfortable! As time goes on, the rate of new tiles will get faster and faster. Once the board fills up it’s GAME OVER.</p>
          <p><b>SCORING</b><br>
          You’ll score one point for every letter. 5-letter words are worth 1.5x points, 6-letter words are 2x points, and anything 7 letters and over is worth 2.5x points! Scoring also increases incrementaly the longer you play.
          </p>
          <p><b>BOMBS</b> <i class="bomb icon"></i><i class="bomb icon"></i><i class="bomb icon"></i><br>
          If you’re up against the ropes, hit the SPACE key to activate a bomb and clear the board. You’re only given 3, so use them wisely!</p>
          <h3>Happy nerding!</h3>
          </div>
          `
        }


        function gameOverText(finalScore, finalTime, longestWord) {
          rightContainer.innerHTML = ''

          rightContainer.innerHTML +=

        `<h1 class="game-over">GAME <br> OVER</h1>
        <div class="ui segments">
          <div class="ui segment"><p>Score</p></div>
          <div class="ui secondary segment"><p>${finalScore}</p></div>
        </div>
        <div class="ui segments">
          <div class="ui segment"><p>Time</p></div>
          <div class="ui secondary segment"><p>${finalTime}</p></div>
        </div>
        <div class="ui segments">
          <div class="ui segment"><p>Longest Word</p></div>
          <div class="ui secondary segment"><p>${longestWord}</p></div>
        </div>
        `
      }


     function renderBombs(bombArray){
       bombDiv.innerHTML =''
       bombArray.forEach(bomb => {
         bombDiv.innerHTML += bomb
       })
     }

     function bombFunction(e){
       if (e.keyCode == 32 && bombArray.length > 0){
         if (soundOn){
         sounds.playBombSound()
         }
         bombArray.pop()
         renderBombs(bombArray)
         gameContainer.innerHTML=""
         wordForm.reset()
       }
     }


     function capitalizeWord(string){
       const s = string.toLowerCase()
       return s.charAt(0).toUpperCase() + s.slice(1)
     }

     function toggleSound(){
       if (soundOn){
         soundOn = false;
         volumeIcon.innerHTML = `<i class="volume off icon"></i>Sound Off`

       }
       else {
         soundOn = true;
         volumeIcon.innerHTML = `<i class="volume up icon"></i>Sound On`
       }
     }


});
