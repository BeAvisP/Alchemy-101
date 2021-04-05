class Game {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.canvas = null;
        this.ctx = null;
        this.elementsDataset = new ElementsData().elementsList;
        this.timer = new Timer();
        this.player = null;
        this.timerIntervalId;
        this.printTimerId;
        // this.scoreElement = undefined;
        // this.timeElement = undefined;
        this.mouseClickPosition = [];
        this.totalElementsArr = [];
        this.selectedElements = [];
        this.points = 40; //DELETE IN FUTURE -> INCLUDE IN ELEMENTS DATASET AS AN ATTRIBUTE (DIFF ELEMENTS WILL GIVE DIFF POINTS)
        this.status = 'start'; //gameOver (timeout), winGame (all combinations in time)
    }

    start() {
        this.scoreElement = this.gameScreen.querySelector('.score-container .value');
        this.timeElement = this.gameScreen.querySelector('.time-container .value');
        this.combinationsElement = this.gameScreen.querySelector('.combinations-container .value');
        this.totalCombinationsElement = this.gameScreen.querySelector('.combinations-container .total');

        // Get and create the canvas and it's context
        this.canvas = this.gameScreen.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        // Set the canvas dimensions
        this.canvasContainer = this.gameScreen.querySelector(".canvas-container");
        this.containerWidth = (this.canvasContainer.clientWidth/100)*80;
        this.containerHeight = (this.canvasContainer.clientHeight/100)*80;
        this.canvas.setAttribute("width", this.containerWidth);
        this.canvas.setAttribute("height", this.containerHeight);

        // Start timer
        this.timer.start();
        // Print timer
        this.printTimerId = setInterval(() => {
            if (this.timer.timeLeft >= 0) {
                let timeStr = this.timer.getStringTimer();
                this.player.updateTime(this.timer.getStringTimer());
                this.timeElement.innerHTML = timeStr;
            } else if (this.timer.timeLeft < 0) {
                this.timer.stop();
                clearInterval(this.printTimerId);
                this.gameOver();
            }
        }, 1);

        // Create the player.
        this.player = new Player();     

        // Create array of elements from the elements objects dataset
        this.elementsDataset.forEach((el) => {
            this.totalElementsArr.push(new Element(this.elementsDataset, `${el.name}`, this.canvas));
        });

        // Draw all elements + update values HTML values (score and combinations)
        this.updateGameScreen();
        
        // addEventListener left mouse click (select elements)
        this.canvas.addEventListener('click', (event) => {
            this.mouseClickPosition = this.handleMouseDown(this.canvas, event);  
            this.checkElementSelection();      
        });
        // addEventListener right mouse click (combine elements)
        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.combineElements();
        });
    }

    // addEventListener click mouse
    handleMouseDown = (canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return [x, y];
    }

    checkElementSelection() {
        // Loop through the discovered elements and check if one of them has been clicked.
        this.totalElementsArr.filter((el) => el.foundElement).forEach((element) => {
          if (element.didGetClick(this.mouseClickPosition)) {
            //If there's' no previous selectedElements -> push clicked element to array
            if (this.selectedElements.length < 2) {
                this.selectedElements.push(element);
            } else {
                //TODO
                //Update canvas with message??
                console.log("Two elements already selected")
            }
          } 
        });
    }

    combineElements() {
        const [element1, element2] = this.selectedElements;
        if (this.selectedElements.length === 2) {
            if (element1.areCombinable(element2)) {
                let combinedElement = element1.getCombination(element2);
                // Check if combinedElement is new                 
                this.totalElementsArr.filter((el) => {
                    if (el.name === combinedElement){
                        // If element is already discovered -> reduce time left by 10secs.
                        if (el.foundElement) {
                            this.timer.timeLeft = this.timer.timeLeft - 10;
                        // If new -> update foundElement to true + update player score.
                        } else {
                            el.foundElement = true;
                            this.player.updateScore(this.points);
                            this.updateGameScreen();
                        }                        
                    }
                }); 
            } else {
                //Wrong combination discount time
                this.timer.timeLeft = this.timer.timeLeft - 20;
                this.player.updateTime(this.timer.getStringTimer());
            }
            //Clear selection
            this.selectedElements = [];
        } else {
            console.log("Select two elements!!!")
        }
    }

    updateGameScreen() {
        //Clear and redraw canvas 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.totalElementsArr.forEach((el, index) => el.drawElement(index));
        
        //Update combinations counter
        let elementsFound = this.totalElementsArr.filter((el) => el.foundElement).length;
        this.combinationsElement.innerHTML = elementsFound;
        this.totalCombinationsElement.innerHTML = this.totalElementsArr.length;
        
        //Update player elementsFound 
        this.player.updateElementsFound(elementsFound);
        
        //Update player score in HTML
        this.scoreElement.innerHTML = this.player.score;
    }

    gameOver() {
        this.status = 'gameOver';
        this.player.updateTime('00:00');
        endGame(this.player);
    }
}