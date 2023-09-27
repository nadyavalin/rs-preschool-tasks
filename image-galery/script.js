const search = document.querySelector(".search-icon");
const cross = document.querySelector(".cross-icon");
const gallery = document.querySelector(".gallery");
const errorMessage = document.querySelector(".error-msg");
const searchInput = document.querySelector(".search-input");
cross.style.display = "none";


async function fetchImages(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    throw new Error("Error fetching images");
  }
};

function displayImages(images) {
  let html = "";
  images.forEach((img) => {
    html += `<img src="${img.cover_photo.urls.small}" alt="image">`;
  });
  gallery.innerHTML = html;
};

function validateNumberInput(numberValue) {
  const check = numberValue >= 1 && numberValue <= 30;
  return check;
};

async function getImages() {
  const numberValue = document.querySelector(".number-input").value;
  const searchValue = document.querySelector(".search-input").value;
  const urlRandom = `https://api.unsplash.com/photos/random?count=${numberValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;

  if (!validateNumberInput(numberValue)) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Number should be between 1 and 30";
    return;
  }

  let url = "";
  if (searchValue.trim() === "") {
    url = urlRandom;
  } else {
    url = `https://api.unsplash.com/search/collections?per_page=${numberValue}&page=1&query=${searchValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;
    cross.style.display = "block";
  }

  try {
    const loading = `<img src="./assets/svg/eclipse.svg">`;
    gallery.innerHTML = loading;
  
    const images = await fetchImages(url);
    displayImages(images);

    errorMessage.style.display = "none";
  } catch (error) {
    errorMessage.style.display = "block";
    errorMessage.innerText = error.message;
  }
};

function clearSearchInput(){
  cross.style.display = "none";
  searchInput.value = "";
};

cross.addEventListener("click", clearSearchInput);

search.addEventListener("click", getImages);

document.querySelector(".search-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getImages();
  }
});

window.addEventListener("load", getImages);