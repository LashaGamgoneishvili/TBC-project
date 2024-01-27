let curSlide = 0;

// next slide
export function nextSlide(maxSlide, callback) {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  callback(curSlide);
}

// Previous Slide
export function previous(maxSlide, callback) {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  callback(curSlide);
}
