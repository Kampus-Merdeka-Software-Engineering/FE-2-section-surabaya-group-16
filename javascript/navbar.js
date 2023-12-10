// Get references to the burger menu and overlay elements
let burgerMenu = document.getElementById("burger-menu");
let overlay = document.getElementById("menu");

// Function to toggle the burger menu and overlay classes
function toggleMenu() {
  burgerMenu.classList.toggle("close");
  overlay.classList.toggle("overlay");
}

burgerMenu.addEventListener("click", toggleMenu);

window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".topnav");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//Page style
window.addEventListener("DOMContentLoaded", (event) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  const elements = document.querySelectorAll("section:not(#nav, #footer) ");
  elements.forEach((element) => {
    observer.observe(element);
  });
});


let slideIndex = 0;
let slides = document.getElementsByClassName("mainpic-home");
if (slides.length > 0) {
  slides[slideIndex].style.opacity = "1";
}

function showSlides() {
  if (slides.length > 0) {
    slides[slideIndex].style.opacity = "0";
    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    slides[slideIndex].style.opacity = "1";
  }
  setTimeout(showSlides, 4000);
}

showSlides();

