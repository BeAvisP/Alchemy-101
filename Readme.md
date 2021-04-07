# Alchemy

## Description

Game based on Little Alchemy. The player must combine two different elements to create a new one and find all possible combinations in a limited amount of time. When the player makes a corrent combination XXX point are given but, wrong combinations reduce the remining time by X seconds.

## MVP (DOM - CANVAS)

Single player game, the player must select two elements (click) and combine them in order to find all the elements.

## Backlog

- Points system adjust depending on the element discover.
- Paginate between canvas to show more elements.
- Create dataset of all the elements (bbdd).
- Create animations for new alements found.
- Drag and Drop (mouse support + collision)

##  Data structure

### main.js
```
const game = new Game();
const splashScreen;
const gameScreen;
const endGameScreen; //GameOver or Win screen

domBuilder(){}

createSplashScreen(){}
removeSplashScreen(){}

creteGameScreen(){}
removeGameScreen(){}

createEndGameScreen(){}
removeEndGameScreen(){}

startGame(){}
endGame(){}
```

### game.js
```
Class Game(gameScreen){
  this.gameScreen = gameScreen;
  this.canvas = null;
  this.ctx = null;
  this.elementsDataset = new ElementsData().elementsList;
  this.timer = new Timer();
  this.player = null;
  this.timerIntervalId;
  this.printTimerId;
  this.scoreElement = undefined;
  this.timeElement = undefined;
  this.combinationsElement = undefined;
  this.totalCombinationsElement = undefined;
  this.modalCanvas = undefined;
  this.mouseClickPosition = [];
  this.totalElementsArr = [];
  this.selectedElements = [];
  this.points = 40;

  start(){}

  handleKeyDown(){}

  checkElementSelection(){}

  combineElements(){}

  updateGameScreen(){}

  showModal(){}

  checkFoundAll(){}

  gameOver(){}    
}
```

### element.js
```
Class Element(){
  let getElement = elements.filter((el) => el.name === name)[0];

  this.name = getElement.name;
  this.foundElement = getElement.foundElement;
  this.combinations = getElement.combinations;
  this.imgSrc = getElement.imgSrc;

  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.imagePosition = [];
  this.imgSize = 100;
  this.initX = 50;
  this.initY = 50;

  drawElement(){}
  
  drawSelection(){}
  
  didGetClick(){}

  areCombinable(element){}

  getCombination(element){}
}
```

### player.js
```
Class Player {
  this.name = name;
  this.time = '';
  this.score = 0;
  this.elementsFound = 0;

  updateScore(points){}

  updateElementsFound(foundElements){}

  updateTime(timeStr){}
}
```

### timer.js
```
Class Timer {
  this.timeLeft = 180sec;
  this.intervalId;

  start(){}

  stop(){}

  update(){}

  getMinutes(){}

  getSeconds(){}

  formatTimer(){}

  getStringTimer(){}
}
```

### Dataset:

```
elementsList = [
  {
    name: "water",
    foundElement: true,
    imgSrc: "assets/images/water.png",
    combinations: [
      {
        element: "fire",
        result: "steam",
      },
      {
        element: "earth",
        result: "mud",
      },
      {
        element: "air",
        result: "mist",
      },
    ],
  },
  {
    name: "fire",
    foundElement: true,
    imgSrc: "assets/images/fire.png",
    combinations: [
      {
        element: "water",
        result: "steam",
      },
      {
        element: "earth",
        result: "lava",
      },
      {
        element: "air",
        result: "smoke",
      },
    ],
  },
  {
    name: "air",
    foundElement: true,
    imgSrc: "assets/images/air.png",
    combinations: [
      {
        element: "water",
        result: "mist",
      },
      {
        element: "earth",
        result: "dust",
      },
      {
        element: "fire",
        result: "smoke",
      },
    ],
  },
  {
    name: "earth",
    foundElement: true,
    imgSrc: "assets/images/earth.png",
    combinations: [
      {
        element: "water",
        result: "mud",
      },
      {
        element: "air",
        result: "dust",
      },
      {
        element: "fire",
        result: "lava",
      },
    ],
  },
  {
    name: "steam",
    foundElement: false,
    imgSrc: "assets/images/steam.png",
    combinations: [],
  },
  { 
    name: "mud",
    foundElement: false,
    imgSrc: "assets/images/mud.png",
    combinations: [],
  },
  {
    name: "mist",
    foundElement: false,
    imgSrc: "assets/images/mist.png",
    combinations: [],
  },
  {
    name: "lava",
    foundElement: false,
    imgSrc: "assets/images/lava.png",
    combinations: [],
  },
  {
    name: "smoke",
    foundElement: false,
    imgSrc: "assets/images/smoke.png",
    combinations: [],
  },
  {
    name: "dust",
    foundElement: false,
    imgSrc: "assets/images/dust.png",
    combinations: [],
  }
]
```

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- endGameScreen

## Links

### Trello

[Link url](https://trello.com/b/QGzs8d48/game-project)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/BeAvisP/my-alchemy-game) || 
[Link Deploy](http://github.com)

### Slides

URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
