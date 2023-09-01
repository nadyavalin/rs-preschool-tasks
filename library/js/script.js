// Burger-menu
function addListenersForBurgerMenu() {
  const header = document.querySelector(".header");

  document
    .querySelector(".header__burger-btn")
    .addEventListener("click", () => {
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
}

// Global constants
// Slider in About block
const images = document.querySelectorAll(".image");
const imagesLine = document.querySelector(".images-line");
const paginationDots = document.querySelectorAll(".pagination-dot");
const arrowPrev = document.querySelector(".arrow-button_prev");
const arrowNext = document.querySelector(".arrow-button_next");

// Profile menu
const profile = document.querySelector(".profile__icon");
const profileAuth = document.querySelector(".btn_after-register");
const noAuth = document.querySelector(".profile__no-auth_active");
const withAuth = document.querySelector(".profile__with-auth");
const withAuthCode = document.querySelector(".profile__with-auth_active");

// PopUp Register
const btnRegister = document.querySelector(".btn__register");
const btnRegisterGetCardBlock = document.querySelector(
  ".get-card__button_register"
);
const popUpRegister = document.querySelector(".pop-up__register");
const popUpCloseBtnRegister = document.querySelector(".close-popup__register");

// PopUp Log in
const btnLogin = document.querySelector(".btn__login");
const btnLoginGetCardBlock = document.querySelector(".get-card__button_login");
const popUpLogin = document.querySelector(".pop-up__login");
const popUpCloseBtnLogin = document.querySelector(".close-popup__login");

// PopUp My profile
const btnMyProfile = document.querySelector(".btn__myprofile");
const popUpMyProfile = document.querySelector(".pop-up__my-profile");
const popUpCloseBtnMyProfile = document.querySelector(
  ".close-popup__my-profile"
);

// Card Number
const cardNumberProfileMenu = document.querySelector(".card-number__profile-menu");
const cardNumberMyProfile = document.querySelector(".card-number__my-profile");

// Log out
const logOutBtn = document.querySelector(".btn__logout");

// PopUp Buy
const btnBuy = document.querySelectorAll(".book-card__button");
const popUpBuyCard = document.querySelector(".pop-up__buy-card");
const popUpCloseBtnBuyCard = document.querySelector(".close-popup__buy-card");

// My profile
const textMyProfileInitials = document.querySelector(".name-lastname__initials");
const textMyProfileName = document.querySelector(".name-lastname__text");

// Profile menu
// Hide Profile menu when mouse click out of this menu
// Before registration or authorization
document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("profile-block") &&
    !event.target.closest(".profile__icon") &&
    !event.target.closest(".profile__no-auth_active") &&
    !event.target.closest(".header__burger-btn") &&
    noAuth.classList.contains("open")
  ) {
    profile.classList.add("open");
    noAuth.classList.remove("open");
  }
});

// After registration or authorization
document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("profile-block") &&
    !event.target.closest(".btn_after-register") &&
    !event.target.closest(".profile__with-auth") &&
    !event.target.closest(".header__burger-btn") &&
    withAuth.classList.contains("open")
  ) {
    profile.classList.remove("open");
    withAuth.classList.remove("open");
  }
});

// Slider in About block
let offset = 0;
let activeImageIndex = 0;
let imageWidth = window.innerWidth > 768 ? 475 : 450;

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

// Switch slider
function switchSlide(newOffset) {
  offset = newOffset;
  imagesLine.style.left = `${-offset}px`;
  activeImageIndex = newOffset / imageWidth;
  updatePaginationDots();
  updateArrows();
}

// Slider desktop pagination
paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    switchSlide(index * imageWidth);
  });
});

// Slider arrows for Prev
arrowPrev.addEventListener("click", () => {
  switchSlide(offset - imageWidth);
});

// Slider arrows for Next
arrowNext.addEventListener("click", () => {
  switchSlide(offset + imageWidth);
});

// Slider adaptation
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    imageWidth = 475;
  } else {
    imageWidth = 450;
  }
});

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

profileAuth.addEventListener("click", () => {
  withAuth.classList.toggle("open");
});

// Open Profile menu with the list - Log In / Register
profile.addEventListener("click", () => {
  setTimeout(() => {
    noAuth.classList.toggle("open");
  }, 0);
});

// PopUp Register
// при нажатии на кнопку Register в меню профиля открывается и закрывается окно регистрации
btnRegister.addEventListener("click", () => {
  popUpRegister.classList.toggle("hidden");
});

// при нажатии на кнопку Sing Up в разделе Get Card открывается и закрывается окно регистрации
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

/* НАЧАЛО ФОРМУЛ регистрации и логирования пользователя */

// Card Number
function generateCardNumber() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  result += characters.charAt(Math.floor(Math.random() * characters.length)); // первая буква

  for (let i = 0; i < 8; i += 1) {
    result += digits.charAt(Math.floor(Math.random() * digits.length)); // цифры
  }
  return result;
}

