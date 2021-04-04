class Timer {
    constructor() {
        this.timeLeft = 60; //seconds
    }

    start() {
        return setInterval(this.update, 1000);
    }

    stop(intervalId) {
        cancelInterval(intervalId);
    }

    update(){
        this.timeLeft = this.timeLeft - 1;
        if(this.timeLeft >= 0)
            console.log(this.timeLeft);
        else {
            console.log("Timeout");
        }
    }
}