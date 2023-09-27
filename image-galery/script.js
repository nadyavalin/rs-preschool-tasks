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

function showError() {
  errorMessage.style.display = "block";
  errorMessage.innerText = "Error fetching images";
}

function hideLoader() {
  const loadingElement = gallery.querySelector("img[src='./assets/svg/eclipse.svg']");
  if (loadingElement) {
    loadingElement.remove();
  }
}

async function fetchImages(url) {
  try {
    showLoader();
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    showError();
    return [];
  } finally {
    hideLoader();
  }
};

function renderImages(images) {
  gallery.innerHTML = images.reduce((acc, img) =>
  `${acc}<img src="${img.cover_photo.urls.small}" alt="image">`, "");
};

numberInput.addEventListener("change", () => {
  const numberValue = numberInput.value;

  if (numberValue > 30 || numberValue < 1) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Number should be between 1 and 30";
  } else {
    errorMessage.style.display = "none";
  }
});

async function searchImages() {
  const numberValue = numberInput.value;
  const searchValue = searchInput.value;

  let url = "";
  if (searchValue.trim() !== "") {
    url = `https://api.unsplash.com/search/collections?per_page=${numberValue}&page=1&query=${searchValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;
    crossIcon.style.display = "block";
  } else {
    crossIcon.style.display = "none";
  }

  const images = await fetchImages(url);
  renderImages(images);
};

function clearSearchInput(){
  crossIcon.style.display = "none";
  searchInput.value = "";
};

function onLoad() {
  const numberValue = numberInput.value;
  const urlRandom = `https://api.unsplash.com/photos/random?count=${numberValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;

  fetchImages(urlRandom)
    .then(images => renderImages(images))
    .catch(error => {
      errorMessage.style.display = "block";
      errorMessage.innerText = error.message;
    });
}

window.addEventListener("load", onLoad);

crossIcon.addEventListener("click", clearSearchInput);

searchIcon.addEventListener("click", searchImages);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchImages();
  }
});
