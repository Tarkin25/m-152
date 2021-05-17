const imageContainer = document.querySelector(".carousel .image-container");
const images = imageContainer.querySelectorAll("img");

const cycle = (index) => {
    if (index < 0) return images.length - 1;
    else if (index > images.length - 1) return 0;
    return index;
}

let index = 0;
let interval = setInterval(() => shift(1), 10_000);

function shift(amount) {
    index = cycle(index + amount);

    for (const image of images) {
        image.className = "";
    }
    
    const current = images[index];
    const other = images[cycle(index - amount)];
    
    const left = amount === 1;

    current.className = `show ${left ? "in-left" : "in-right"}`;
    other.className = `show ${left ? "out-left" : "out-right"}`;
}

const prevButton = document.querySelector(".carousel .buttons button.prev");
prevButton.onclick = () => {
    clearInterval(interval);
    shift(-1);
    interval = setInterval(() => shift(-1), 10_000);
}

const nextButton = document.querySelector(".carousel .buttons button.next");
nextButton.onclick = () => {
    clearInterval(interval);
    shift(1);
    interval = setInterval(() => shift(1), 10_000);
}


