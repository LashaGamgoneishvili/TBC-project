/////////////   Hamburger manu    /////////

const menu = document.querySelector(".menu-icon");
const navigation = document.querySelector("nav");
const body = document.querySelector("body");

export function openMenu() {
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
      ),
      body.classList.remove("overflow-hidden"))
    : (body.classList.add("overflow-hidden"),
      (navigation.style = "transform: translateX(0%)"),
      navigation.classList.remove("nav-hide"),
      navigation.classList.add("active-nav"));

  menu.classList.toggle("menu-opened");
}

menu.addEventListener("click", openMenu);
