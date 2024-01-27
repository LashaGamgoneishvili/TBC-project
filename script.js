"use strict";

// Get the width of the viewport
var screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

//// Scroll to the top of the page before unloading/reloading ///
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

let windowWidth;
window.addEventListener("resize", function () {
  windowWidth = window.innerWidth;
  versionPicker(windowWidth);
});

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  if (!windowWidth) {
    versionPicker(screenWidth);
  } else {
    versionPicker(windowWidth);
  }
});

//////// Sticky Navigation ///////////

const header = document.querySelector(".header");
const section = document.querySelector(".section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting) header.classList.add("sticky");
  },
  {
    root: null,
    threshold: 0,
  }
);
obs.observe(section);

/////////////   Hamburger manu    /////////

const menu = document.querySelector(".menu-icon");
const navigation = document.querySelector("nav");

const openMenu = function () {
  // checking if menu contains "menu-opend" clss
  menu.classList.contains("menu-opened")
    ? // making transform: translateX(100%)
      ((navigation.style = "transform: translateX(100%)"),
      // adding navigation bar clss "nav-hide"
      navigation.classList.add("nav-hide"),
      //waiting for the animation to finish and remove "active-nav" class
      addEventListener(
        "animationend",
        () => {
          navigation.classList.remove("active-nav");
        },
        { once: true }
      ))
    : ((navigation.style = "transform: translateX(0%)"),
      navigation.classList.remove("nav-hide"),
      navigation.classList.add("active-nav"));

  menu.classList.toggle("menu-opened");
};

menu.addEventListener("click", openMenu);

////////////   Slider Component    /////////////

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let setIntervalId;
let intervalId;
let curSlide = 0;
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

const largeSizeScrean = function () {
  console.log("sdljfwosiejdofoa");
  // remove mobile size page interval
  if (intervalId) {
    clearInterval(intervalId);
  }
  function goToSlide(slide) {
    slides.forEach((s) => s.classList.add("hide"));
    slides[slide].classList.remove("hide");
  }

  // next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  // Previous Slide
  const previous = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  // set interval when screen size is more then 500px
  const setIntervalFunction = () => {
    if (!setIntervalId) {
      setIntervalId = setInterval(nextSlide, 4000);
      console.log("lasha");
    }
  };

  setIntervalFunction();

  /////  Event Handlers  ///////
  btnRight.addEventListener("click", function () {
    nextSlide();
    clearInterval(setIntervalId);
  });
  btnLeft.addEventListener("click", function () {
    clearInterval(setIntervalId);
    previous();
  });

  document.addEventListener("keydown", function (e, curSlide) {
    if (e.key === "ArrowLeft") previous(curSlide);
    if (e.key === "ArrowRight") nextSlide(curSlide);
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      if (windowWidth > 500) {
        goToSlide(Number(slide));
        clearInterval(setIntervalId);
      }
    }
  });
};

////////// building slider less then 500px size /////////
const slider = document.querySelector(".slider");

///////   main function   ///////
const mobileSliderFunction = function () {
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

  // next slide for mobile version
  const nextSlideM = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slideChanging(curSlide);
  };

  // Previous Slide for mobile version
  const previousM = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    slideChanging(curSlide);
  };

  //// set interval for mobile version
  const startInterval = function (slide) {
    intervalId = setInterval(function () {
      nextSlideM(slide);
    }, 4000);
  };

  if (windowWidth < 500 && !intervalId) {
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

      // slides[i].addEventListener("touchmove", (e) => {
      //   touchEndX = e.touches[0].pageX;
      //   // clearInterval(intervalId);
      // });

      slides[i].addEventListener("touchend", () => {
        if (touchStartX !== undefined && touchEndX !== undefined) {
          if (touchStartX > touchEndX) {
            nextSlideM(i);
          } else {
            previousM(i);
          }
          // startInterval(i);
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
      if (windowWidth < 500) {
        slideChanging(slide);
      }
    }
  });
};

/////////  question section - accordion //////////

const questions = document.querySelectorAll(".question");
const questionHead = document.querySelectorAll(".question-head");

const accordion = function () {
  for (let i = 0; i < questionHead.length; i++) {
    questionHead[i].addEventListener("click", function () {
      const isActive = questions[i].classList.contains("active");

      // Remove "active" class from all questions
      questions.forEach((res) => res.classList.remove("active"));

      // add "active" class on the clicked question
      if (!isActive) {
        questions[i].classList.add("active");
      } else {
        questions[i].classList.remove("active");
      }
    });
  }
};

accordion();

function versionPicker(Width) {
  // Example: Make changes for window widths greater than 768 pixels
  if (Width > 500) {
    largeSizeScrean();
  } else {
    ////// execute mobile main function when screenWidth is less then 500px  ////////
    mobileSliderFunction();
  }
}
