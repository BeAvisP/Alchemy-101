class Element {
    constructor(elements, name, canvas){
        let getElement = elements.filter(el => el.name === name)[0];

        console.log(elements.filter(el => el.name === name)[0]);
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
    }      
    
    drawElement(index) {
        const img = document.createElement('img');
        if (this.foundElement) {
            img.src = this.imgSrc;
        } else {
            img.src = "/assets/images/uncertainty.png"
        }
		
        let newX = this.initX + (150*index);
        let newY = this.initY;
        
        //TODO
        //if newX will collide with canvas edge --> modify Y and X value
        if (this.isOutOfCanvas(newX + this.imgSize)) {
            newX = this.initX;
            newY = this.initY + 150;
        }

        this.imagePosition = [newX, newY]

        img.onload = () => {
            this.ctx.drawImage(img, newX, newY, this.imgSize, this.imgSize);
        };

        //Update newX value for next drawElement()
        this.newX = this.newX + 150;
	}

    isOutOfCanvas(imgX) {
        const screenRight = this.canvas.width;
        if (screenRight <= imgX){
            return true;
        }
        return false;
      }

    didGetClick(mouseClick) {
        //Get all sides of the img
        const elementLeft = this.imagePosition[0];
        const elementRight = this.imagePosition[0] + this.imgSize;
        const elementTop = this.imagePosition[1];
        const elementBottom = this.imagePosition[1] + this.imgSize;
    
        //Check if mouseClick has clicked the element image.
        const crossLeft = mouseClick[0] <= elementRight && mouseClick[0] >= elementLeft;
        const crossRight = mouseClick[0] >= elementLeft && mouseClick[0] <= elementRight;
        const crossBottom = mouseClick[1] >= elementTop && mouseClick[1] <= elementBottom;
        const crossTop = mouseClick[1] <= elementBottom && mouseClick[1] >= elementTop;

        if ((crossLeft || crossRight) && (crossTop || crossBottom)){
            return true;
        } else {
            return false
        }   
    }

    areCombinable(element) {
        console.log("Checking!")
        let canCombine = false;
        this.combinations.forEach(combination => {            
            if (combination.element === element.name) {
                console.log(combination.result);
                canCombine = true;
            }
        });
        return canCombine;
    }

    getCombination(element) {
        return this.combinations.filter(combination => combination.element === element.name)
        .map(combination => combination.result);
    }
}