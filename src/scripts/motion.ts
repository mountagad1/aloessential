/**
 * Scroll reveal, image load fades and the ambient-accent pause.
 *
 * Runs once per page. Everything here is progressive enhancement: the CSS
 * only hides `[data-reveal]` / `img[data-fade]` while <html> has `.motion`,
 * and the inline boot script removes `.motion` if this module never sets
 * `data-reveal-ready`.
 */

const root = document.documentElement;

function readMs(name: string, fallback: number): number {
  const raw = getComputedStyle(root).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith("ms") ? value : raw.endsWith("s") ? value * 1000 : value;
}

/** Most elements entering together get a small stagger; the rest share the last step. */
const MAX_STAGGER_STEPS = 3;

function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)");
  if (!targets.length) return;

  const stagger = readMs("--motion-stagger", 70);
  let pending = targets.length;
  // The first callback reports what is on screen at load. That content is part
  // of the first view (the hero sequence is its entrance) and must not wait.
  let initial = true;

  const observer = new IntersectionObserver(
    (entries) => {
      let step = 0;
      const firstView = initial;
      initial = false;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const passed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !passed) continue;

        if (passed || firstView) {
          // On screen at load, or already scrolled past (anchor jump, restored scroll): show without motion.
          el.classList.add("is-instant");
        } else if (stagger > 0) {
          el.style.setProperty("--reveal-delay", `${Math.min(step, MAX_STAGGER_STEPS) * stagger}ms`);
          step++;
        }

        el.classList.add("is-revealed");
        observer.unobserve(el);
        el.addEventListener("transitionend", () => el.style.removeProperty("--reveal-delay"), { once: true });

        if (--pending === 0) observer.disconnect();
      }
    },
    // Trigger slightly before the element's top reaches the lower edge.
    { rootMargin: "0px 0px -6% 0px", threshold: 0 },
  );

  targets.forEach((el) => observer.observe(el));
}

function initImageFades(): void {
  document.querySelectorAll<HTMLImageElement>("img[data-fade]").forEach((img) => {
    const done = () => img.classList.add("is-loaded");
    if (img.complete) {
      done();
    } else {
      img.addEventListener("load", done, { once: true });
      // A broken image must not stay invisible.
      img.addEventListener("error", done, { once: true });
    }
  });
}

/** Pause the continuous accent while it is off-screen. */
function initAccentPause(): void {
  const accents = document.querySelectorAll<HTMLElement>(".accent-sway");
  if (!accents.length) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("is-paused", !entry.isIntersecting);
    }
  });
  accents.forEach((el) => observer.observe(el));
}

if (root.classList.contains("motion")) {
  initReveal();
  initImageFades();
}
if ("IntersectionObserver" in window) {
  initAccentPause();
}
root.dataset.revealReady = "";
