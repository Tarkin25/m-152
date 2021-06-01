const elements = document.querySelectorAll(".animate-scroll");

elements[0].classList.add("slide-in");

for (const element of elements) {

    const breakpointIn = element.offsetTop - element.clientHeight;
    const breakpointOut = element.offsetTop;

    document.addEventListener("scroll", e => {
        if (window.scrollY >= breakpointIn) {
            element.classList.add("slide-in");
        }
    })
}