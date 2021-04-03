class Element {
    constructor(elements, name, canvas){
        let getElement = elements.filter(el => el.name === name)[0];
        this.name = getElement.name;
        this.foundElement = getElement.foundElement;
        this.combinations = getElement.combinations;
        this.imgSrc = getElement.imgSrc;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.imagePosition = [];
        this.imgSize = 100;
    }   
    
    drawElement(index) {
		const img = document.createElement('img');
		img.src = this.imgSrc;
        let initX = 50;
        let initY = 50;
        
        let newX = initX + (150*index);

        this.imagePosition = [newX, initY]

        img.onload = () => {
            this.ctx.drawImage(img, newX, initY, this.imgSize, this.imgSize);
        };
	}

    didCollide(mouseClick) {
        //get all sides of the img
        const elementLeft = this.imagePosition[0];
        const elementRight = this.imagePosition[0] + this.imgSize;
        const elementTop = this.imagePosition[1];
        const elementBottom = this.imagePosition[1] + this.imgSize;;
    
        // //seleccionamos los 4 laterales del enemigo
        // const enemyLeft = enemy.x;
        // const enemyRight = enemy.x + enemy.size;
        // const enemyTop = enemy.y;
        // const enemyBottom = enemy.y + enemy.size;
    
        //comprobamos si el enemigo ha entrado dentro del jugador por cualquiera de los 4 lados
        const crossLeft = mouseClick[0] <= elementRight && mouseClick[0] >= elementLeft;
        const crossRight = mouseClick[0] >= elementLeft && mouseClick[0] <= elementRight;
        const crossBottom = mouseClick[1] >= elementTop && mouseClick[1] <= elementBottom;
        const crossTop = mouseClick[1] <= elementBottom && mouseClick[1] >= elementTop;
    
        //solo cuando 1 condición de verticalidad y 1 de horizontalidad se cumplen, podemos considerar que nuestros
        //cuadrados han colisionado
        if ((crossLeft || crossRight) && (crossTop || crossBottom)){
            return true;
        } else {
            return false
        }
    
    
      }
}