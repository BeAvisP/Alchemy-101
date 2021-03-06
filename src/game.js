class Game {
  constructor(gameScreen, playerName) {
    this.gameScreen = gameScreen;
    this.playerName = playerName;
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
    this.points = 40; //DELETE IN FUTURE -> INCLUDE IN ELEMENTS DATASET AS AN ATTRIBUTE (DIFF ELEMENTS WILL GIVE DIFF POINTS)
    this.sound = new Sound();
  }

  start() {
    this.scoreElement = this.gameScreen.querySelector(
      ".score-container .value"
    );
    this.timeElement = this.gameScreen.querySelector(".time-container .value");
    this.combinationsElement = this.gameScreen.querySelector(
      ".combinations-container .value"
    );
    this.totalCombinationsElement = this.gameScreen.querySelector(
      ".combinations-container .total"
    );
    this.modalCanvas = this.gameScreen.querySelector(".modal-canvas");

    // Get and create the canvas and it's context
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set the canvas dimensions
    this.canvasContainer = this.gameScreen.querySelector(".canvas-container");
    this.containerWidth = (this.canvasContainer.clientWidth / 100) * 80;
    this.containerHeight = (this.canvasContainer.clientHeight / 100) * 80;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    // Start timer
    this.timer.start();
    // Print timer
    this.printTimerId = setInterval(() => {
      if (this.timer.timeLeft <= 30) {
        this.timeElement.classList.add("warning");
      }
      if (this.timer.timeLeft >= 0) {
        let timeStr = this.timer.getStringTimer();
        this.player.updateTime(this.timer.getStringTimer());
        this.timeElement.innerHTML = timeStr;
      } else if (this.timer.timeLeft < 0) {
        this.timer.stop();
        clearInterval(this.printTimerId);
        this.gameOver("lose");
      }
    }, 1);

    // Create the player.
    this.player = new Player(this.playerName);

    // Create array of elements from the elements objects dataset
    this.elementsDataset.forEach((el) => {
      this.totalElementsArr.push(
        new Element(this.elementsDataset, `${el.name}`, this.canvas)
      );
    });

    // Draw all elements + update values HTML values (score and combinations)
    this.updateGameScreen();

    // addEventListener left mouse click (select elements)
    this.canvas.addEventListener("click", (event) => {
      this.mouseClickPosition = this.handleMouseDown(this.canvas, event);
      this.checkElementSelection();
    });
    // addEventListener right mouse click (combine elements)
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.combineElements();
    });
  }

  // get mouse click position
  handleMouseDown = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  };

  checkElementSelection() {
    // Loop through the discovered elements and check if one of them has been clicked.
    this.totalElementsArr
      .filter((el) => el.foundElement)
      .forEach((element) => {
        if (element.didGetClick(this.mouseClickPosition)) {
          //If there's' no previous selectedElements -> push clicked element to array
          if (this.selectedElements.length < 2) {
            this.selectedElements.push(element);
            // //Draw circle with blur arround img on selected
            element.drawSelection();
          } else {
            // Show error in modal-canvas div
            let message = "You have two elements. <br> Right click to combine.";
            this.showModal("error", message);
          }
        }
      });
  }

  combineElements() {
    const [element1, element2] = this.selectedElements;
    let message = "";
    if (this.selectedElements.length === 2) {
      if (element1.areCombinable(element2)) {
        let combinedElement = element1.getCombination(element2);
        // Check if combinedElement is new
        this.totalElementsArr.filter((el) => {
          if (el.name === combinedElement) {
            // If element is already discovered -> reduce time left by 10secs.
            if (el.foundElement) {
              this.timer.timeLeft = this.timer.timeLeft - 10;
              // Show error in modal-canvas div
              message = `${el.name.toUpperCase()} already discovered. <br> - 10 seconds`;
              this.showModal("error", message, el);
              this.timeElement.classList.add("error");
              setTimeout(() => {
                this.timeElement.classList.remove("error");
              }, 1000);
              // If new -> update foundElement to true + update player score.
            } else {
              el.foundElement = true;
              this.player.updateScore(this.points);
              // Display discovered element in modal-canvas div
              message = `You've discovered ${el.name.toUpperCase()}`;
              this.showModal("correct", message, el, element1, element2);
              //TODO
              //Check if all the elements are found + call gameOver + status win
              if (this.checkFoundAll()) {
                let elementsFound = this.totalElementsArr.filter(
                  (el) => el.foundElement
                ).length;
                this.player.updateElementsFound(elementsFound);
                setTimeout(this.gameOver.bind(this), 4000, "win");
              }
            }
          }
        });
        // Clear elements selection
        this.selectedElements = [];
        this.updateGameScreen();
      } else {
        //Wrong combination discount time
        this.timer.timeLeft = this.timer.timeLeft - 20;
        this.player.updateTime(this.timer.getStringTimer());

        // Show error in modal-canvas div
        this.timeElement.classList.add("error");
        setTimeout(() => {
          this.timeElement.classList.remove("error");
        }, 1000);
        message = `${element1.name.toUpperCase()} and ${element2.name.toUpperCase()} <br> can't be combined. <br> - 20 seconds`;
        this.showModal("error", message);
      }
      // Clear elements selection
      this.selectedElements = [];
      this.updateGameScreen();
    } else {
      // Show error in modal-canvas div
      message = "Select two elements <br> before combine!";
      this.showModal("error", message);
    }
  }

  updateGameScreen() {
    //Clear and redraw canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let yRow = 0;
    this.totalElementsArr.forEach((el, index) => {
      if (index % 5 === 0) {
        yRow++;
      }
      el.drawElement(index, yRow);
    });

    //Update combinations counter
    let elementsFound = this.totalElementsArr.filter((el) => el.foundElement)
      .length;
    this.combinationsElement.innerHTML = elementsFound;
    this.totalCombinationsElement.innerHTML = this.totalElementsArr.length;

    //Update player elementsFound
    this.player.updateElementsFound(elementsFound);

    //Update player score in HTML
    this.scoreElement.innerHTML = this.player.score;
  }

  showModal(type, message, newElement, element1, element2) {
    if (type === "error") {
      this.sound.playError();
      this.modalCanvas.classList.add("error");
      this.modalCanvas.querySelector(".message").innerHTML = message;
      if (newElement) {
        this.modalCanvas.querySelector(".new-element").src = newElement.imgSrc;
      } else {
        this.modalCanvas.querySelector(".new-element").src =
          "assets/images/error.png";
      }
    } else if (type === "correct") {
      this.sound.playCorrectCombination();
      this.modalCanvas.classList.add("correct");
      this.modalCanvas.querySelector(".combination").style.visibility =
        "visible";
      this.modalCanvas.querySelector(".message").innerHTML = message;
      this.modalCanvas.querySelector(".new-element").src = newElement.imgSrc;
      this.modalCanvas.querySelector(".first-element").src = element1.imgSrc;
      this.modalCanvas.querySelector(".second-element").src = element2.imgSrc;
    }
    this.modalCanvas.style.visibility = "visible";
    setTimeout(() => {
      this.sound.stopCorrectCombination();
      this.sound.stopError();
      this.modalCanvas.querySelector(".combination").style.visibility =
        "hidden";
      this.modalCanvas.classList.remove("error");
      this.modalCanvas.classList.remove("correct");
      this.modalCanvas.style.visibility = "hidden";
      this.modalCanvas.querySelector(".new-element").src = "";
      this.modalCanvas.querySelector(".first-element").src = "";
      this.modalCanvas.querySelector(".second-element").src = "";
    }, 4000);
  }

  checkFoundAll() {
    return (
      this.totalElementsArr.filter((el) => el.foundElement).length ===
      this.totalElementsArr.length
    );
  }

  //Save data in localStorage to create ranking
  saveGameData(player) {
    // Get the string data from localStorage and create an array with the data stored
    let gameDataArr;
    const gameDataStr = localStorage.getItem("gameData");
    const newGameData = {
      name: player.name,
      elementsFound: player.elementsFound,
      score: player.score,
      time: player.time,
    };

    // If localStorage is empty, create empty array + add data
    if (!gameDataStr) {
      gameDataArr = [];
      gameDataArr.push(newGameData);
      // If localStorage has data, parse data then add new data
    } else if (gameDataStr) {
      gameDataArr = JSON.parse(gameDataStr);
      gameDataArr.push(newGameData);
    }

    // Stringify gameDataArr
    const updateGameDataStr = JSON.stringify(gameDataArr);
    // Store back in localStorage
    localStorage.setItem("gameData", updateGameDataStr);
  }

  gameOver(status) {
    if (status === "lose") {
      this.player.updateTime("00:00");
    }
    this.saveGameData(this.player);
    endGame(status, this.player);
  }
}
