let burgerMenu = document.getElementById("burger-menu");
let overlay = document.getElementById("menu");
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