class Player {
    constructor(name){
        this.name = name;
        this.time = '';
        this.score = 0;
        this.elementsFound = 0;
    }

    updateScore(points) {
        this.score += points;
    }

    updateElementsFound(foundElements){
        this.elementsFound = foundElements;
    }

    updateTime(timeStr) {
        this.time = timeStr;
    }
}