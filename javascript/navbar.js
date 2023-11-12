// Get references to the burger menu and overlay elements
var burgerMenu = document.getElementById('burger-menu');
var overlay = document.getElementById('menu');

// Function to toggle the burger menu and overlay classes
function toggleMenu() {
  burgerMenu.classList.toggle("close");
  overlay.classList.toggle("overlay");
}

// Add a click event listener to the burger menu
burgerMenu.addEventListener('click', toggleMenu);
