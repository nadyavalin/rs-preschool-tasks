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

  // пока убрала, потому что задание "На разрешении 768px, при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2" не отрабатывает
  // бургер-меню все время закрывается, нужно изменить код

  document.body.addEventListener("click", (event) => {
    if (
      !event.target.classList.contains("nav") &&
      !event.target.closest(".header__burger-btn") &&
      !event.target.closest(".profile__icon") &&
      header.classList.contains("open")
    ) {
      header.classList.remove("open");
    }
  });
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

// попытка сделать выбранные радио-кнопки неактивными при наведении
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

// код тоже работает, но не на всех переключениях
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

// работа с профилем до авторизации
const profile = document.querySelector(".profile__icon");
const noAuth = document.querySelector(".profile__no-auth_active");
const withAuth = document.querySelector(".profile__with-auth_active");

// открывает меню профиля со списком Log In, Register
profile.addEventListener("click", function () {
  setTimeout(() => {
    noAuth.classList.toggle("open");
  }, 0);
});

// при открытом бургер-меню меню профиля должно открываться, при нажатии на Register открываться форма регистрации
// а меню профиля должно закрываться, при этом бургер-меню все время открыто
document.addEventListener("DOMContentLoaded", function () {
  const profileList = document.querySelector(".profile__no-auth_active");
  const registerForm = document.querySelector(".pop-up__register_content");
  const burgerMenuBtn = document.querySelector(".header__burger-btn");
  const burgerMenu = document.querySelector(".nav");

  // здесь должен быть код
});

// PopUp Login and Register / Sing Up / Log in
const btnRegister = document.querySelector(".btn__register");
const btnRegisterGetCardBlock = document.querySelector(
  ".get-card__button_register"
);
const btnLogin = document.querySelector(".btn__login");
const btnLoginGetCardBlock = document.querySelector(".get-card__button_login");
const btnLoginFromBtnBuy = document.querySelectorAll(".book-card__button");
const btnMyProfile = document.querySelector(".btn__myprofile");

const popUpRegister = document.querySelector(".pop-up__register");
const popUpLogin = document.querySelector(".pop-up__login");
const popUpMyProfile = document.querySelector(".pop-up__my-profile");

const popUpCloseBtnRegister = document.querySelector(".close-popup__register");
const popUpCloseBtnLogin = document.querySelector(".close-popup__login");
const popUpCloseBtnMyProfile = document.querySelector(
  ".close-popup__my-profile"
);

// при нажатии на кнопку Register в меню профиля открывается и закрывается окно регистрации
btnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// при нажатии на кнопку Sing Up в разделе Get Card открывается и закрывается окно регистрации
btnRegisterGetCardBlock.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// при нажатии на кнопку Log In в меню профиля открывается и закрывается окно входа в профиль
btnLogin.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

// при нажатии на кнопку Log In в разделе Get Card открывается и закрывается окно входа в профиль
btnLoginGetCardBlock.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

// при нажатии на кнопку My profile открывается окно My profile
btnMyProfile.addEventListener("click", () => {
  popUpMyProfile.classList.toggle("hidden");
});

// закрывает окно регистрации при нажатии вне окна
popUpRegister.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__register")) {
    popUpRegister.classList.toggle("hidden");
  }
});

// закрывает окно входа в личный кабинет при нажатии вне окна
popUpLogin.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__login")) {
    popUpLogin.classList.toggle("hidden");
  }
});

// закрывается окно My profile при нажатии вне окна
popUpMyProfile.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__my-profile")) {
    popUpMyProfile.classList.toggle("hidden");
  }
});

// закрывает окно регистрации при нажатии на крест
popUpCloseBtnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// закрывает окно входа в личный кабинет при нажатии на крест
popUpCloseBtnLogin.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

// закрывается окно My profile при нажатии на крест
popUpCloseBtnMyProfile.addEventListener("click", () => {
  popUpMyProfile.classList.toggle("hidden");
});

// сделать код плавного открытия попап окна

// в формах регистрации и залогирования тоже есть ссылки Register и Login
// открытие окна регистрации и окна входа в личный кабинет при нажатии на соответствующие ссылки
// не работает
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

// cохраняем данные в LocalStorage
// регистрация нового пользователя
function singup(e) {
  event.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  };

  let json = JSON.stringify(user);
  localStorage.setItem("user", json);
  console.log("user added");

  const popUpRegister = document.querySelector(".pop-up__register");
  popUpRegister.remove();
  noAuth.remove();

  // меняем иконку профиля на инициалы пользователя
  const profileAuth = document.querySelector(".btn_after-register");
  profile.classList.add('hidden');
  profileAuth.classList.remove('hidden');

  const newInitials = `${firstname[0]}${lastname[0]}`;
  const btnInitials = document.querySelector(".btn_after-register");
  btnInitials.textContent = newInitials;

  profileAuth.addEventListener("click", () => {
    withAuth.classList.toggle("open");
  });
}

/*
  const logoutBtn = document.querySelector(".btn__logout");
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("user");
    location.reload();
  });
  */

/*

  if (json !== 0) {
    profile.addEventListener("click", function () {
      setTimeout(() => {
        withAuth.classList.toggle("open");
      }, 0);
    });
  }
    */

/*
  const replaceIconProfile = document.querySelector(".profile__icon");
  if (json !== 0) {
    replaceIconProfile.innerHTML = "<p>NS</p>";
  }
  */

// проверяем состояние страницы после обновления - авторизован пользователь или нет
window.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    popUpRegister.style.display = "none";
    noAuth.style.display = "none";
    withAuth.style.display = "fixed";

    const newInitials = `${firstname[0]}${lastname[0]}`;
    const btnInitials = document.querySelector(".btn_after-register");
    btnInitials.textContent = newInitials;

    profileAuth.addEventListener("click", () => {
      withAuth.classList.toggle("open");
    });
  }

});


// вход в личный кабинет
function login(e) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const result = document.getElementById("result");

  let user = localStorage.getItem(email);
  let data = JSON.parse(user);

  if (data === null) {
    // не работает
    result.innerHTML = "Wrong Email";
  } else if (
    data !== null &&
    email === data.email &&
    password === data.password
  ) {
    result.innerHTML = "You logged in";
    localStorage.setItem("user", JSON.stringify(data));

    // добавляем код для закрытия поп-ап окна:
    // не работает
    const popUpLogin = document.querySelector(".pop-up__login");
    popUpLogin.style.display = "none";
  } else {
    result.innerHTML = "Wrong password";
  }
}
