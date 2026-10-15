/**
 * Reading progress fallback.
 *
 * Where CSS scroll-driven animations are supported, the bar is driven entirely
 * by `animation-timeline` in global.css and this script does nothing. Elsewhere
 * it maps the same range (article top at viewport top → article bottom at
 * viewport bottom) with one passive scroll listener batched to animation frames.
 */

const article = document.querySelector<HTMLElement>("[data-article]");
const bar = document.querySelector<HTMLElement>("[data-reading-progress]");

if (article && bar && !CSS.supports("animation-timeline: view()")) {
  let start = 0;
  let end = 0;
  let queued = false;

  const measure = () => {
    start = article.getBoundingClientRect().top + window.scrollY;
    end = start + article.offsetHeight - window.innerHeight;
  };

  const update = () => {
    queued = false;
    const progress = end > start ? (window.scrollY - start) / (end - start) : 1;
    bar.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(4));
  };

  const schedule = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  measure();
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    schedule();
  });
  new ResizeObserver(() => {
    measure();
    schedule();
  }).observe(article);
}
