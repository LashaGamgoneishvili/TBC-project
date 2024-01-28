//////// Sticky Navigation ///////////
const header = document.querySelector(".header");
const section = document.querySelector(".section");

export function interObserver() {
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(entries[0]);
      if (ent.isIntersecting) {
        header.classList.add("sticky");
        header.classList.add("fixed-header");
        section.classList.add("section-marin");
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );
  obs.observe(section);
}
