class Element {
    constructor(elements, name, canvas){
        let getElement = elements.filter(el => el.name === name)[0];
        this.name = getElement.name;
        this.foundElement = getElement.foundElement;
        this.combinations = getElement.combinations;
        this.imgSrc = getElement.imgSrc;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }   
    
    drawElement(index) {
		const img = document.createElement('img');
		img.src = this.imgSrc;
        let initX = 50;
        let initY = 50;

        img.onload = () => {
            if (index === 0) {
                this.ctx.drawImage(img, initX, initY, 100, 100);
            } else {
                this.ctx.drawImage(img, initX + (150*index), initY, 100, 100);
            }
        };
	}
}