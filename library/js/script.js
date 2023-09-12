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
      // !event.target.closest(".header__burger-btn") &&
      // !event.target.closest(".profile__icon") &&
      // !event.target.closest(".btn_after-register") &&
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
const btnProfileDigitalCard = document.querySelector(
  ".get-card__button_profile"
);
const popUpMyProfile = document.querySelector(".pop-up__my-profile");
const popUpCloseBtnMyProfile = document.querySelector(
  ".close-popup__my-profile"
);

// Card Number
const cardNumberProfileMenu = document.querySelector(
  ".card-number__profile-menu"
);
const cardNumberMyProfile = document.querySelector(".card-number__my-profile");

// Log out
const logOutBtn = document.querySelector(".btn__logout");

// PopUp Buy
const buyButtons = document.querySelectorAll(".book-card__button");
const popUpBuyCard = document.querySelector(".pop-up__buy-card");
const popUpCloseBtnBuyCard = document.querySelector(".close-popup__buy-card");

// My profile
const textMyProfileInitials = document.querySelector(
  ".name-lastname__initials"
);
const textMyProfileName = document.querySelector(".name-lastname__text");

// Counter
const visitCounter = document.querySelectorAll(".visit-counter");

// форма Digital Library Cards
const nameInput = document.querySelector(".form__input_name");
const cardNumberInput = document.querySelector(".form__input_card-number");

// Profile menu
// Hide Profile menu when mouse click out of this menu
// Before registration or authorization

document.body.addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("profile-block") &&
    !event.target.closest(".profile__icon") &&
    // !event.target.closest(".profile__no-auth_active") &&
    // !event.target.closest(".header__burger-btn") &&
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
    // !event.target.closest(".profile__with-auth") &&
    // !event.target.closest(".header__burger-btn") &&
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
const checkBocksButton = document.querySelectorAll(".season-block__item-label");
const bookCard = document.querySelectorAll(".book-card");

checkBocksButton.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    const { season } = e.currentTarget.dataset;

    checkBocksButton.forEach((btn) => {
      btn.classList.remove("season-block__item-label_active");
    });
    e.currentTarget.classList.add("season-block__item-label_active");

    bookCard.forEach((el) => {
      if (el.dataset.season === season) {
        el.classList.add("book-card_active");
      } else {
        el.classList.remove("book-card_active");
      }
    });
  });
});

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
  setTimeout(() => {
    noAuth.classList.remove("open");
  }, 500);
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
  setTimeout(() => {
    noAuth.classList.remove("open");
  }, 500);
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
// при нажатии на кнопку My profile и Profile открывается окно My profile
btnMyProfile.addEventListener("click", () => {
  popUpMyProfile.classList.toggle("hidden");
  setTimeout(() => {
    withAuth.classList.remove("open");
  }, 500);
});

