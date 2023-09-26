const search = document.querySelector(".search-icon");
const gallery = document.querySelector(".gallery");
const errorMessage = document.querySelector(".error-msg");
// const inputValue = document.querySelector(".number-input").value;
// const url = `https://api.unsplash.com/photos?per_page=${inputValue}&page=1&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`;

async function getImages() {
    const inputValue = document.querySelector(".number-input").value;
    if(inputValue > 30  || inputValue < 1) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Number should be between 1 and 30";
        return;
    }

    let imgs = "";

    try {
        const loading = `<img src="./assets/svg/eclipse.svg">`;
        gallery.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=Zz_TyElPfeBZoBIZmFlizrKQ9pzbIvRnBQSiz9WXdgU`).then((res) =>
        res.json().then((data) => {
            if (data) {
                data.forEach((img) => {
                    imgs += `
                    <img src="${img.urls.small} alt="image"/>`;
                    /// gallery.style.display = "block";
                    gallery.innerHTML = imgs;
                    errorMessage.style.display = "none";
                })
            }
            })
        );
    } catch (error) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Error, try again later";
    }

}

/*
async function getImages() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        images.src = data.file;
    } catch (error) {
        console.log(error);
    }
}
getImages();

search.addEventListener("click", () => {
    const isLoaded = images.complete;
    if (isLoaded) {
    getImages();
    }
});
*/

search.addEventListener("click", getImages);