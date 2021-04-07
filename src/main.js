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
            <div class="status-container">
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
                        <img class="sum-element" src="/assets/images/plus.png" />
                        <img class="second-element" src="" />
                    </div>
                </div>
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
const createEndGameScreen = (status, player) =>{
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    endGameScreen = buildDom(`
    <main class="end-screen">
        <h1>YOU ${status.toUpperCase()}</h1>
        <p>You found ${player.elementsFound} elements!!</p>
        <p>Your score: <span>${player.score}</span> </p>
        <p>Time left: ${player.time}</p>
        <h2>Ranking</h2>
        <ol id="ranking-list"></ol>
        <button>Restart</button>
    </main>
    `);
    
    const button = endGameScreen.querySelector("button");
    button.addEventListener("click", startGame);   
    
    //Order gameData by Score and get the top 5  
    let sortedData = gameData.sort(( a, b ) => (b.score - a.score)).splice(0,5);
    let rankingTable = endGameScreen.querySelector("#ranking-list");

    for (let i = 0; i < sortedData.length; i++) {
        var newLi = document.createElement("li");
        newLi.innerHTML = `Score: ${sortedData[i].score} - Elements found: ${sortedData[i].elementsFound} - Time left: ${sortedData[i].time}`;
        rankingTable.appendChild(newLi);
    }

    document.body.appendChild(endGameScreen);
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
    game.start();   
}

const endGame = (status, player) => {
    removeGameScreen();
    createEndGameScreen(status, player);
}

window.addEventListener("load", createSplashScreen);