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

window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.topnav');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

//Page style
window.addEventListener('DOMContentLoaded', (event) => {
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
          }
      });
  });

  const elements = document.querySelectorAll('section:not(#nav, #footer) ');
  elements.forEach(element => {
      observer.observe(element);
  });
});

