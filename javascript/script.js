/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("burgerNav");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "navbar.html", true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      navbarContainer.innerHTML = xhr.responseText;
    } else {
      console.error("Failed to load the navbar.");
    }
  };

  xhr.send();
});
