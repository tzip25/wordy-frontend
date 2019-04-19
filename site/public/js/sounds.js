
const sounds = {

      playBombSound: () => {
        const bombSound = new Audio()
        bombSound.src = "https://drive.google.com/uc?export=download&id=1CE0j3fYAEIiQoIP4rvpPHwLk4PnQTnW-"
        bombSound.play()
      },

      playTileSound: () => {
        const tileSound = new Audio()
        tileSound.src = "https://drive.google.com/uc?export=download&id=1ovUdUZoNXAZgGQqvAzkLDg-BiIF5jLl7"
        tileSound.play()
      },

      playWordSound: () => {
        const wordSound = new Audio()
        wordSound.src = "https://drive.google.com/uc?export=download&id=1c-6MhpWIzp947EDqwqSQ9TVDcT__tIpi"
        wordSound.play()
      },

      playInvalidWordSound: () => {
        const invalidWordSound = new Audio()
        invalidWordSound.src = "https://drive.google.com/uc?export=download&id=1B0yae6e8PjIqRJb2NQEZeSuXNKOVQdX8"
        invalidWordSound.play()
      },

      playGameOverSound: () => {
        const gameOver = new Audio()
        gameOver.src = "https://drive.google.com/uc?export=download&id=1WZ5mjXcf5HiqCpyGxfT67GIH49BZOUzc"
        gameOver.play()
      },


}
