"use strict";
//// Scroll to the top of the page before unloading/reloading ///

// window.addEventListener("beforeunload", function () {
//   window.scrollTo(0, 0);
// });

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

// Slider;
const slider = function () {
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

  setInterval(nextSlide, 4000);

  // Event Handlers
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
      goToSlide(Number(slide));
    }
  });
};

slider();

/////////  question section - accordion //////////

const questions = document.querySelectorAll(".question");
const questionHead = document.querySelectorAll(".question-head");

const questionArr = Array.from(questions);

console.log(questions);
console.log(questionHead);
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
