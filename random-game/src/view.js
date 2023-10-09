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

  rows;

  columns;

  constructor({ el, width, height, rows, columns }) {
    this.el = el;
    this.width = width;
    this.heigth = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.heigth;

    this.context = this.canvas.getContext("2d");

    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = (this.width * 2) / 3;
    this.playfieldHeight = this.heigth;
    this.playfieldInnerWidth =
      this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeight =
      this.playfieldHeight - this.playfieldBorderWidth * 2;

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHeight / rows;

    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.heigth;

    this.el.appendChild(this.canvas);
  }

  renderMainScreen(state) {
    this.clearScreen();
    this.renderPlayfield(state);
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
      this.heigth / 2
    );
  }

  renderPauseScreen() {
    this.context.fillStyle = "rgba(0, 0, 0, 0.75)";
    this.context.fillRect(0, 0, this.width, this.heigth);
    this.context.fillStyle = "white";
    this.context.font = '24px "Rajdhani"';
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillText(
      "Press SPACE or ENTER to Resume",
      this.width / 2,
      this.heigth / 2
    );
  }

  renderGameOverScreen({ score }) {
    this.clearScreen();
    this.context.fillStyle = "white";
    this.context.font = '24px "Rajdhani"';
    this.context.textAlign = "center";
    this.context.textBaseLine = "middle";
    this.context.fillText("GAME OVER", this.width / 2, this.heigth / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.heigth / 2);
    this.context.fillText(
      `Press ENTER to Restart`,
      this.width / 2,
      this.heigth / 2 + 48
    );
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.heigth);
  }

  renderPlayfield({ playfield }) {
    playfield.forEach((line, y) =>
      line.forEach((block, x) => {
        if (block) {
          this.renderBlock(
            this.playfieldX + x * this.blockWidth,
            this.playfieldY + y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            View.colors[block]
          );
        }
      })
    );

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
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
    console.log(`Результат ${index + 1}: ${score}`);
    });
  }
  /* localStorage */
}
