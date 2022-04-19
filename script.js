"use strict";

// Elements
const btnHome = document.getElementById("myButton");
const btns = document.querySelectorAll("#act-Btn");
const modalBack = document.querySelector(".modal-shadow");
const modal = document.querySelector(".modal-container");
const bookBtn = document.querySelector(".bookBtn");
const btnCloseModal = document.querySelector(".btn--close-modal");
const overlay = document.querySelector(".modal-shadow");
const placeToScrollTo = document.querySelector("#home-paper");
const feedback = document.querySelector(".message");
const usernameInput = document.querySelector(".usernameInput");
const dateInput = document.querySelector(".dateSelect");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

// hamburger menu
function myFunction() {
  var x = document.querySelector(".nav__links");
  if (x.style.display === "block") {
    x.style.display = "none";
    nav.style.height = '';
  } else {
    x.style.display = "block";
    nav.style.height = '10rem'
  }
}

const openModal = function () {
  modal.classList.remove("hidden");
  modalBack.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  modalBack.classList.add("hidden");
};

// delay function by 1.5seconds
const delay = 1500;

btnHome.addEventListener("click", function (e) {
  e.preventDefault();
  openModal();
});

btnCloseModal.addEventListener("click", closeModal);

bookBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //   set timeout function for submit button
  setTimeout(function () {
    feedback.textContent = "You will receive a confirmation email shortly 🎊";
  }, delay);

  setTimeout(function () {
    usernameInput.value = dateInput.value = feedback.textContent = "";
    closeModal();
  }, 4000);
});

// Close modal with 'escape' keypad
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// sticky navbar
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

// Implementing page navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Carousel
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const sliders = document.querySelector('.slider');

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};

slider();
