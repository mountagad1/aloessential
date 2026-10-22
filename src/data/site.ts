/*
 * Who publishes Aloessential, and how to reach them. Single source for the
 * legal notice, contact page, bylines and the distributor dialog.
 * Decisions recorded in docs/seo/ALOESSENTIAL_BASELINE.md (2026-10-16).
 */

export const PUBLISHER = {
  name: "Philippe Cros",
  role: "partenaire indépendant LR Health & Beauty",
  /** Displayed form and E.164 digits for wa.me links. */
  phone: "+33 7 66 98 48 72",
  phoneHref: "tel:+33766984872",
  whatsapp: "33766984872",
} as const;

export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  url: "https://vercel.com",
} as const;

export const TEAM = [
  {
    name: "Mountaga Diallo",
    role: "Rédaction",
    text: "Rédige les articles et les fiches produit d'Aloessential, à partir des sources officielles citées en fin d'article.",
  },
  {
    name: "Philippe Cros",
    role: "Édition et relecture",
    text: "Éditeur du site et directeur de la publication. Relit chaque contenu avant publication et répond aux questions sur l'activité de distributeur LR.",
  },
] as const;

/** Default byline for articles (overridable per article in front matter). */
export const DEFAULT_AUTHOR = "Mountaga Diallo";
export const DEFAULT_REVIEWER = "Philippe Cros";
export const EDITORIAL_TEAM = "l'équipe Aloessential";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${PUBLISHER.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DISTRIBUTOR_MESSAGE = "Bonjour Philippe, je découvre Aloessential et j'aimerais en savoir plus sur l'activité de distributeur LR.";
export const CONTACT_MESSAGE = "Bonjour, je vous contacte depuis le site Aloessential.";
