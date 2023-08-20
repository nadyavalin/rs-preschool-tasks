// Burger-menu
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  document
    .querySelector(".header__burger-btn")
    .addEventListener("click", function () {
      setTimeout(() => {
        header.classList.toggle("open");
      }, 0);
    });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      header.classList.remove("open");
    }
  });

  /*
  document.body.addEventListener("click", (event) => {
    if (
      !event.target.classList.contains("menu") &&
      !event.target.closest(".header__burger-btn") &&
      header.classList.contains("open")
    ) {
      header.classList.remove("open");
    }
  });
  */
});

// Next block
// Slider in About block
let offset = 0;
let activeImageIndex = 0;
let imageWidth = window.innerWidth > 768 ? 475 : 450;
const images = document.querySelectorAll(".image");
const imagesLine = document.querySelector(".images-line");
const paginationDots = document.querySelectorAll(".pagination-dot");
const arrowPrev = document.querySelector(".arrow-button_prev");
const arrowNext = document.querySelector(".arrow-button_next");

// Switch slider
function switchSlide(newOffset) {
  offset = newOffset;
  imagesLine.style.left = -offset + "px";
  activeImageIndex = newOffset / imageWidth;
  updatePaginationDots();
  updateArrows();
}

// Slider desktop pagination
paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    switchSlide(index * imageWidth);
  });
});

// Slider arrows for Prev
arrowPrev.addEventListener("click", function () {
  switchSlide(offset - imageWidth);
});

// Slider arrows for Next
arrowNext.addEventListener("click", function () {
  switchSlide(offset + imageWidth);
});

// Slider desktop pagination update
function updatePaginationDots() {
  paginationDots.forEach((dot, index) => {
    if (index === activeImageIndex) {
      dot.classList.add("pagination-dot_checked");
    } else {
      dot.classList.remove("pagination-dot_checked");
    }
  });
}

// Slider arrows update
function updateArrows() {
  if (activeImageIndex === 0) {
    arrowPrev.classList.add("arrow-button_stop");
  } else if (activeImageIndex === images.length - 1) {
    arrowNext.classList.add("arrow-button_stop");
  } else {
    arrowPrev.classList.remove("arrow-button_stop");
    arrowNext.classList.remove("arrow-button_stop");
  }
}

// Slider adaptation
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    imageWidth = 475;
  } else {
    imageWidth = 450;
  }
});

// Next block
// Slider in Favorites block
const fadeIn = (element, timeout, display) => {
  element.style.opacity = 0;
  element.style.display = display || "block";
  element.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 700);
};

const fadeOut = (element, timeout) => {
  element.style.opacity = 1;
  element.style.transition = `opacity ${timeout}ms`;
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = "none";
  }, timeout);
};

const btnWinter = document.querySelector(".season-block__item_winter");
const btnSpring = document.querySelector(".season-block__item_spring");
const btnSummer = document.querySelector(".season-block__item_summer");
const btnAutumn = document.querySelector(".season-block__item_autumn");

const bookCardsWinter = document.querySelector(".book-cards__winter");
const bookCardsSpring = document.querySelector(".book-cards__spring");
const bookCardsSummer = document.querySelector(".book-cards__summer");
const bookCardsAutumn = document.querySelector(".book-cards__autumn");

/*
btnWinter.addEventListener("hover", (e) => {
  if (radio === checked) {
    btnWinter.classList.remove("season-block__item");
  } else return;
});
*/

let flagWinter = false;

btnWinter.addEventListener("click", () => {
  if (flagWinter) {
    fadeOut(bookCardsSummer, 700);
    fadeOut(bookCardsAutumn, 700);
    fadeOut(bookCardsSpring, 700);
    flagWinter = false;
  } else {
    fadeIn(bookCardsWinter, 700, "flex");
    flagWinter = true;
  }
});

let flagSpring = false;

