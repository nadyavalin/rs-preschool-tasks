const songs = ["./assets/audio/Bad Omens - The Death of Peace of Mind.mp3",
                "./assets/audio/Ethan Bortnick - Engravings.mp3",
                "./assets/audio/Hensonn - Sahara.mp3"];

const backgrounds = ["./assets/img/bad-omens-big.jpg",
                    "./assets/img/engravings-big.jpg",
                    "./assets/img/sahara-big"];
                    
const images = ["./assets/img/bad-omens-small.jpg",
                    "./assets/img/engravings-small.jpg",
                    "./assets/img/sahara-small"];

const playBtn = document.querySelector(".btn__play-pause");
const prevBtn = document.querySelector(".btn__prev");
const nextBtn = document.querySelector(".btn__next");

const songName = document.querySelector('.song-name');
const singer = document.querySelector('.singer');

const audio = new Audio();

let isPlay = false;

function playAudio() {
  audio.src = "./assets/audio/Bad Omens - The Death of Peace of Mind.mp3";
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.src = "./assets/svg/pause.svg";
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.add("play");
    playBtn.classList.remove("pause");
    playBtn.src = "./assets/svg/play.svg";
  }
}

let index = 0;
let currentIndex = 0;

function changeBackgroundNext() {
  document.body.style.backgroundImage = url(`${backgrounds[currentIndex % backgrounds.length]}`);
  currentIndex++;
}

function changeBackgroundPrev() {
  document.body.style.backgroundImage = url(`${backgrounds[currentIndex % backgrounds.length]}`);
  currentIndex--;
}

function prevSong() {
  audio.currentTime = 0;
  if (index === 0) {
    audio.src = songs[songs.length - 1];
    index = songs.length - 1;
  } else {
    audio.src = songs[--index];
    currentIndex--;
  }

  if (isPlay) {
    audio.play();
  }
  changeBackgroundPrev();
}

function nextSong() {
  audio.currentTime = 0;
  if (index === songs.length - 1) {
    audio.src = songs[0];
    index = 0;
  } else {
    audio.src = songs[++index];
    currentIndex++;
  }

  if (isPlay) {
    audio.play();
  }
  changeBackgroundNext();
}

playBtn.addEventListener("click", playAudio);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