// добавляем инициалы, имя/фамилию
function setUserInfo(firstName, lastName) {
  const newInitials = `${firstName[0]}${lastName[0]}`;
  const nameLastName = `${firstName} ${lastName}`;
  profileAuth.textContent = newInitials;
  profileAuth.title = nameLastName;
  textMyProfileInitials.textContent = newInitials;
  textMyProfileName.textContent = nameLastName;

  popUpRegister.classList.add("hidden");
  profile.classList.add("hidden");
  profileAuth.classList.remove("hidden");
}

function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// храним данные пользователя в LocalStorage
function saveUserState(user) {
  setItemToLocalStorage("user", user);

  if (user) {
    setUserInfo(user.firstName, user.lastName, user.cardNumber);
  }
}

// Sing Up / Registration
function signup(event) {
  const firstName = document.querySelector(".firstname").value;
  const lastName = document.querySelector(".lastname").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const cardNumber = generateCardNumber();
  cardNumberProfileMenu.textContent = cardNumber;
  cardNumberMyProfile.textContent = cardNumber;
  event.preventDefault();

  const user = {
    firstName,
    lastName,
    email,
    password,
    cardNumber,
  };
  saveUserState(user);
  let users = getItemFromLocalStorage("users");

  if (users) {
    users.push(user);
  } else {
    users = [user];
  }

  setItemToLocalStorage("users", users);
  setUserInfo(firstName, lastName, cardNumber);
  popUpRegister.classList.add("hidden");
}

const formSingUp = document.querySelector(".form-register");
formSingUp.addEventListener("submit", signup);

// сообщение о том, что логин и пароль введены не верно
function showNotificationLog(message) {
  const result = document.createElement("div");
  result.innerText = message;
  result.classList.add("result");

  document.body.appendChild(result);

  setTimeout(() => {
    document.body.removeChild(result);
  }, 3000);
}

// Log in
function login(event) {
  const emailLog = document.querySelector(".email-log").value;
  const passwordLog = document.querySelector(".password-log").value;
  const cardNumberLog = document.querySelector(".card-number-log").value;
  const users = getItemFromLocalStorage("users");
  const user = users.find(
    (item) =>
      item.email === emailLog &&
      item.password === passwordLog
  );
  event.preventDefault();

  if (!user) {
    showNotificationLog("Wrong Email or Password");
  } else {
    setItemToLocalStorage("user", user);
    saveUserState(user);
    popUpLogin.classList.add("hidden");
    popUpRegister.classList.add("hidden");
    profileAuth.classList.remove("hidden");
    withAuthCode.classList.remove("hidden"); // вроде не нужно
    withAuthCode.classList.remove("open"); // вроде не нужно
  }

  if(user && item.cardNumber === cardNumberLog) {
    cardNumberProfileMenu.textContent = cardNumberLog;
    cardNumberMyProfile.textContent = cardNumberLog;
  }
}
const formLogin = document.querySelector(".form-login");
formLogin.addEventListener("submit", login);

// Log out
logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  withAuth.classList.add("hidden");
  withAuth.classList.remove("open");
  noAuth.classList.remove("hidden");
  noAuth.classList.remove("open");
  profileAuth.classList.add("hidden");
  profile.classList.remove("hidden");
});
/* КОНЕЦ ФОРМУЛ регистрации и логирования пользователя */

// сообщение о том, что Card Number скопирован в буфер обмена
function showNotification(message) {
  const notification = document.createElement("div"); // cоздаем элемент для уведомления
  notification.innerText = message; // устанавливаем текст уведомления
  notification.classList.add("notification"); // добавляем класс для стилизации уведомления

  document.body.appendChild(notification); // добавляем уведомление на страницу

  setTimeout(() => {
    document.body.removeChild(notification); // удаляем уведомление через 3 секунды
  }, 3000);
}

// копирование в буфер обмена
function copyCodeToClipboard() {
  const cardCode = document.querySelector(".card-number");
  const text = cardCode.textContent; // получаем текст элемента рядом с кнопкой
  const tempInput = document.createElement("input"); // создаем временный элемент input

  document.body.appendChild(tempInput); // добавляем временный элемент input на страницу
  tempInput.value = text; // устанавливаем значение временного элемента input равным тексту

  tempInput.select(); // вбираем текст внутри элемента input
  document.execCommand("copy"); // копируем выбранный текст в буфер обмена

  document.body.removeChild(tempInput); // удаляем временный элемент input

  showNotification("Card number copied to clipboard!"); // Показываем уведомление
}
const cardNumberCopyButton = document.querySelector(
  ".card-number__copy-button"
);
cardNumberCopyButton.addEventListener("click", copyCodeToClipboard);

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  addListenersForBurgerMenu();

  const user = getItemFromLocalStorage("user");
  if (user) {
    setUserInfo(user.firstName, user.lastName);
  }
});
