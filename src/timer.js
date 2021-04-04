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

    getMinutes(){
        return Math.floor(this.timeLeft / 60);
    }

    getSeconds(){
        return Math.floor(this.timeLeft - this.getMinutes()*60);
    }

    formatTimer(time) {
        return time === 0 ? "00" : time > 0 && time < 10 ? "0" + time : "" + time;
    }

    getStringTimer(){
        return `${this.formatTimer(this.getMinutes())}:${this.formatTimer(this.getSeconds())}`;        
    }
}