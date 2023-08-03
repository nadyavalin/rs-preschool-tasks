document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#burger").addEventListener("click", function()
    {
        document.querySelector(".header").classList.toggle("open")
    })
});

// Меню закрывается при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelector(".header").classList.remove("open")
    }
});

// Меню закрывается при клике вне его
document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu === "click") {
        document.querySelector(".header").classList.remove("open")
    }
});

// Меню закрывается при клике вне его
/*
document.querySelector("#menu").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.querySelector("#burger").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open")
});*/