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

  document.body.addEventListener("click", (event) => {
    if (
      !event.target.classList.contains("nav") &&
      !event.target.closest(".header__burger-btn") &&
      !event.target.closest(".profile__icon") &&
      !event.target.closest(".btn_after-register") &&
      header.classList.contains("open")
    ) {
      header.classList.remove("open");
    }
  });
});

// Profile menu
// скрытие Profile menu при клике вне
// до авторизации
const profile = document.querySelector(".profile__icon");
const noAuth = document.querySelector(".profile__no-auth_active");
const profileBlock = document.querySelector(".profile-block");

document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("profile-block") &&
    !event.target.closest(".profile__icon") &&
    !event.target.closest(".profile__no-auth_active") &&
    noAuth.classList.contains("open")
  ) {
    profile.classList.remove("open");
    noAuth.classList.remove("open");
  }
});

const withAuth = document.querySelector(".profile__with-auth_active");

// после авторизации
document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("profile-block") &&
    !event.target.closest(".btn_after-register") &&
    !event.target.closest(".profile__with-auth_active") &&
    withAuth.classList.contains("open")
  ) {
    profile.classList.remove("open");
    withAuth.classList.remove("open");
  }
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

// PopUp Register
const btnRegister = document.querySelector(".btn__register");
const popUpRegister = document.querySelector(".pop-up__register");
const popUpCloseBtnRegister = document.querySelector(".close-popup__register");

// при нажатии на кнопку Register в меню профиля открывается и закрывается окно регистрации
btnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// при нажатии на кнопку Sing Up в разделе Get Card открывается и закрывается окно регистрации
const btnRegisterGetCardBlock = document.querySelector(
  ".get-card__button_register"
);
btnRegisterGetCardBlock.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// закрывает окно регистрации при нажатии вне окна
popUpRegister.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__register")) {
    popUpRegister.classList.toggle("hidden");
  }
});

// закрывает окно регистрации при нажатии на крест
popUpCloseBtnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// PopUp Log in
const btnLogin = document.querySelector(".btn__login");
const btnLoginGetCardBlock = document.querySelector(".get-card__button_login");
const popUpLogin = document.querySelector(".pop-up__login");
const popUpCloseBtnLogin = document.querySelector(".close-popup__login");

// при нажатии на кнопку Log In в меню профиля открывается и закрывается окно входа в профиль
btnLogin.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

// при нажатии на кнопку Log In в разделе Get Card открывается и закрывается окно входа в профиль
btnLoginGetCardBlock.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

// закрывает окно входа в личный кабинет при нажатии на крест
popUpCloseBtnLogin.addEventListener("click", () => {
  popUpLogin.classList.toggle("hidden");
});

// закрывает окно входа в личный кабинет при нажатии вне окна
popUpLogin.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__login")) {
    popUpLogin.classList.toggle("hidden");
  }
});

// PopUp My profile
const btnMyProfile = document.querySelector(".btn__myprofile");
const popUpMyProfile = document.querySelector(".pop-up__my-profile");
const popUpCloseBtnMyProfile = document.querySelector(
  ".close-popup__my-profile"
);

// при нажатии на кнопку My profile открывается окно My profile
btnMyProfile.addEventListener("click", () => {
  popUpMyProfile.classList.toggle("hidden");
});

// закрывается окно My profile при нажатии вне окна
popUpMyProfile.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__my-profile")) {
    popUpMyProfile.classList.toggle("hidden");
  }
});

// закрывается окно My profile при нажатии на крест
popUpCloseBtnMyProfile.addEventListener("click", () => {
  popUpMyProfile.classList.toggle("hidden");
});

// PopUp Buy
const btnBuy = document.querySelectorAll(".book-card__button");
const popUpBuyCard = document.querySelector(".pop-up__buy-card");
const popUpCloseBtnBuyCard = document.querySelector(".close-popup__buy-card");

// при нажатии на кнопку Buy открывается окно Buy a Library Card
btnBuy.forEach((button) => {
  button.addEventListener("click", () => {
    popUpBuyCard.classList.toggle("hidden");
  });
});

// закрывается окно Buy a Library Card при нажатии вне окна
popUpBuyCard.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up__buy-card")) {
    popUpBuyCard.classList.toggle("hidden");
  }
});

