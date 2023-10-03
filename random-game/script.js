// eslint-disable-next-line import/extensions
import Game from "./src/game.js";
// eslint-disable-next-line import/extensions
import View from "./src/view.js";
// eslint-disable-next-line import/extensions
import Controller from "./src/controller.js";

const root = document.querySelector(".root");

const game = new Game();
const view = new View(root, 480, 640, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;

const backgroundMusic = document.getElementById("background-music");

function playBackgroundMusic() {
  backgroundMusic.play();
}
playBackgroundMusic();