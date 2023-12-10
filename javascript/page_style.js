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
  