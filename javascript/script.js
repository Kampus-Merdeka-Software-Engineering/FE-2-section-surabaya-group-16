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
