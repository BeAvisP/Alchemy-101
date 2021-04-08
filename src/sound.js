class Sound {
	constructor() {
		this.gameBgm = new Audio("assets/sounds/game-bgm.wav");
		this.splashBgm = new Audio("assets/sounds/splash-bgm.wav");
		this.gameSuccess = new Audio("assets/sounds/game-success.mp3");
		this.gameError = new Audio("assets/sounds/game-error.flac");
		this.gameWin = new Audio("assets/sounds/game-win.wav");
		this.gameLose = new Audio("assets/sounds/game-lose.mp3");
	}

	playSplashBackground() {
		this.splashBgm.currentTime = 0;
		this.splashBgm.volume = 0.1;
		this.splashBgm.loop = true;
		this.splashBgm.play();
	}
	stopSplashBackground() {
		this.splashBgm.pause();
	}

	playGameBackground() {
		this.gameBgm.currentTime = 0;
		this.gameBgm.volume = 0.1;
		this.gameBgm.loop = true;
		this.gameBgm.play();
	}
	stopGameBackground() {
		this.gameBgm.pause();
	}

	playCorrectCombination() {
		this.gameSuccess.currentTime = 0;
		this.gameSuccess.volume = 0.3;
		this.gameSuccess.play();
	}
	stopCorrectCombination() {
		this.gameSuccess.pause();
	}

	playError() {
		this.gameError.currentTime = 0;
		this.gameError.volume = 1.0;
		this.gameError.play();
	}
	stopError() {
		this.gameError.pause();
	}

	playGameWin() {
		this.gameWin.currentTime = 0;
		this.gameWin.volume = 1.0;
		this.gameWin.play();
	}
	stopGameWin() {
		this.gameWin.pause();
	}

	playGameLose() {
		this.gameLose.currentTime = 0;
		this.gameLose.volume = 1.0;
		this.gameLose.play();
	}
	stopGameLose() {
		this.gameLose.pause();
	}
}