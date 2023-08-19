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
      !event.target.classList.contains("menu") &&
      !event.target.closest(".header__burger-btn") &&
      header.classList.contains("open")
    ) {
      header.classList.remove("open");
    }
  });
});

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