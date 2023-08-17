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
let activeImage = 0;
let lineWidth;
const images = document.querySelectorAll(".image");
const imagesLine = document.querySelector(".images-line");
const paginationDots = document.querySelectorAll(".pagination-dot");
const paginationDotsTablet = document.querySelectorAll(
  ".pagination-dot_tablet"
);

// Slider desktop pagination
paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", function (event) {
    if (activeImage === index) {
      return;
    }

    activeImage = index;
    if (window.innerWidth > 768) {
      offset = activeImage * 475;
    } else {
      offset = activeImage * 450;
    }

    imagesLine.style.left = -offset + "px";
    updatePaginationDots();
  });
});

// Slider arrows
document
  .querySelector(".arrow-button_prev")
  .addEventListener("click", function () {
    if (offset === 0) {
      return;
    }

    offset -= 450;
    imagesLine.style.left = -offset + "px";
    updatePaginationDots();
  });

document
  .querySelector(".arrow-button_next")
  .addEventListener("click", function () {
    if (offset === 1800) {
      return;
    }

    offset += 450;
    imagesLine.style.left = -offset + "px";
    updatePaginationDots();
  });

// Slider pagination update
function updatePaginationDots() {
  paginationDots.forEach((dot, index) => {
    if (index === activeImage) {
      dot.querySelector(".circle").classList.add("circle_checked");
    } else {
      dot.querySelector(".circle").classList.remove("circle_checked");
    }
  });
}

// Slider adaptation
/*
window.addEventListener('resize', imagesLineWidth);

function imagesLineWidth() {
  lineWidth = document.querySelector(".images-line").offsetWidth;
  imagesLine.style.width = lineWidth * images.length + "px";
  images.forEach((item) => (item.style.width = lineWidth + "px"));
}

imagesLineWidth();
*/
