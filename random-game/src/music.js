const volumeOn = document.querySelector(".volume-on");
const volumeOff = document.querySelector(".volume-off");
const backgroundMusic = document.querySelector(".background-music");

function playBackgroundMusic() {
  backgroundMusic.play();
  volumeOn.style.display = "block";
  volumeOff.style.display = "none";
}

function pauseBackgroundMusic() {
  backgroundMusic.pause();
  volumeOff.style.display = "block";
  volumeOn.style.display = "none";
}

volumeOn.addEventListener("click", () => {
  pauseBackgroundMusic();
});

volumeOff.addEventListener("click", () => {
  playBackgroundMusic();
});

if (!backgroundMusic.paused) {
  playBackgroundMusic();
}
