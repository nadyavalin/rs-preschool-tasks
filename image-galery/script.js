const searchIcon = document.querySelector(".search-icon");
const crossIcon = document.querySelector(".cross-icon");
const gallery = document.querySelector(".gallery");
const errorMessage = document.querySelector(".error-msg");
const searchInput = document.querySelector(".search-input");
const numberInput = document.querySelector(".number-input");

function showLoader() {
  const loading = `<img src="./assets/svg/eclipse.svg">`;
  gallery.innerHTML = loading;
}

function showError(message) {
  errorMessage.style.display = "block";
  errorMessage.innerText = message;
}

function hideError() {
  errorMessage.style.display = "none";
}

function hideLoader() {
  const loadingElement = gallery.querySelector(
    "img[src='./assets/svg/eclipse.svg']"
  );
  if (loadingElement) {
    loadingElement.remove();
  }
}

async function fetchImages(url) {
  try {
    showLoader();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  } catch (error) {
    return showError(error);
  } finally {
    hideLoader();
  }
}

function renderImages(images) {
  gallery.innerHTML = images.reduce(
    (acc, img) =>
      `${acc}<img src="${img.urls.small}" alt="image" class="popup-trigger" data-regular="${img.urls.regular}">`,
    ""
  );
}

numberInput.addEventListener("change", () => {
  const numberValue = numberInput.value;

  if (numberValue > 30 || numberValue < 1) {
    showError("Number should be between 1 and 30");
  } else {
    hideError();
  }
});

searchInput.addEventListener("change", () => {
  const searchValue = searchInput.value;
  if (searchValue !== "") {
    crossIcon.style.display = "block";
  } else {
    crossIcon.style.display = "none";
  }
});

async function searchImages() {
  const numberValue = numberInput.value;
  const searchValue = searchInput.value;

  if (searchValue.trim() !== "") {
    const images = await fetchImages(
      `https://api.unsplash.com/search/photos?per_page=${numberValue}&page=1&query=${searchValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`
    );
    renderImages(images.results);
  }
}

function clearSearchInput() {
  crossIcon.style.display = "none";
  searchInput.value = "";
}

async function onLoad() {
  const images = await fetchImages(
    "https://api.unsplash.com/photos/random?count=30&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU"
  );
  renderImages(images);
}

window.addEventListener("load", onLoad);

crossIcon.addEventListener("click", clearSearchInput);

searchIcon.addEventListener("click", searchImages);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchImages();
  }
});

numberInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchImages();
  }
});

/* Pop up */
const popUpContainer = document.querySelector(".popup-container");
const popUpImage = document.querySelector(".popup img");
const closeBtn = document.querySelector(".close-button");

function showPopUp(image) {
  popUpImage.src = image;
  popUpContainer.style.display = "flex";
}

function hidePopUp() {
  popUpContainer.style.display = "none";
}

gallery.addEventListener("click", (event) => {
  const { target } = event;
  if (target.classList.contains("popup-trigger")) {
    showPopUp(target.dataset.regular);
  }
});

closeBtn.addEventListener("click", (event) => {
  if (!event.target.closest(".popup"));
  hidePopUp();
});

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup-container")) {
    hidePopUp();
  }
});
