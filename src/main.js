let game;
let splashScreen;
let gameScreen;
let endGameScreen;
const sound = new Sound();

//Create DOM elements from a string
const buildDom = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.children[0];
};

//SplashScreen create/remove
const createSplashScreen = () => {
    sound.playSplashBackground();
  //HTML SplashScreen
  splashScreen = buildDom(`
        <main class="splash-screen">
            <h1>Alchemy 101</h1>
            <div class="game-info">
              <p>Enter the virtual laboratory and learn the art of transmutation.</p>
              <div class="game-instructions">
                  <div>
                    <img class="info-img" src="assets/images/left-click.png" />
                    <p>Select two elements</p>
                  </div>
                  <div>
                    <img class="info-img" src="assets/images/right-click.png" />
                    <p>Combine to create a new one</p>
                  </div>
              </div>
            </div>
            <div class="game-start">
                <form>
                <input id="name" type="text" autocomplete="off" placeholder="Enter your name" required>
                <button>Start</button>
                </form>
            </div>
        </main>
    `);
  document.body.appendChild(splashScreen);

  //Add eventListener to HTML button
  const startButton = splashScreen.querySelector("button");

  startButton.addEventListener("click", startGame);
};

const removeSplashScreen = () => {
  splashScreen.remove();
};

//GameScreen create/remove
const createGameScreen = () => {
  //HTML GameScreen
  gameScreen = buildDom(`
        <main class="game game-container">
            <div class="status-container noselect">
                <div class="time-container">
                    <span class="label">Time left:</span>
                    <span class="value"></span>                    
                </div>
                <div class="combinations-container">
                    <span class="label">Combinations:</span>
                    <span class="value"></span> / 
                    <span class="total"></span>
                </div>
                <div class="score-container">
                    <span class="label">Score:</span>
                    <span class="value">0</span>
                </div>
            </div>
            <div class="canvas-container">
                <canvas></canvas>
                <div class="modal-canvas">
                    <p class="message"></p>
                    <img class="new-element" src="" />
                    <div class="combination">
                        <img class="first-element" src="" />
                        <img class="sum-element" src="assets/images/plus.png" />
                        <img class="second-element" src="" />
                    </div>
                </div>
            </div>            
        </main>
    `);
  document.body.appendChild(gameScreen);

  return gameScreen;
};

const removeGameScreen = () => {
  gameScreen.remove();
};

//EndGameScreen create/remove
const createEndGameScreen = (status, player) => {
    if (status === 'win') {
        sound.playGameWin();
    } else if (status === 'lose'){
        sound.playGameLose();
    }

    //TODO PLAY SPLASH BACKGROUND MUSIC

  const gameData = JSON.parse(localStorage.getItem("gameData"));
  endGameScreen = buildDom(`
    <main class="end-screen">
      <h1>YOU ${status.toUpperCase()}</h1>
      <div class="end-screen-info">
        <div class="end-score">
          <p>You found ${player.elementsFound} elements!!</p>
          <p>Your score: <span>${player.score}</span> </p>
          <p>Time left: ${player.time}</p>
        </div>
        <h2>Ranking</h2>
        <ol id="ranking-list"></ol>
        </div>
        <button>Restart</button>
    </main>
    `);

  const button = endGameScreen.querySelector("button");
  button.addEventListener("click", startGame);

  //Order gameData by Score and get the top 5
  let sortedData = gameData.sort((a, b) => b.score - a.score || b.time.localeCompare(a.time)).splice(0, 5);
  let rankingTable = endGameScreen.querySelector("#ranking-list");

  for (let i = 0; i < sortedData.length; i++) {
    var newLi = document.createElement("li");
    newLi.innerHTML = `${sortedData[i].name} - Score: ${sortedData[i].score} - Elements found: ${sortedData[i].elementsFound} - Time left: ${sortedData[i].time}`;
    rankingTable.appendChild(newLi);
  }

  document.body.appendChild(endGameScreen);
};

const removeEndGameScreen = () => {
  endGameScreen.remove();
};

//Setting the game state - start or end game
const startGame = () => {
    let name = splashScreen.querySelector("#name");
    if (name.value !== "") {
        sound.stopSplashBackground();
        sound.playGameBackground();
      removeSplashScreen();
      if (endGameScreen) {
        removeEndGameScreen();
      }
      createGameScreen();
    
      //Start a new game instance and call start method
      game = new Game(gameScreen, name.value);
      game.start();
    }
};

const endGame = (status, player) => {
    sound.stopGameBackground();
  removeGameScreen();
  createEndGameScreen(status, player);
};

window.addEventListener("load", createSplashScreen);
