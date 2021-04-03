class Game {
    constructor(gameScreen) {
        this.canvas = null;
        this.ctx = null;
        this.player = null;
        this.gameScreen = gameScreen;
        this.scoreElement = undefined;
        this.timeElement = undefined;
        this.discoveredElements = [];
        this.totalElements = new ElementsData().elementsList;
        this.selectedElements = [];
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
        this.containerWidth = this.canvasContainer.clientWidth;
        this.containerHeight = this.canvasContainer.clientHeight;
        this.canvas.setAttribute("width", this.containerWidth);
        this.canvas.setAttribute("height", this.containerHeight);

        // this.player = new Player();       

        // Create basic elements - water, fire, air, earth
        const water = new Element(this.totalElements, 'water', this.canvas);
        const fire = new Element(this.totalElements, 'fire',  this.canvas);
        const air = new Element(this.totalElements, 'air',  this.canvas);
        const earth = new Element(this.totalElements, 'earth',  this.canvas);

        this.discoveredElements.push(water, fire, air, earth);        

        this.discoveredElements.forEach((el, index) => {
            el.drawElement(index);
        });

        // Show all available elements - 

        // addEventListener click mouse
        const getCursorPosition = (canvas, event) => {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            console.log("x: " + x + " y: " + y)
        }
        
        this.canvas.addEventListener('mousedown', (e) => {
            getCursorPosition(this.canvas, e);
        });


        //this.startLoop()
    }
}