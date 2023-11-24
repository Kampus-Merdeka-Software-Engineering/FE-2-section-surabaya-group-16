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

// JavaScript untuk menangani efek di-scroll
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".topnav").classList.add("scrolled");
  } else {
    document.querySelector(".topnav").classList.remove("scrolled");
  }
}

document.getElementById("bookNow").onclick = function () {
  location.href = "rooms.html";
};
let navItems = document.querySelectorAll("li");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    let href = item.querySelector("a").getAttribute("href");
    window.location.href = href;
  });
});


//ini js slide
const slides = document.querySelectorAll("[data-slide]");
const buttons = document.querySelectorAll("[data-button]");

let currSlide = 0;
let maxSlide = slides.length - 1;

const updateCaousel = (number = 0) => {
  slides.forEach((facility, index) => {
    const distance = index - number;
    const scale = distance === 0 ? 1.1 : 0.9; // Adjust the scale values as needed
    const zIndex = distance === 0 ? 1 : 0; // Ensure the active slide is on top

    facility.style.transform = `translateX(${distance * 10}%) scale(${scale})`;
    facility.style.zIndex = zIndex;
  });
}



buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.dataset.button == 'next' ? ++currSlide : --currSlide;

    if (currSlide > maxSlide){
      currSlide = 0;
    } else if (currSlide < 0){
      currSlide = maxSlide;
    }
    updateCaousel(currSlide);
  })
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

function applyFilter() {
  // Get selected values
  var roomType = document.getElementById("filter-room-type").value;
  var roomCount = document.getElementById("filter-room-count").value;
  var checkInDate = document.getElementById("filter-check-in").value;

  // Implement your filtering logic here
  // For now, you can log the selected values to the console
  console.log("Room Type:", roomType);
  console.log("Number of Rooms:", roomCount);
  console.log("Check-in Date:", checkInDate);

  // You can use these values to filter and update the room list accordingly
  // For example, you can hide/show room elements based on the filter criteria
}
