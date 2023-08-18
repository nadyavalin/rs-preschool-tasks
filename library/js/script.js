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
let lineWidth = 450;

const images = document.querySelectorAll(".image");
const imagesLine = document.querySelector(".images-line");
const paginationDots = document.querySelectorAll(".pagination-dot");
const arrows = document.querySelectorAll(".arrow-button");
const arrowPrev = document.querySelector(".arrow-button_prev");
const arrowNext = document.querySelector(".arrow-button_next");

// Slider desktop pagination
paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", function (event) {
    if (activeImageIndex === index.length - 1) {
      return;
    }

    activeImageIndex = index;
    if (window.innerWidth > 768) {
      offset = activeImageIndex * 475;
    } else {
      offset = activeImageIndex * 450;
    }

    imagesLine.style.left = -offset + "px";
    updatePaginationDots();
  });
});

// Slider arrows for Prev
arrowPrev.addEventListener("click", function () {
  if (offset === 0) {
    // paginationDots[index].classList.add("pagination-dot_checked"); // не работает
    return;
  }
    // paginationDots[index].classList.remove("pagination-dot_checked"); // не работает

  offset -= lineWidth;
  imagesLine.style.left = -offset + "px";
  updatePaginationDots();
});

// Slider arrows for Next
arrowNext.addEventListener("click", function () {
  if (offset === 1800) {
    // paginationDots[index].classList.add("pagination-dot_checked"); // не работает
    return;
  }
  // paginationDots[index].classList.remove("pagination-dot_checked"); // не работает

  offset += lineWidth;
  imagesLine.style.left = -offset + "px";
  updatePaginationDots();
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

// Slider arrows update // не работает
/*
function updateArrows() {
  arrows.forEach((arrow, index) => {
    if (index === activeImageIndex) {
      arrowPrev.classList.remove("arrow-button_stop");
      arrowNext.classList.remove("arrow-button_stop");
    } else {
      arrowPrev.classList.add("arrow-button_stop");
      arrowNext.classList.add("arrow-button_stop");
    }
  });
}
*/

// Slider adaptation
/* window.addEventListener('resize', imagesLineWidth);
function imagesLineWidth() {
  lineWidth = document.querySelector(".images-line").offsetWidth;
  imagesLine.style.width = lineWidth * images.length + "px";
  images.forEach((item) => (item.style.width = lineWidth + "px"));
}
imagesLineWidth();
*/