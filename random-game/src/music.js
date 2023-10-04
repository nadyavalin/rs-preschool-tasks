const volumeHigh = document.querySelector(".volume-on");
const volumeOff = document.querySelector(".volume-off");
const backgroundMusic = document.querySelector(".background-music");

function playBackgroundMusic() {
  backgroundMusic.play();
  volumeOff.style.display = "block";
  volumeHigh.style.display = "none";
}

function pauseBackgroundMusic() {
  backgroundMusic.pause();
  volumeOff.style.display = "none";
  volumeHigh.style.display = "block";
}

volumeHigh.addEventListener("click", () => {
  playBackgroundMusic();
});

volumeOff.addEventListener("click", () => {
  pauseBackgroundMusic();
});

if (!backgroundMusic.paused) {
  playBackgroundMusic();
}
