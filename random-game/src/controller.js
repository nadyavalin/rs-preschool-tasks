import { saveScore } from "./helpers.js";

export default class Controller {
  game;

  view;

  isPlaying = false;

  intervalID = null;

  constructor(game, view) {
    this.game = game;
    this.view = view;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));

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
      saveScore(state.score);
      this.stopTimer();
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

    switch (event.key) {
      case "Enter":
        if (state.isGameOver) {
          this.reset();
        } else {
          this.play();
        }
        break;

      case " ":
        if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;

      case "ArrowLeft":
        if (!state.isGameOver) {
          this.game.moveFigureLeft();
          this.updateView();
        }
        break;

      case "ArrowUp":
        if (!state.isGameOver) {
          this.game.rotateFigure();
          this.updateView();
        }
        break;

      case "ArrowRight":
        if (!state.isGameOver) {
          this.game.moveFigureRight();
          this.updateView();
        }
        break;

      case "ArrowDown":
        if (!state.isGameOver) {
          this.game.moveFigureDown();
          this.updateView();
        }
        break;
      default:
    }
  }

  processDownKeyPress() {
    if (!this.isPlaying) {
      return;
    }

    this.stopTimer();
    this.game.moveFigureDown();
    this.updateView();
    this.startTimer();
  }
}
