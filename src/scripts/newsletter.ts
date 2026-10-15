/**
 * Newsletter form: client-side validation and honest async feedback.
 *
 * A success message is only shown when the endpoint answers with a 2xx.
 * With no endpoint configured (PUBLIC_NEWSLETTER_ENDPOINT), the form reports
 * that sign-up is unavailable instead of pretending to succeed.
 */

const MESSAGES = {
  empty: "Veuillez saisir votre adresse e-mail.",
  invalid: "Cette adresse e-mail ne semble pas valide. Exemple : prenom@exemple.fr",
  unavailable: "Les inscriptions ne sont pas encore ouvertes. Merci de réessayer bientôt.",
  failed: "L'inscription n'a pas abouti. Vérifiez votre connexion et réessayez.",
  success: "Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.",
} as const;

const TIMEOUT_MS = 10_000;

type State = "error" | "success";

function setup(form: HTMLFormElement): void {
  const input = form.querySelector<HTMLInputElement>("input[type=email]");
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const status = form.querySelector<HTMLElement>("[data-newsletter-status]");
  const label = button?.querySelector<HTMLElement>("[data-label]");
  if (!input || !button || !status || !label) return;

  const idleLabel = label.textContent ?? "";
  let busy = false;

  form.noValidate = true;

  const show = (state: State, message: string) => {
    status.removeAttribute("data-state");
    // Restart the short entrance animation when the same state repeats.
    void status.offsetWidth;
    status.dataset.state = state;
    status.textContent = message;
    input.setAttribute("aria-invalid", String(state === "error"));
  };

  const setBusy = (value: boolean) => {
    busy = value;
    // aria-disabled instead of disabled so keyboard focus stays on the button.
    button.setAttribute("aria-busy", String(value));
    button.setAttribute("aria-disabled", String(value));
    label.textContent = value ? "Inscription…" : idleLabel;
  };

  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true" && input.validity.valid && input.value.trim()) {
      input.setAttribute("aria-invalid", "false");
      status.removeAttribute("data-state");
      status.textContent = "";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (busy) return;

    const email = input.value.trim();
    if (!email) {
      show("error", MESSAGES.empty);
      input.focus();
      return;
    }
    if (!input.validity.valid) {
      show("error", MESSAGES.invalid);
      input.focus();
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      show("error", MESSAGES.unavailable);
      return;
    }

    setBusy(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      show("success", MESSAGES.success);
      input.setAttribute("aria-invalid", "false");
    } catch {
      show("error", MESSAGES.failed);
      input.setAttribute("aria-invalid", "false");
    } finally {
      window.clearTimeout(timer);
      setBusy(false);
    }
  });
}

document.querySelectorAll<HTMLFormElement>("[data-newsletter]").forEach(setup);
