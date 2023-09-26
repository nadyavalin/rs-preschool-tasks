const search = document.querySelector(".search-icon");
const gallery = document.querySelector(".gallery");
const errorMessage = document.querySelector(".error-msg");

async function getImages() {
  const numberValue = document.querySelector(".number-input").value;
  const searchValue = document.querySelector(".search-input").value;
  const urlRandom = `https://api.unsplash.com/photos/random?count=${numberValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;
  if (numberValue > 30 || numberValue < 1) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Number should be between 1 and 30";
    return;
  }

  let url = "";
  if (searchValue.trim() === "") {
    url = urlRandom;
  } else {
    url = `https://api.unsplash.com/search/collections?per_page=${numberValue}&page=1&query=${searchValue}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;
  }

  let imgs = "";
  try {
    const loading = `<img src="./assets/svg/eclipse.svg">`;
    gallery.innerHTML = loading;
    const response = await fetch(url);
    const data = await response.json();
        if (data.results) {
          data.results.forEach((img) => {
            imgs += `<img src="${img.cover_photo.urls.small}" alt="image">`;
          });
          gallery.innerHTML = imgs;
          errorMessage.style.display = "none";
        }
      } catch (error) {
    errorMessage.style.display = "block";
    errorMessage.innerText = "Error, try again later";
  }
}

search.addEventListener("click", getImages);
document.querySelector(".search-input").addEventListener("keypress", e => {
    if (e.key === "Enter") {
        getImages();
    }
});
window.addEventListener("DomContentLoaded", getImages);