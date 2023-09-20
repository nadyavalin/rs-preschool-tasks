const singers = ["Bad Omens",
              "Ethan Bortnick",
              "Hensonn"];

const songs = ["The Death of Peace of Mind",
              "Engravings",
              "Sahara"];

const backgrounds = ["url(./assets/img/bad-omens-big.jpg)",
                    "url(./assets/img/engravings-big.jpg)",
                    "url(./assets/img/sahara-big.jpg)"]

const images = ["url(./assets/img/small/bad-omens-small.jpg)",
                "url(./assets/img/small/engravings-small.jpg)",
                "url(./assets/img/small/sahara-small.jpg"]

const player = document.querySelector(".player");
const singerName = document.querySelector(".singer-name");
const songName = document.querySelector(".song-name");
const audio = document.querySelector(".audio");

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
  } else {
    playAudio();
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