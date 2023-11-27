// Get references to the burger menu and overlay elements
var burgerMenu = document.getElementById("burger-menu");
var overlay = document.getElementById("menu");

// Function to toggle the burger menu and overlay classes
function toggleMenu() {
  burgerMenu.classList.toggle("close");
  overlay.classList.toggle("overlay");
}

// Add a click event listener to the burger menu
burgerMenu.addEventListener("click", toggleMenu);

let navItems = document.querySelectorAll("li");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    let href = item.querySelector("a").getAttribute("href");
    window.location.href = href;
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var navItems = document.getElementsByClassName("navbar-item");

  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }
});

const slides = document.querySelectorAll("[data-slide]");
const buttons = document.querySelectorAll("[data-button]");

let currSlide = 0;
let maxSlide = slides.length - 1;

const updateCarousel = (number = 0) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - number) * 100}%)`;
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.dataset.button == "next" ? ++currSlide : --currSlide;

    if (currSlide > maxSlide) {
      currSlide = 0;
    } else if (currSlide < 0) {
      currSlide = maxSlide;
    }

    updateCarousel(currSlide);
  });
});

updateCarousel();