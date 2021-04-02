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
        <main>
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
const creteGameScreen = () =>{}
const removeGameScreen = () =>{}

//EndGameScreen create/remove
const createEndGameScreen = () =>{}
const removeEndGameScreen = () =>{}

//Setting the game state - start or end game
const startGame = () => {
    //removeSplashScreen
    //Si estamos en endGameScreen -- removeEndGameScreen(); si no createGameScreen();

    //Start a new game instance and call start method
    game = new Game(gameScreen);
    // game.start();
}

const endGame = (score, time) => {
    // removeGameScreen();
    // createEndGameScreen(score, time);
}

window.addEventListener("load", createSplashScreen);