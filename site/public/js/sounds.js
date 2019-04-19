
const sounds = {

      playBombSound: () => {
        const bombSound = new Audio()
        bombSound.src = "public/sounds/bomb2.mp3"
        bombSound.play()
      },

      playTileSound: () => {
        const tileSound = new Audio()
        tileSound.src = "public/sounds/tile.mp3"
        tileSound.play()
      },

      playWordSound: () => {
        const wordSound = new Audio()
        wordSound.src = "public/sounds/wordsubmit.mp3"
        wordSound.play()
      },

      playInvalidWordSound: () => {
        const invalidWordSound = new Audio()
        invalidWordSound.src = "public/sounds/invalid.mp3"
        invalidWordSound.play()
      },

      playGameOverSound: () => {
        const gameOver = new Audio()
        gameOver.src = "public/sounds/buzzer.mp3"
        gameOver.play()
      },


}
