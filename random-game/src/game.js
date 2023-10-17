import { createPlayField, createFigure } from "./helpers.js";

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
  
  playField;
  
  activeFigure;
  
  nextFigure;

  constructor() {
    this.reset();
  }

  get level() {
    return Math.floor(this.lines * 0.1);
  }

  getState() {
    const playField = createPlayField();
    const { y: figureY, x: figureX, blocks } = this.activeFigure;

    this.playField.forEach((row, y) => {
      playField[y] = row.map((cell) => cell);
    });

    blocks.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block) {
          playField[figureY + y][figureX + x] = block;
        }
      });
    });

    return {
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextFigure: this.nextFigure,
      playField,
      isGameOver: this.topOut,
    };
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.topOut = false;
    this.playField = createPlayField();
    this.activeFigure = createFigure();
    this.nextFigure = createFigure();
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
          (this.playField[figureY + y] === undefined ||
            this.playField[figureY + y][fitureX + x] === undefined ||
            this.playField[figureY + y][fitureX + x])
      )
    );
  }

  lockFigure() {
    const { y: figureY, x: fitureX, blocks } = this.activeFigure;
    const sound = document.querySelector(".lock-figure-music");
    blocks.forEach((row, y) =>
      row.forEach((block, x) => {
        if (block) {
          this.playField[figureY + y][fitureX + x] = block;
          sound.play();
        }
      })
    );
  }

  clearLines() {
    const rows = 20;
    const columns = 10;
    const lines = [];
    const sound = document.querySelector(".clear-line-music");

    for (let y = rows - 1; y >= 0; y -= 1) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x += 1) {
        if (this.playField[y][x]) {
          numberOfBlocks += 1;
        }
      }

      if (numberOfBlocks === columns) {
        lines.unshift(y);
        sound.play();
      } else if (numberOfBlocks === 0) {
        break;
      }
    }

    lines.forEach((index) => {
      this.playField.splice(index, 1);
      this.playField.unshift(new Array(columns).fill(0));
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
    this.nextFigure = createFigure();
  }
}

