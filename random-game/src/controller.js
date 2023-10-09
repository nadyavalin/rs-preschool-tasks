export default class Controller {
  game;

  view;

  isPlaying = false;
  
  intervalID = null;

  constructor(game, view) {
    this.game = game;
    this.view = view;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.moveFigureDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.view.renderGameOverScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    if (!this.intervalID) {
      this.intervalID = setInterval(
        () => {
          this.update();
        },
        speed > 0 ? speed : 100
      );
    }
  }

  stopTimer() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  handleKeyDown(event) {
    const state = this.game.getState();

    switch (event.keyCode) {
      case 13: // ENTER
        if (state.isGameOver) {
          this.reset();
        } else {
          this.play();
        }
        break;

      case 32: // SPACE
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
        
      case 37: // Left arrow
        this.game.moveFigureLeft();
        this.updateView();
        break;
      case 38: // Up arrow
        this.game.rotateFigure();
        this.updateView();
        break;
      case 39: // Right arrow
        this.game.moveFigureRight();
        this.updateView();
        break;
      case 40: // Down arrow
        this.stopTimer();
        this.game.moveFigureDown();
        this.updateView();
        break;
      default:
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 40: // Down arrow
        this.startTimer();
        break;
      default:
    }
  }
}
