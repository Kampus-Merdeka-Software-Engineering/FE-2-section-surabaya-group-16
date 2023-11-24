const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const sliderInner = document.querySelector(".slider-inner");
let count = 0;

nextBtn.addEventListener("click", () => {
  if (count < sliderInner.children.length - 1) {
    count++;
  } else {
    count = 0;
  }
  sliderInner.style.transform = `translateX(-${count * 100}%)`;
});

prevBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
  } else {
    count = sliderInner.children.length - 1;
  }
  sliderInner.style.transform = `translateX(-${count * 100}%)`;
});
