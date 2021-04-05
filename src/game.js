class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.player = null;
        this.gameScreen = gameScreen;
        this.scoreElement = undefined;
        this.timeElement = undefined;
        this.totalElementsArr = [];
        this.elementsDataset = new ElementsData().elementsList;
        this.timer = new Timer();
        this.timerIntervalId;
        this.printTimerId;
        this.selectedElements = [];
        this.mouseClickPosition = [];
        this.status = 'start'; //gameOver (timeout), winGame (all combinations in time)
        this.points = 40;
    }

    //Create `ctx`, a `player` and start the Canvas loop
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

        //Start timer
        this.timer.start();
        //Print timer
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

        this.player = new Player();     

        //Create array of elements with the elements dataset
        this.elementsDataset.forEach((el) => {
            this.totalElementsArr.push(new Element(this.elementsDataset, `${el.name}`, this.canvas));
        });

        this.combinationsElement.innerHTML = this.totalElementsArr.filter((el) => el.foundElement).length;
        this.totalCombinationsElement.innerHTML = this.totalElementsArr.length;

        //Draw all elements, undiscovered will show an incognito icon.
        this.totalElementsArr.forEach((el, index) => el.drawElement(index));

        // addEventListener click mouse
        const handleMouseDown = (canvas, event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            return [x, y];
        }
        
        this.canvas.addEventListener('click', (event) => {
            this.mouseClickPosition = handleMouseDown(this.canvas, event);
            console.log(this.mouseClickPosition);    
            this.checkElementSelection();      
        });

        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.combineElements();
        });

        //TODO - es necesario?
        // this.startLoop();
    }

    checkElementSelection() {
        //this.discoveredElements has all the discovered elements we found during the game.
        //Loop the array to check if any of the element img was clicked with right mouse button
        this.totalElementsArr.forEach((element) => {
          if (element.didGetClick(this.mouseClickPosition)) {
            //If there're no previous selectedElements -> push clicked element to array
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
        if (this.selectedElements.length === 2) {
            console.log("Check if elements can be combined");
            console.log(this.selectedElements);
            if (this.selectedElements[0].areCombinable(this.selectedElements[1])) {
                console.log("crea nuevo elemento!")
                let element = this.selectedElements[0].getCombination(this.selectedElements[1]);
                
                //TODO refactor to new method???
                //Check if element isn't found yet and update to true + update player score
                this.totalElementsArr.filter((el) => {
                    if (el.name === element){
                        if (el.foundElement) {
                            //Descontar tiempo
                            this.timer.timeLeft = this.timer.timeLeft - 10;
                        } else {
                            el.foundElement = true;
                            this.player.updateScore(this.points);
                        }                        
                    }
                });              

                //clear canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                //Redraw elements array in canvas
                this.totalElementsArr.forEach((el, index) => el.drawElement(index));
                //Update combinations counter
                let elementsFound = this.totalElementsArr.filter((el) => el.foundElement).length;
                this.combinationsElement.innerHTML = elementsFound;
                
                this.player.updateElementsFound(elementsFound);

                this.scoreElement.innerHTML = this.player.score;

                //Clear selection
                this.selectedElements = [];
            } else {
                //Clear selection
                this.selectedElements = [];
                //Wrong combination discount time
                this.timer.timeLeft = this.timer.timeLeft - 20;
                this.player.updateTime(this.timer.getStringTimer());
            }
        } else {
            console.log("Select two elements!!!")
        }
    }

    gameOver() {
        this.status = 'gameOver';
        endGame(this.player);
    }
}