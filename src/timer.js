class Timer {
  constructor() {
    this.timeLeft = 240; //seconds
    this.intervalId;
  }

  start() {
    this.intervalId = setInterval(this.update.bind(this), 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  update() {
    this.timeLeft = this.timeLeft - 1;
  }

  getMinutes() {
    return Math.floor(this.timeLeft / 60);
  }

  getSeconds() {
    return Math.floor(this.timeLeft - this.getMinutes() * 60);
  }

  formatTimer(time) {
    return time === 0 ? "00" : time > 0 && time < 10 ? "0" + time : "" + time;
  }

  getStringTimer() {
    return `${this.formatTimer(this.getMinutes())}:${this.formatTimer(
      this.getSeconds()
    )}`;
  }
}
