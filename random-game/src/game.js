export default class Game {
  static points = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
  };

  score;

  lines;

  topOut;
  
  playfield;
  
  activeFigure;
  
  nextFigure;

  constructor() {
    this.reset();
  }

  get level() {
    return Math.floor(this.lines * 0.1);
  }

  getState() {
    const playfield = this.createPlayfield();
    const { y: figureY, x: figureX, blocks } = this.activeFigure;

    this.playfield.forEach((row, y) => {
      playfield[y] = row.map((cell) => cell);
    });

    blocks.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block) {
          playfield[figureY + y][figureX + x] = block;
        }
      });
    });

    return {
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextFigure: this.nextFigure,
      playfield,
      isGameOver: this.topOut,
    };
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.topOut = false;
    this.playfield = this.createPlayfield();
    this.activeFigure = this.createFigure();
    this.nextFigure = this.createFigure();
  }

  createPlayfield() {
    const playfield = Array.from({ length: 20 }, () => Array(10).fill(0));
    return playfield;
  }

  createFigure() {
    const index = Math.floor(Math.random() * 7);
    const type = "IJLOSTZ"[index];
    const figure = {};

    switch (type) {
      case "I":
        figure.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;

      case "J":
        figure.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ];
        break;

      case "L":
        figure.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ];
        break;

      case "O":
        figure.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ];
        break;

      case "S":
        figure.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ];
        break;

      case "T":
        figure.blocks = [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0],
        ];
        break;

      case "Z":
        figure.blocks = [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7],
        ];
        break;

      default:
        throw new Error("Unknown type of figure");
    }

    figure.x = Math.floor((10 - figure.blocks[0].length) / 2);
    figure.y = -1;

    return figure;
  }

  moveFigureLeft() {
    this.activeFigure.x -= 1;
    if (this.hasCollision()) {
      this.activeFigure.x += 1;
    }
  }

  moveFigureRight() {
    this.activeFigure.x += 1;
    if (this.hasCollision()) {
      this.activeFigure.x -= 1;
    }
  }

  moveFigureDown() {
    if (this.topOut) return;

    this.activeFigure.y += 1;
    if (this.hasCollision()) {
      this.activeFigure.y -= 1;
      this.lockFigure();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updateFigures();
    }
    if (this.hasCollision()) {
      this.topOut = true;
    }
  }

  rotateFigure() {
    this.rotateBlocks();
    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }
  }

  rotateBlocks(clockwise = true) {
    const { blocks } = this.activeFigure;
    const { length } = blocks;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for (let i = 0; i < x; i += 1) {
      for (let j = i; j < y - i; j += 1) {
        const temp = blocks[i][j];

        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  hasCollision() {
    const { y: figureY, x: fitureX, blocks } = this.activeFigure;

    return blocks.some((row, y) =>
      row.some(
        (block, x) =>
          block &&
          (this.playfield[figureY + y] === undefined ||
            this.playfield[figureY + y][fitureX + x] === undefined ||
            this.playfield[figureY + y][fitureX + x])
      )
    );
  }

  lockFigure() {
    const { y: figureY, x: fitureX, blocks } = this.activeFigure;
    blocks.forEach((row, y) =>
      row.forEach((block, x) => {
        if (block) {
          this.playfield[figureY + y][fitureX + x] = block;
        }
      })
    );
  }

  clearLines() {
    const rows = 20;
    const columns = 10;
    const lines = [];

    for (let y = rows - 1; y >= 0; y -= 1) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x += 1) {
        if (this.playfield[y][x]) {
          numberOfBlocks += 1;
        }
      }

      if (numberOfBlocks === columns) {
        lines.unshift(y);
      } else if (numberOfBlocks === 0) {
        break;
      }
    }

    lines.forEach((index) => {
      this.playfield.splice(index, 1);
      this.playfield.unshift(new Array(columns).fill(0));
    });
    return lines.length;
  }

  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += Game.points[clearedLines] * (this.level + 1);
      this.lines += clearedLines;
    }
  }

  updateFigures() {
    this.activeFigure = this.nextFigure;
    this.nextFigure = this.createFigure();
  }
}

