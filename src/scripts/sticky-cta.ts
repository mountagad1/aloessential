/**
 * Show the mobile purchase bar only between the hero CTA and the closing CTA.
 * IntersectionObserver only — no scroll listener. While hidden the bar is
 * `inert` + aria-hidden so it never takes focus or duplicates announcements.
 */

const bar = document.querySelector<HTMLElement>("[data-sticky-cta]");
const start = document.querySelector<HTMLElement>("[data-sticky-start]");
const end = document.querySelector<HTMLElement>("[data-sticky-end]");

if (bar && start && "IntersectionObserver" in window) {
  let pastStart = false;
  let endVisible = false; // closing CTA visible or already passed

  const render = () => {
    const show = pastStart && !endVisible;
    bar.classList.toggle("is-visible", show);
    bar.toggleAttribute("inert", !show);
    bar.setAttribute("aria-hidden", String(!show));
  };

  new IntersectionObserver(([entry]) => {
    // Past the start once its bottom has left through the top of the viewport.
    pastStart = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
    render();
  }).observe(start);

  if (end) {
    new IntersectionObserver(([entry]) => {
      // Hidden while the closing CTA is on screen and after scrolling past it.
      endVisible = entry.isIntersecting || entry.boundingClientRect.bottom < 0;
      render();
    }).observe(end);
  }
}