btnProfileDigitalCard.addEventListener("click", () => {
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
function setUserInfo(firstName, lastName, cardNumber) {
  const newInitials = `${firstName[0]}${lastName[0]}`;
  const nameLastName = `${firstName} ${lastName}`;
  cardNumberProfileMenu.textContent = cardNumber;
  cardNumberMyProfile.textContent = cardNumber;
  profileAuth.textContent = newInitials;
  profileAuth.title = nameLastName;
  textMyProfileInitials.textContent = newInitials;
  textMyProfileName.textContent = nameLastName;

  // инпуты в форме Digital Library Card
  nameInput.value = `${firstName} ${lastName}`;
  cardNumberInput.value = cardNumber;

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

// блок Digital Library Cards
const titleDigitalCard = document.querySelector(".find-card__title");
const titleGetCard = document.querySelector(".get-card__title");
const textGetCard = document.querySelector(".get-card__description");
const textGetCardAuth = document.querySelector(".get-card__description_auth");
const btnFormDigitalCard = document.querySelector(".form__button");
const userInfo = document.querySelector(".user__counts_small");

function replaceTitles() {
  titleDigitalCard.textContent = titleDigitalCard.textContent.replace(
    "Find your Library card",
    "Your Library card"
  );
  titleGetCard.textContent = titleGetCard.textContent.replace(
    "Get a reader card",
    "Visit your profile"
  );
}

function replaceTitlesBack() {
  titleDigitalCard.textContent = titleDigitalCard.textContent.replace(
    "Your Library card",
    "Find your Library card"
  );
  titleGetCard.textContent = titleGetCard.textContent.replace(
    "Visit your profile",
    "Get a reader card"
  );
}

function changeDigitalLibraryCardBlock() {
  btnFormDigitalCard.classList.add("hidden");
  userInfo.classList.remove("hidden");
  replaceTitles();
  textGetCard.classList.add("hidden");
  textGetCardAuth.classList.remove("hidden");
  btnRegisterGetCardBlock.classList.add("hidden");
  btnLoginGetCardBlock.classList.add("hidden");
  btnProfileDigitalCard.classList.remove("hidden");
}

function changeDigitalLibraryCardBlockBack() {
  btnFormDigitalCard.classList.remove("hidden");
  userInfo.classList.add("hidden");
  replaceTitlesBack();
  textGetCard.classList.remove("hidden");
  textGetCardAuth.classList.add("hidden");
  btnRegisterGetCardBlock.classList.remove("hidden");
  btnLoginGetCardBlock.classList.remove("hidden");
  btnProfileDigitalCard.classList.add("hidden");
  document.querySelector(".form__input_name").value = "";
  document.querySelector(".form__input_card-number").value = "";
}

// обработчик кнопки Check the card
btnFormDigitalCard.addEventListener("click", (event) => {
  event.preventDefault();
  const enteredName = document.querySelector(".form__input_name").value.trim();
  const enteredCardNumber = document.querySelector(".form__input_card-number").value.trim();
  const usersArray = getItemFromLocalStorage("users");
  const foundUser = usersArray.find(
    ({ firstName, lastName, cardNumber }) =>
      (enteredName === firstName ||
        enteredName === lastName ||
        enteredName === `${firstName} ${lastName}` ||
        enteredName === `${lastName} ${firstName}`) &&
      enteredCardNumber === cardNumber
  );

  if (foundUser) {
    btnFormDigitalCard.classList.add("form__button_out");
    btnFormDigitalCard.classList.add("hidden");
    userInfo.classList.remove("hidden");
    setTimeout(() => {
      userInfo.classList.add("hidden");

      btnFormDigitalCard.classList.remove("hidden");
      document.querySelector(".form__input_name").value = "";
      document.querySelector(".form__input_card-number").value = "";
      btnFormDigitalCard.classList.remove("form__button_out");
    }, 10000);
  }
});

// Sing Up / Registration
function signup(event) {
  const firstName = document.querySelector(".firstname").value;
  const lastName = document.querySelector(".lastname").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const cardNumber = generateCardNumber();
  event.preventDefault();

  const user = {
    firstName,
    lastName,
    email,
    password,
    cardNumber,
    visits: 1,
    books: [],
    isLibraryCardBought: false,
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

  visitCounter.forEach((element) => {
    element.textContent = user.visits;
  });

  changeDigitalLibraryCardBlock();
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

// Visit Counter
function updateVisitsCounter() {
  const users = getItemFromLocalStorage("users");
  const currentUser = getItemFromLocalStorage("user");
  const updatedUsers = users.map((user) => {
    if (user.cardNumber === currentUser.cardNumber) {
      user.visits += 1;
    }
    return user;
  });
  currentUser.visits += 1;

  visitCounter.forEach((element) => {
    element.textContent = currentUser.visits;
  });

  setItemToLocalStorage("user", currentUser);
  setItemToLocalStorage("users", updatedUsers);
}

// Books Counter
const ownBooksCounter = document.querySelectorAll(".own-books-counter");
const ownBooksList = document.querySelector(".own-books-list");
const buyForm = document.querySelector(".buy-card__form");

function addBookToListElement(book) {
  const listItem = document.createElement("li");
  listItem.textContent = `${book.title}, ${book.author}`;
  ownBooksList.appendChild(listItem);
}

function addBooksToList() {
  const currentUser = getItemFromLocalStorage("user");
  currentUser.books.forEach(addBookToListElement);
}

function updateBooks(book) {
  const users = getItemFromLocalStorage("users");
  const currentBuyer = getItemFromLocalStorage("user");
  const updatedBoughtBooks = users.map((user) => {
    if (user.cardNumber === currentBuyer.cardNumber) {
      user.books.push(book);
    }
    return user;
  });
  currentBuyer.books.push(book);

  ownBooksCounter.forEach((element) => {
    element.textContent = currentBuyer.books.length;
  });

  setItemToLocalStorage("user", currentBuyer);
  setItemToLocalStorage("users", updatedBoughtBooks);
}

function changeButtonBuyState(button) {
  button.classList.add("book-card__button_own");
  button.textContent = "Own";
  button.disabled = true;
}

// Обработчик события для кнопок Buy
buyButtons.forEach((button) => {
  const user = getItemFromLocalStorage("user");
  const title = button.parentNode.querySelector("h4").textContent;
  const author =
    button.parentNode.querySelector(".book-card__author").textContent;

  if (
    user &&
    user.books.some((book) => book.title === title && book.author === author)
  ) {
    changeButtonBuyState(button);
  }

  button.addEventListener("click", () => {
    const currentBuyer = getItemFromLocalStorage("user");
    if (
      (currentBuyer && currentBuyer.books.length >= 16) ||
      button.classList.contains("book-card__button_own")
    ) {
      return;
    }

    if (!currentBuyer) {
      popUpLogin.classList.remove("hidden");
    } else if (!currentBuyer.isLibraryCardBought) {
      popUpBuyCard.classList.remove("hidden");
    }

    const bookTitle = button.parentNode.querySelector("h4").textContent;
    const bookAuthor = button.parentNode.querySelector(".book-card__author").textContent;

    if (currentBuyer.isLibraryCardBought === true) {
      addBookToListElement({ title: bookTitle, author: bookAuthor });
      updateBooks({ title: bookTitle, author: bookAuthor });
      changeButtonBuyState(button);
    }
  });
});

// Форма покупки книги - исчезает после первой покупки
buyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getItemFromLocalStorage("user");
  if (user.isLibraryCardBought === false) {
    user.isLibraryCardBought = true;
    setItemToLocalStorage("user", user);
  }
  popUpBuyCard.remove();
});

// Log in
function login(event) {
  const loginLog = document.querySelector(".login").value;
  const passwordLog = document.querySelector(".password-log").value;
  const users = getItemFromLocalStorage("users");
  const user = users.find(
    (item) =>
      (item.email === loginLog || item.cardNumber === loginLog) &&
      item.password === passwordLog
  );
  event.preventDefault();

  if (!user) {
    showNotificationLog("Wrong Email or Password");
  } else {
    saveUserState(user);
    updateVisitsCounter();
    popUpLogin.classList.add("hidden");
    popUpRegister.classList.add("hidden");
    profileAuth.classList.remove("hidden");
    withAuthCode.classList.remove("hidden");
    withAuthCode.classList.remove("open");

    changeDigitalLibraryCardBlock();
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
  changeDigitalLibraryCardBlockBack();
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

// Форма Register, доступность кнопки
// Получить инпуты
const firstNameInput = document.querySelector(".firstname");
const lastNameInput = document.querySelector(".lastname");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");

// Получить кнопку
const signupButton = document.querySelector(".form__btn_signup");

// Функция для проверки заполненности всех полей ввода
function checkSingUpInputs() {
  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  return (
    firstNameValue !== "" &&
    lastNameValue !== "" &&
    emailValue !== "" &&
    passwordValue !== ""
  );
}

// Функция для обновления состояния кнопки Sing Up
function updateButtonSingUpState() {
  const isValid = checkSingUpInputs();
  signupButton.disabled = !isValid;
  signupButton.classList.toggle("disabled", !isValid);
}

// Слушать события изменения в полях ввода
firstNameInput.addEventListener("input", updateButtonSingUpState);
lastNameInput.addEventListener("input", updateButtonSingUpState);
emailInput.addEventListener("input", updateButtonSingUpState);
passwordInput.addEventListener("input", updateButtonSingUpState);

// Форма Log in, доступность кнопки
// Получить инпуты
const loginInput = document.querySelector(".login");
const passwordLogInput = document.querySelector(".password-log");

// Получить кнопку
const loginButton = document.querySelector(".form__btn_login");

// Функция для проверки заполненности всех полей ввода
function checkLoginInputs() {
  const loginValue = loginInput.value.trim();
  const passwordLogValue = passwordLogInput.value.trim();
  return loginValue !== "" && passwordLogValue !== "";
}

// Функция для обновления состояния кнопки Log In
function updateButtonLoginState() {
  const isValid = checkLoginInputs();
  loginButton.disabled = !isValid;
  loginButton.classList.toggle("disabled", !isValid);
}

// Слушать события изменения в полях ввода
loginInput.addEventListener("input", updateButtonLoginState);
passwordLogInput.addEventListener("input", updateButtonLoginState);

// Форма BUY A LIBRARY CARD, доступность кнопки
// Получить инпуты
const bankCardNumberInput = document.querySelector(".bank-card-number");
const expirationCodeInput1 = document.querySelector(".expiration-code-1");
const expirationCodeInput2 = document.querySelector(".expiration-code-2");
const cvcInput = document.querySelector(".cvc");
const cardholderNameInput = document.querySelector(".cardholder-name");
const postalCodeInput = document.querySelector(".postal-code");
const cityTownInput = document.querySelector(".city-town");

// Получить кнопку
const buyCardButton = document.querySelector(".buy-card__button");

// Функция для проверки заполненности всех полей ввода
function checkBuyCardInputs() {
  const bankCardNumberValue = bankCardNumberInput.value.trim();
  const expirationCodeValue1 = expirationCodeInput1.value.trim();
  const expirationCodeValue2 = expirationCodeInput2.value.trim();
  const cvcValue = cvcInput.value.trim();
  const cardholderNameValue = cardholderNameInput.value.trim();
  const postalCodeValue = postalCodeInput.value.trim();
  const cityTownValue = cityTownInput.value.trim();

  return (
    bankCardNumberValue !== "" &&
    expirationCodeValue1 !== "" &&
    expirationCodeValue2 !== "" &&
    cvcValue !== "" &&
    cardholderNameValue !== "" &&
    postalCodeValue !== "" &&
    cityTownValue !== ""
  );
}

// Функция для обновления состояния кнопки Buy Card
function updateBuyCardState() {
  const isValid = checkBuyCardInputs();
  buyCardButton.disabled = !isValid;
  buyCardButton.classList.toggle("disabled", !isValid);
}

// Слушать события изменения в полях ввода
bankCardNumberInput.addEventListener("input", updateBuyCardState);
expirationCodeInput1.addEventListener("input", updateBuyCardState);
expirationCodeInput2.addEventListener("input", updateBuyCardState);
cvcInput.addEventListener("input", updateBuyCardState);
cardholderNameInput.addEventListener("input", updateBuyCardState);
postalCodeInput.addEventListener("input", updateBuyCardState);
cityTownInput.addEventListener("input", updateBuyCardState);

function updateMaxlength(input) {
  const value = input.value.replace(/ /g, "").trim(); // Удалить все пробелы из введенного значения
  const maxLength = value.length <= 19 ? 19 : 16; // Установить значение maxLength в зависимости от длины значения

  input.maxLength = maxLength;

  if (value.length > 16) {
    input.value = value.substring(0, 16);
  }
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  addListenersForBurgerMenu();

  const user = getItemFromLocalStorage("user");
  if (user) {
    setUserInfo(user.firstName, user.lastName, user.cardNumber);

    visitCounter.forEach((element) => {
      element.textContent = user.visits;
    });

    ownBooksCounter.forEach((element) => {
      element.textContent = user.books.length;
    });

    addBooksToList();
    changeDigitalLibraryCardBlock();
  }
});
