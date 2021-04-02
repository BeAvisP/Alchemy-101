let game;
let splashScreen;
let gameScreen;
let endGameScreen;

//Create DOM elements from a string
const buildDom = (htmlString) =>{
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.children[0];
}

//SplashScreen create/remove
const createSplashScreen = () =>{
    //HTML SplashScreen
    splashScreen = buildDom(`
        <main class="splash-screen">
            <h1>My Alchemy Book</h1>
            <div>
                <p>Instructions</p>
            </div>
            <button>Start</button>
        </main>
    `);
    document.body.appendChild(splashScreen);

    //Add eventListener to HTML button
    const startButton = splashScreen.querySelector('button');

    startButton.addEventListener('click', startGame);
}

const removeSplashScreen = () =>{
    splashScreen.remove();
}

//GameScreen create/remove
const createGameScreen = () =>{
    //HTML GameScreen
    gameScreen = buildDom(`
        <main class="game game-container">
            <header>
                <p>My Alchemy Book</p>
            </header>
            <div class="status-container">
                <div class="time-container">
                    <span class="label">Time left:</span>
                    <span class="value"></span>                    
                </div>
                <div class="combinations-container">
                    <span class="label">Combinations:</span>
                    <span class="value"></span>
                    <span class="total"></span>
                </div>
                <div class="score-container">
                    <span class="label">Score:</span>
                    <span class="value"></span>
                </div>
            </div>
            <div class="canvas-container">
                <canvas></canvas>
            </div>            
        </main>
    `);
    document.body.appendChild(gameScreen);

    return gameScreen;
}

const removeGameScreen = () =>{
    gameScreen.remove();
}

//EndGameScreen create/remove
const createEndGameScreen = (score, time) =>{
    const endGameScreen = buildDom(`
    <main>
        <h1>GAME OVER</h1>
        <p>Your score: <span>${score}</span> </p>
        <button>Restart</button>
    </main>
    `);
    document.body.appendChild(endGameScreen);
    
    const button = endGameScreen.querySelector("button");
    button.addEventListener("click", startGame);   
}

const removeEndGameScreen = () =>{
    endGameScreen.remove();
}

//Setting the game state - start or end game
const startGame = () => {
    removeSplashScreen();
    if (endGameScreen) {
        removeEndGameScreen();
    }
    createGameScreen();

    //Start a new game instance and call start method
    game = new Game(gameScreen);
    // game.start();
}

const endGame = (score, time) => {
    removeGameScreen();
    createEndGameScreen(score, time);
}

window.addEventListener("load", createSplashScreen);