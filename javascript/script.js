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
