export default class View {
  constructor(el, width, heigth, rows, columns) {
    this.el = el;
    this.width = width;
    this.heigth = heigth;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.heigth;

    this.blockWidth = this.width / columns;
    this.blockHeight = this.heigth / rows;

    this.el.appendChild(this.canvas);
  }

  render({ playfield }) {
    this.clearScreen();
    this.renderPlayfield(playfield);
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.heigth);
  }

  renderPlayfield(playfield) {
    for (let y = 0; y < playfield.length; y += 1) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x += 1) {
        const block = line[x];
        if (block) {
            this.renderBlock(
                x * this.blockWidth,
                y * this.blockHeight,
                this.blockWidth,
                this.blockHeight,
                'red',
                );
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;
    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}
