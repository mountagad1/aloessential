/**
 * Header state and mobile menu.
 *  - `.is-scrolled` once the page leaves the very top (sentinel observer, no scroll handler).
 *  - Disclosure-pattern mobile menu: button with aria-expanded controlling the panel.
 */

const header = document.querySelector<HTMLElement>("[data-site-header]");
const sentinel = document.querySelector<HTMLElement>("[data-header-sentinel]");

if (header && sentinel && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    header.classList.toggle("is-scrolled", !entry.isIntersecting);
  }).observe(sentinel);
}

const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const panel = toggle ? document.getElementById(toggle.getAttribute("aria-controls") ?? "") : null;

if (toggle && panel) {
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const setOpen = (open: boolean, { restoreFocus = false } = {}) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    panel.classList.toggle("is-open", open);
    if (!open && restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      // Only pull focus back if it was inside the menu or on its button.
      const inside = panel.contains(document.activeElement) || document.activeElement === toggle;
      setOpen(false, { restoreFocus: inside });
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (isOpen() && !panel.contains(target) && !toggle.contains(target)) setOpen(false);
  });

  panel.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  });

  // Close when tabbing out of the menu, so a hidden-but-open panel never traps attention.
  panel.addEventListener("focusout", (event) => {
    const next = event.relatedTarget as Node | null;
    if (isOpen() && next && !panel.contains(next) && next !== toggle) setOpen(false);
  });

  window.matchMedia("(min-width: 56rem)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
