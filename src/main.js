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
const createSplashScreen = () =>{}
const removeSplashScreen = () =>{}

//GameScreen create/remove
const creteGameScreen = () =>{}
const removeGameScreen = () =>{}

//EndGameScreen create/remove
const createEndGameScreen = () =>{}
const removeEndGameScreen = () =>{}

window.addEventListener("load", createSplashScreen);