// закрывать окно Buy a Library Card при нажатии на крест
popUpCloseBtnBuyCard.addEventListener("click", () => {
  popUpBuyCard.classList.toggle("hidden");
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
// храним данные пользователя
// регистрация нового пользователя
function signup(e) {
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

  let users = localStorage.getItem("users");

  if (users) {
    users = JSON.parse(users);
    users.push(user);
  } else {
    users = [user];
  }

  localStorage.setItem("users", JSON.stringify(users));

  const popUpRegister = document.querySelector(".pop-up__register");
  popUpRegister.remove();
  noAuth.remove();

  const profileAuth = document.querySelector(".btn_after-register");
  profile.classList.add("hidden");
  profileAuth.classList.remove("hidden");

  // меняем иконку профиля на инициалы пользователя
  const newInitials = `${firstname[0]}${lastname[0]}`;
  const nameLastname = `${firstname} ${lastname}`;
  const btnInitials = document.querySelector(".btn_after-register");
  const textMyProfileInitials = document.querySelector(".name-lastname__initials");
  const textMyProfileName = document.querySelector(".name-lastname__text");
  btnInitials.textContent = newInitials;
  btnInitials.title = nameLastname;
  textMyProfileInitials.textContent = newInitials;
  textMyProfileName.textContent = nameLastname;

  profileAuth.addEventListener("click", () => {
    withAuth.classList.toggle("open");
  });
}

// Log out
// не работает
const logOutBtn = document.querySelector(".btn__logout");
logOutBtn.addEventListener("click", function () {
  withAuth.style.display = "none";
  noAuth.style.display = "flex";
  btnInitials.style.display = "none";
  profile.classList.remove("hidden");
});

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

// не работает
window.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === true) {
    popUpRegister.style.display = "none";
    noAuth.style.display = "none";
    withAuth.style.display = "flex";

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const userdatas = {
      firstname: firstname,
      lastname: lastname,
    };

    const newInitials = `${userdatas.firstname[0]}${userdatas.lastname[0]}`;
    const nameLastname = `${userdatas.firstname} ${userdatas.lastname}`;
    const btnInitials = document.querySelector(".btn_after-register");
    const textMyProfileInitials = document.querySelector(".name-lastname__initials");
    const textMyProfileName = document.querySelector(".name-lastname__text");
    btnInitials.textContent = newInitials;
    textMyProfileInitials.textContent = newInitials;
    textMyProfileName.textContent = nameLastname;

    const profileAuth = document.querySelector(".btn_after-register");
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
    result.innerHTML = "Wrong Email";
  } else if (
    data !== null &&
    email === data.email &&
    password === data.password
  ) {
    result.innerHTML = "You logged in";
    localStorage.setItem(data.email, JSON.stringify(data));

    // для закрытия поп-ап окна:
    const popUpLogin = document.querySelector(".pop-up__login");
    popUpLogin.style.display = "none";
  } else {
    result.innerHTML = "Wrong password";
  }
}

// Card Number
function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  result += characters.charAt(Math.floor(Math.random() * characters.length)); // первая буква

  for (let i = 0; i < length - 1; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length)); // цифры
  }
  return result;
}
// генерируем случайную строку
const randomString = generateRandomString(9);
const cardNumberElement = document.querySelector(".card-number");
cardNumberElement.textContent = randomString;

// копирование в буфер обмена
function copyCodeToClipboard(button) {
  const text = button.previousElementSibling.textContent; // получаем текст элемента рядом с кнопкой
  let tempInput = document.createElement("input"); // создаем временный элемент input

  document.body.appendChild(tempInput); // добавляем временный элемент input на страницу
  tempInput.value = text; // устанавливаем значение временного элемента input равным тексту

  tempInput.select(); // вбираем текст внутри элемента input
  document.execCommand("copy"); // копируем выбранный текст в буфер обмена

  document.body.removeChild(tempInput); // удаляем временный элемент input

  showNotification("Card number copied to clipboard!"); // Показываем уведомление
}

// сообщение о том, что код скопирован в буфер обмена
function showNotification(message) {
  const notification = document.createElement("div"); // cоздаем элемент для уведомления
  notification.innerText = message; // eстанавливаем текст уведомления
  notification.classList.add("notification"); // добавляем класс для стилизации уведомления

  document.body.appendChild(notification); // добавляем уведомление на страницу

  setTimeout(function () {
    document.body.removeChild(notification); // удаляем уведомление через 3 секунды
  }, 3000);
}
