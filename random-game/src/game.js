export default class Game {
  score = 0;

  lines = 0;

  level = 0;

  playfield = this.createPlayfield();

  activeFigure = {
    x: 0,
    y: 0,

    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  };

  getState() {
    const playfield = this.createPlayfield();
    const { y: figureY, x: fitureX, blocks } = this.activeFigure;

    for (let y = 0; y < this.playfield.length; y += 1) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x += 1) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y += 1) {
      for (let x = 0; x < blocks[y].length; x += 1) {
        if (blocks[y][x]) {
          playfield[figureY + y][fitureX + x] =
            blocks[y][x];
        }
      }
    }

    return {
      playfield,
    };
  }

  createPlayfield() {
    const playfield = [];
    for (let y = 0; y < 20; y += 1) {
      playfield[y] = [];

      for (let x = 0; x < 10; x += 1) {
        playfield[y][x] = 0;
      }
    }
    return playfield;
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
    this.activeFigure.y += 1;
    if (this.hasCollision()) {
      this.activeFigure.y -= 1;
      this.lockFigure();
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

    for (let y = 0; y < blocks.length; y += 1) {
      for (let x = 0; x < blocks[y].length; x += 1) {
        if (
          blocks[y][x] &&
          (this.playfield[figureY + y] === undefined ||
            this.playfield[figureY + y][fitureX + x] === undefined ||
            this.playfield[figureY + y][fitureX + x])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  lockFigure() {
    const { y: figureY, x: fitureX, blocks } = this.activeFigure;
    for (let y = 0; y < blocks.length; y += 1) {
      for (let x = 0; x < blocks[y].length; x += 1) {
        if (blocks[y][x]) {
          this.playfield[figureY + y][fitureX + x] = blocks[y][x];
        }
      }
    }
  }
}
