//////// Sticky Navigation ///////////
const header = document.querySelector(".header");
const section = document.querySelector(".section");

export function interObserver() {
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
}
