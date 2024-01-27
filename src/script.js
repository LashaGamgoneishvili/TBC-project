("use strict");
import { accordion } from "./questions.js";
import { interObserver } from "./stickynav.js";
import { openMenu } from "./menu.js";
import { nextSlide, previous } from "./nextslide.js";

// Get the width of the viewport
var screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Scroll to the top of the page before unloading/reloading ///
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});
interObserver();
openMenu();

////////////   Slider Component    /////////////

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

// variables
let setIntervalId;
let intervalId;
let windowWidth;
const maxSlide = slides.length;

// Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const largeSizeScrean = function (sreenSize) {
  // remove mobile size page interval
  if (intervalId) {
    clearInterval(intervalId);
  }

  function goToSlide(slide) {
    slides.forEach((s) => s.classList.add("hide"));
    slides[slide].classList.remove("hide");
  }

  // set interval when screen size is more then 500px
  const setIntervalFunction = () => {
    if (!setIntervalId) {
      setIntervalId = setInterval(() => {
        nextSlide(maxSlide, goToSlide);
      }, 4000);
    }
  };

  setIntervalFunction();

  /////  Event Handlers  ///////
  btnRight.addEventListener("click", function () {
    nextSlide(maxSlide, goToSlide);
    clearInterval(setIntervalId);
  });
  btnLeft.addEventListener("click", function () {
    clearInterval(setIntervalId);
    previous(maxSlide, goToSlide);
  });

  document.addEventListener("keydown", function (e, curSlide) {
    if (e.key === "ArrowRight") nextSlide(maxSlide, goToSlide);
    if (e.key === "ArrowLeft") previous(maxSlide, goToSlide);
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      if (sreenSize > 500) {
        goToSlide(Number(slide));
        clearInterval(setIntervalId);
      }
    }
  });
};

////////// building slider less then 500px size /////////
const slider = document.querySelector(".slider");

///////   main function   ///////
const mobileSliderFunction = function (sreenSize) {
  console.log(windowWidth);
  // large page interval
  if (setIntervalId) {
    clearInterval(setIntervalId);
  }
  //// changing translateX, opacity and blur
  const slideChanging = function slideChanging(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      s.style.opacity = "1";
    });
    // Add blur class to the slider for 1 second
    slides[slide].classList.add("blur");
    setTimeout(() => {
      // Remove blur class after 1 second
      slides[slide].classList.remove("blur");
    }, 500);
  };

  slideChanging(0);

  //// set interval for mobile version
  const startInterval = function (slide) {
    intervalId = setInterval(function () {
      nextSlide(slide, slideChanging);
    }, 4000);
  };

  if (sreenSize < 500 && !intervalId) {
    console.log("gamoneishvili");
    startInterval();
  }

  let touchStartX, touchEndX;

  /////  Event Handlers  ///////
  const mobileSlider = function () {
    for (let i = 0; i < slides.length; i++) {
      slides[i].addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].pageX;
        // clearInterval(intervalId);
      });

      slides[i].addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].pageX;
        // clearInterval(intervalId);
      });

      slides[i].addEventListener("touchend", () => {
        if (touchStartX !== undefined && touchEndX !== undefined) {
          if (touchStartX > touchEndX) {
            nextSlide(i, slideChanging);
          } else {
            previous(i, slideChanging);
          }
          clearInterval(intervalId);
          startInterval(i);
          // Reset touch coordinates
          touchStartX = touchEndX = undefined;
        }
      });
    }
  };

  mobileSlider();

  for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener("touchmove", mobileSlider);
  }

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      if (sreenSize < 500) {
        slideChanging(slide);
      }
    }
  });
};

accordion();

function versionPicker(Width) {
  // Example: Make changes for window widths greater than 768 pixels
  if (Width > 500) {
    largeSizeScrean(Width);
  } else {
    ////// execute mobile main function when screenWidth is less then 500px  ////////
    mobileSliderFunction(Width);
  }
}

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  if (!windowWidth) {
    versionPicker(screenWidth);
  } else {
    versionPicker(windowWidth);
  }
});
