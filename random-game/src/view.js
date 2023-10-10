export default class View {
  static colors = {
    1: "cyan",
    2: "blue",
    3: "orange",
    4: "yellow",
    5: "green",
    6: "purple",
    7: "red",
  };

  el;

  width;

  height;

  constructor({ el, width, height, rows, columns }) {
    this.el = el;
    this.width = width;
    this.height = height;

    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    this.context = canvas.getContext("2d");

    this.playFieldBorderWidth = 4;
    this.playFieldX = this.playFieldBorderWidth;
    this.playFieldY = this.playFieldBorderWidth;
    this.playFieldWidth = (this.width * 2) / 3;
    this.playFieldHeight = this.height;
    
    const playFieldInnerWidth = this.playFieldWidth - this.playFieldBorderWidth * 2;
    const playFieldInnerHeight = this.playFieldHeight - this.playFieldBorderWidth * 2;

    this.blockWidth = playFieldInnerWidth / columns;
    this.blockHeight = playFieldInnerHeight / rows;

    this.panelX = this.playFieldWidth + 10;
    this.panelY = 0;

    this.el.appendChild(canvas);
  }

  renderMainScreen(state) {
    this.clearScreen();
    this.renderPlayField(state);
    this.renderPanel(state);
  }

  renderStartScreen() {
    this.context.fillStyle = "white";
    this.context.font = '24px "Rajdhani"';
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillText(
      "Press ENTER to Start",
      this.width / 2,
      this.height / 2
    );
  }

  renderPauseScreen() {
    this.context.fillStyle = "rgba(0, 0, 0, 0.75)";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = "white";
    this.context.font = '24px "Rajdhani"';
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillText(
      "Press SPACE to Resume",
      this.width / 2,
      this.height / 2
    );
  }

  renderGameOverScreen({ score }) {
    this.clearScreen();
    this.context.fillStyle = "white";
    this.context.font = '24px "Rajdhani"';
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    this.context.fillText(
      `Press ENTER to Restart`,
      this.width / 2,
      this.height / 2 + 48
    );
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderPlayField({ playField }) {
    playField.forEach((line, y) =>
      line.forEach((block, x) => {
        if (block) {
          this.renderBlock(
            this.playFieldX + x * this.blockWidth,
            this.playFieldY + y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            View.colors[block]
          );
        }
      })
    );

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playFieldBorderWidth;
    this.context.strokeRect(0, 0, this.playFieldWidth, this.playFieldHeight);
  }

  renderPanel({ level, score, lines, nextFigure }) {
    this.context.textAlign = "start";
    this.context.textBaseLine = "top";
    this.context.fillStyle = "white";
    this.context.font = '24px "Rajdhani"';

    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 25);
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 50);
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 75);
    this.context.fillText("Next:", this.panelX, this.panelY + 120);

    nextFigure.blocks.forEach((row, y) =>
      row.forEach((block, x) => {
        if (block) {
          this.renderBlock(
            this.panelX + x * this.blockWidth * 0.5,
            this.panelY + 120 + y * this.blockHeight * 0.5,
            this.blockWidth * 0.5,
            this.blockHeight * 0.5,
            View.colors[block]
          );
        }
      })
    );
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "white";
    this.context.lineWidth = 2;
    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }

  /* localStorage */
  setItemToLocalStorage(key, value) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  getItemFromLocalStorage(key) {
    return JSON.parse(this.localStorage.getItem(key));
  }

  addScore(score) {
    const scores = this.getItemFromLocalStorage('score');
    if (score !== 0) {
      scores.push(score);
    }
    this.setItemToLocalStorage('scores', scores);
  }

  saveScore(score) {
    const scores = this.getItemFromLocalStorage('scores') || [];
    scores.push(score);
    this.setItemToLocalStorage('scores', scores);
  }

  renderScores() {
    const scores = this.getItemFromLocalStorage('scores') || [];
    scores.forEach((score, index) => {
    console.log(`Result ${index + 1}: ${score}`);
    });
  }
  /* localStorage */
}