btnSpring.addEventListener("click", () => {
  if (flagSpring) {
    fadeOut(bookCardsWinter, 700);
    fadeOut(bookCardsSummer, 700);
    fadeOut(bookCardsAutumn, 700);
    flagSpring = false;
  } else {
    fadeIn(bookCardsSpring, 700, "flex");
    flagSpring = true;
  }
});

let flagSummer = false;

btnSummer.addEventListener("click", () => {
  if (flagSummer) {
    fadeOut(bookCardsSpring, 700);
    fadeOut(bookCardsWinter, 700);
    fadeOut(bookCardsAutumn, 700);
    flagSummer = false;
  } else {
    fadeIn(bookCardsSummer, 700, "flex");
    flagSummer = true;
  }
});

let flagAutumn = false;

btnAutumn.addEventListener("click", () => {
  if (flagAutumn) {
    fadeOut(bookCardsWinter, 700);
    fadeOut(bookCardsSpring, 700);
    fadeOut(bookCardsSummer, 700);
    flagAutumn = false;
  } else {
    fadeIn(bookCardsAutumn, 700, "flex");
    flagAutumn = true;
  }
});

/*
btnWinter.addEventListener("click", () => {
  fadeOut(bookCardsSummer, 700);
  fadeOut(bookCardsAutumn, 700);
  fadeOut(bookCardsSpring, 700);
  fadeIn(bookCardsWinter, 700, "flex");
});

btnSpring.addEventListener("click", () => {
  fadeOut(bookCardsWinter, 700);
  fadeOut(bookCardsSummer, 700);
  fadeOut(bookCardsAutumn, 700);
  fadeIn(bookCardsSpring, 700, "flex");
});

btnSummer.addEventListener("click", () => {
  fadeOut(bookCardsSpring, 700);
  fadeOut(bookCardsWinter, 700);
  fadeOut(bookCardsAutumn, 700);
  fadeIn(bookCardsSummer, 700, "flex");
});

btnAutumn.addEventListener("click", () => {
  fadeOut(bookCardsWinter, 700);
  fadeOut(bookCardsSpring, 700);
  fadeOut(bookCardsSummer, 700);
  fadeIn(bookCardsAutumn, 700, "flex");
});
*/

// Profile no auth
const profile = document.querySelector(".profile__icon");
const noAuth = document.querySelector(".profile__no-auth_active");
const withAuth = document.querySelector(".profile__with-auth_active");

profile.addEventListener("click", function () {
  setTimeout(() => {
    noAuth.classList.toggle("open");
  }, 0);
});

/* // не работает
document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("profile") &&
    !event.target.closest(".profile__no-auth_active") &&
    profile.classList.contains("open")
  ) {
    profile.classList.remove("open");
  }
});
*/

// Pop Up Register
const btnRegister = document.querySelector(".btn__register");
const btnRegisterGetCardBlock = document.querySelector(".get-card__button_register");
const btnLogin = document.querySelector(".btn__login");
const btnLoginGetCardBlock = document.querySelector(".get-card__button_login");
const btnLoginFromBuy = document.querySelectorAll(".book-card__button");

const popUpRegister = document.querySelector(".pop-up__register");
const popUpLogin = document.querySelector(".pop-up__login");
const popUpCloseBtnRegister = document.querySelector(".close-popup__register");
const popUpCloseBtnLogin = document.querySelector(".close-popup__login");

btnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

btnRegisterGetCardBlock.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

btnLogin.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

btnLoginGetCardBlock.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

/* btnLoginFromBuy.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
}); */

popUpRegister.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__register")) {
    popUpRegister.classList.toggle("hidden");
  }
});

popUpLogin.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__login")) {
    popUpLogin.classList.toggle("hidden");
  }
});

popUpCloseBtnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

popUpCloseBtnLogin.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

/*
const btnRegisterFromLogin = doucment.querySelector(".have-account__register");
const btnLoginFromRegister = document.querySelector(".have-account__login");

btnRegisterFromLogin.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

btnLoginFromRegister.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});
*/
