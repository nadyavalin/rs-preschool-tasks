const singers = ["Bad Omens",
              "Ethan Bortnick",
              "Hensonn"];

const songs = ["The Death of Peace of Mind",
              "Engravings",
              "Sahara"];

const backgrounds = ["url(./assets/img/bad-omens-big.jpg)",
                    "url(./assets/img/engravings-big.jpg)",
                    "url(./assets/img/sahara-big.jpg)"];

const images = ["url(./assets/img/small/bad-omens-small.jpg)",
                "url(./assets/img/small/engravings-small.jpg)",
                "url(./assets/img/small/sahara-small.jpg"];

const player = document.querySelector(".player");
const singerName = document.querySelector(".singer-name");
const songName = document.querySelector(".song-name");
const audio = document.querySelector(".audio");
const progressContainer = document.querySelector(".progress__container");
const progressBar = document.querySelector(".progress-bar");
const durationTimeNumbers = document.querySelector(".duration-time");
const currentTimeNumbers = document.querySelector(".current-time");

const playBtn = document.querySelector(".btn__play-pause");
const prevBtn = document.querySelector(".btn__prev");
const nextBtn = document.querySelector(".btn__next");

let index = 0;

function loadAudio(singer, song) {
  singerName.innerHTML = singer;
  songName.innerHTML = song;
  audio.src = `assets/audio/${singer} - ${song}.mp3`;
  player.style.backgroundImage = images[index];
  document.body.style.backgroundImage = backgrounds[index];
}
loadAudio(singers[index], songs[index]);

function playAudio() {
  player.classList.add('play');
  playBtn.src = "./assets/svg/pause.svg";
  audio.play();
}

function pauseAudio() {
  player.classList.remove('play');
  playBtn.src = "./assets/svg/play.svg";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseAudio();
    player.style.transition = 'background-image 0.3s ease-out';
    player.style.backgroundImage = `${images[index]}`;
  } else {
    playAudio();
    player.style.transition = 'background-image 0.3s ease-in';
    player.style.backgroundImage = `${images[index]}`;
  }
});

function nextAudio() {
  index += 1;
  if (index > songs.length - 1) {
    index = 0;
  }
  loadAudio(singers[index], songs[index]);
  playAudio();
}
nextBtn.addEventListener("click", nextAudio);

function prevAudio() {
  index -= 1;
  if (index < 0) {
    index = songs.length - 1;
  }
  loadAudio(singers[index], songs[index]);
  playAudio();
}
prevBtn.addEventListener("click", prevAudio);

function changeProgressBar(event) {
  const {duration, currentTime} = event.srcElement;
  const progressTime = (currentTime / duration) * 100;
  progressBar.style.width = `${progressTime}%`;

  if(Number.isNaN(duration)) {
    durationTimeNumbers.textContent = "0:00";
  } else {
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  const formatDuration = `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;
  durationTimeNumbers.textContent = formatDuration;
  }
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const formatCurrentTime = `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;
  currentTimeNumbers.textContent = formatCurrentTime;
}
audio.addEventListener("timeupdate", changeProgressBar);

let isDragging = false;

function setProgress(event) {
  const widthBar = this.clientWidth;
  const pressX = event.offsetX;
  const duration = [audio.duration];
  const findTime = (pressX / widthBar) * duration;
  audio.currentTime = findTime;
}
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextAudio);

function startDragging() {
  isDragging = true;
  progressContainer.addEventListener("mousemove", setProgress);
}

function stopDragging() {
  if(isDragging) {
    isDragging = false;
    progressContainer.removeEventListener("mousemove", setProgress);
  }
}

progressContainer.addEventListener("mousedown", startDragging);
window.addEventListener("mouseup", stopDragging);