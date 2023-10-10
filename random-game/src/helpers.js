export function createPlayField() {
  const playfield = Array.from({ length: 20 }, () => Array(10).fill(0));
  return playfield;
}

export function createFigure() {
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