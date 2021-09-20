window.addEventListener("scroll", throttle(parallax, 5));

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
};

function parallax() {
    document.getElementById("svg-wrapper").style.height = (document.getElementById("maincontent").offsetHeight + 400) + "px";

    let scrolled = window.pageYOffset;

    let bl1 = document.getElementById("bl1");
    let bl2 = document.getElementById("bl2");

    bl1.classList.add("parallax");
    bl1.style.transform = "translateY(" + (scrolled * 0.8) + "px)";

    bl2.classList.add("parallax");
    bl2.style.transform = "translateY(" + (scrolled * 0.4) + "px)";
};
