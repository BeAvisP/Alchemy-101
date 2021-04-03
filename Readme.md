# Alchemy

## Description

Game based on Little Alchemy. The player must combine two different elements to create a new one and find all possible combinations in a limited amount of time. When the player makes a corrent combination XXX point are given but, wrong combinations reduce the remining time by X seconds.

## MVP (DOM - CANVAS)

Single player game, the player must select two elements (click) and combine them in order to find all the elements.

## Backlog

- Create dataset of all the elements (bbdd).
- Implement game logic for the combinations.
- Add background music.
- Create animations for new alements found.
- Bigger database
- Drag and Drop (mouse support + collision)

## Data structure

main.js
```
const game = new Game();
const splashScreen;
const gameScreen;
const endGameScreen; //GameOver or Win screen

createSplashScreen(){}
removeSplashScreen(){}

creteGameScreen(){}
removeGameScreen(){}

createEndGameScreen(){}
removeEndGameScreen(){}

domBuilder(){}
```

game.js
```
Class Game(gameScreen){
    this.canvas;
    this.ctx;
    this.gameScreen;
    this.timeIsOut = false;
    this.score = 0;
    this.discoveredElements = [];
    this.allElements = [];
    this.selectedElements = [];

    start(){}

    endGame(){}

    handleKeyDown(){}

    updateDiscoveredElements(){}

    showClickedElements(){}

    removeClickedElements(){}

    combineElements(){}
}
```

element.js
```
Class Element(){
    this.name = '';
    this.combinations = [];

    drawElement()
    isCombinable(element){} //Check if two elements can combine, return new element
}
```

player.js
```
Class Player {
    this.name;
    this.time;
    this.score;
}
```

timer.js
```
Class Timer {
    this.timeLeft = 180sec;
}
```

Dataset:

  ```
  elementsData = [
      {
          name: 'water',
          combinations: [
              {
                  element: 'fire',
                  result: 'steam'
              },
              {
                  element: 'earth',
                  result: 'mud'
              },
              {
                  element: 'air',
                  result: 'mist'
              }
          ]
      },
      {
          name: 'fire',
          combinations: [
               {
                  element: 'water',
                  result: 'steam'
              },
              {
                  element: 'earth',
                  result: 'lava'
              },
              {
                  element: 'air',
                  result: 'smoke'
              }
          ]
      },
      {
          name: 'air',
          combinations: [
               {
                  element: 'water',
                  result: 'mist'
              },
              {
                  element: 'earth',
                  result: 'dust'
              },
              {
                  element: 'fire',
                  result: 'smoke'
              }
          ]
      },
      {
          name: 'earth',
          combinations: [
               {
                  element: 'water',
                  result: 'mud'
              },
              {
                  element: 'air',
                  result: 'dust'
              },
              {
                  element: 'fire',
                  result: 'lava'
              }
          ]
      }
  ]

  ```

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen / winScreen

## Task

- Element - Define class and properties
- Element - isCombinable
- Main - Define properties
- Main - createSplashScreen
- Main - removeSplashScreen
- Main - createGameScreen
- Main - removeGameScreen
- Main - createEndGameScreen
- Main - removeEndGameScreen
- Main - addEventListeners
- Main - domBuilder
- Game - start
- Game - endGame
- Game - handleKeyDown
- Game - updateDiscoveredElements
- Game - showClickedElements
- Game - removeClickedElements
- Game - combineElements

## Links

### Trello

[Link url](https://trello.com/b/QGzs8d48/game-project)

### Git

URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)

### Slides

URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
