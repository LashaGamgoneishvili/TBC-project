"use strict";
//// Scroll to the top of the page before unloading/reloading ///

window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
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
  menu.classList.contains("menu-close")
    ? ((navigation.style = "transform: translateX(100%)"),
      navigation.classList.add("nav-hide"),
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

  menu.classList.toggle("menu-close");
};

menu.addEventListener("click", openMenu);

////////////   Slider Component    /////////////

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

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

function goToSlide(slide) {
  slides.forEach((s) => s.classList.add("hide"));
  slides[slide].classList.remove("hide");
  clearInterval(setIntervalId);
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

// Get the width of the viewport
const screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

let setIntervalId;

// set interval when screen size is more then 700px
const setIntervalFunction = () =>
  (setIntervalId = setInterval(nextSlide, 4000));

if (screenWidth > 700) {
  setIntervalFunction();
}
/////  Event Handlers  ///////
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previous);

document.addEventListener("keydown", function (e, curSlide) {
  console.log(e);
  if (e.key === "ArrowLeft") previous(curSlide);
  if (e.key === "ArrowRight") nextSlide(curSlide);
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    if (screenWidth > 700) {
      goToSlide(Number(slide));
      clearInterval(setIntervalId);
    } else {
      slideChanging(slide);
    }
  }
});

////////// building slider less then 700px size /////////
const slider = document.querySelector(".slider");

///////   main function   ///////
const mobileSliderFunction = function () {
  //// changing translateX, opacity and blur
  const slideChanging = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      s.style.opacity = "1";
    });
    // Add blur class to the slider for 1 second
    slides[slide].classList.add("blur");
    setTimeout(() => {
      // Remove blur class after 1 second
      slides[slide].classList.remove("blur");
    }, 700);
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
  let intervalId;

  const startInterval = function () {
    intervalId = setInterval(nextSlideM, 4000);
  };

  if (screenWidth < 700) {
    startInterval();
  }

  let touchStartX, touchEndX;

  /////  Event Handlers  ///////

  const mobileSlider = function () {
    for (let i = 0; i < slides.length; i++) {
      slides[i].addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].pageX;
        clearInterval(intervalId);
      });

      slides[i].addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].pageX;
        clearInterval(intervalId);
      });

      slides[i].addEventListener("touchend", () => {
        if (touchStartX !== undefined && touchEndX !== undefined) {
          if (touchStartX > touchEndX) {
            nextSlideM(i);
          } else {
            previousM(i);
          }
          startInterval();
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
};

if (screenWidth < 700) {
  mobileSliderFunction();
}

/////////  question section - accordion //////////

const questions = document.querySelectorAll(".question");
const questionHead = document.querySelectorAll(".question-head");

const accordion = function () {
  for (let i = 0; i < questionHead.length; i++) {
    questionHead[i].addEventListener("click", function () {
      const isActive = questions[i].classList.contains("active");
      console.log(isActive);

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
