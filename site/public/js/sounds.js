
const sounds = {

      playBombSound: () => {
        const bombSound = new Audio()
        bombSound.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/bomb2.mp3"
        bombSound.play()
      },

      playTileSound: () => {
        const tileSound = new Audio()
        tileSound.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/tile.mp3"
        tileSound.play()
      },

      playWordSound: () => {
        const wordSound = new Audio()
        wordSound.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/wordsubmit.mp3"
        wordSound.play()
      },

      playInvalidWordSound: () => {
        const invalidWordSound = new Audio()
        invalidWordSound.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/invalid.mp3"
        invalidWordSound.play()
      },

      playGameOverSound: () => {
        const gameOver = new Audio()
        gameOver.src = "https://raw.githubusercontent.com/tzip25/wordy-frontend/master/site/public/sounds/buzzer.mp3"
        gameOver.play()
      },


}
