import type { Locale } from "./locales";

/*
 * Interface text of the product pages, per locale (the rest of the interface
 * is in ./ui.ts). French strings are the site's existing text.
 *
 * `supplementMentions`: the notices national law requires on food supplement
 * labelling (Directive 2002/46/EC, art. 6), in each country's usual wording:
 * France décret n° 2006-352 art. 10; Italy D.Lgs. 169/2004 art. 6 (children
 * under three); Great Britain Food Supplements Regulations 2003; Germany NemV
 * § 4; Spain Real Decreto 1487/2009; Portugal Decreto-Lei 136/2003; Poland
 * rozporządzenie MZ z 9 października 2007 r. To be checked by the reviewer of
 * each language before its first supplement page is published.
 */

export interface ProductStrings {
  /** Header and breadcrumb label of the product listing. */
  products: string;
  kind: { complement: string; soin: string; set: string };
  seoTitle: (name: string) => string;
  readReview: string;
  partnerInline: string;
  learnMore: string;
  sku: (sku: string) => string;
  priceOnShop: string;
  keyPoints: string;
  review: string;
  forWhom: string;
  composition: string;
  ingredient: string;
  quantity: string;
  usage: string;
  precautions: string;
  precautionsNote: string;
  supplementMentions: string[];
  faq: string;
  checkedOn: string;
  checkedAfter: string;
  orderOnShop: string;
  fulfilment: string;
  ourTransparency: string;
  readMore: string;
  shopButton: string;
  shopButtonHidden: (name: string) => string;
  stickyButton: string;
  discover: string;
  calloutEyebrow: string;
  calloutTitle: string;
  calloutNote: string;
  calloutLink: string;
  listingTitle: string;
  listingDescription: string;
  listingEyebrow: string;
  listingHeading: string;
  listingLead: string;
  listingDisclosure: string;
  listingLabel: string;
}

const fr: ProductStrings = {
  products: "Produits",
  kind: { complement: "Complément alimentaire", soin: "Soin", set: "Coffret" },
  seoTitle: (name) => `${name} : composition et avis`,
  readReview: "Lire notre avis",
  partnerInline: "Lien partenaire : nous pouvons percevoir une commission, sans surcoût pour vous.",
  learnMore: "En savoir plus",
  sku: (sku) => `Réf. LR ${sku}`,
  priceOnShop: "Prix et disponibilité sur la boutique officielle",
  keyPoints: "Les points clés",
  review: "Notre avis",
  forWhom: "Pour qui ?",
  composition: "Composition",
  ingredient: "Ingrédient",
  quantity: "Quantité",
  usage: "Mode d'emploi",
  precautions: "Précautions",
  precautionsNote:
    "Ces informations ne remplacent pas l'avis d'un professionnel de santé. Demandez conseil à votre médecin ou pharmacien en cas de grossesse, d'allaitement, de traitement en cours ou de doute.",
  supplementMentions: [
    "Ne pas dépasser la dose journalière recommandée.",
    "Les compléments alimentaires ne doivent pas être utilisés comme substituts d'un régime alimentaire varié et équilibré et d'un mode de vie sain.",
    "Tenir hors de la portée des jeunes enfants.",
  ],
  faq: "Questions fréquentes",
  checkedOn: "Informations produit vérifiées le",
  checkedAfter: "sur la boutique officielle LR. La composition peut évoluer : seul l'étiquetage du produit fait foi.",
  orderOnShop: "Commander sur la boutique LR",
  fulfilment: "Commande, paiement et livraison sont assurés par LR Health & Beauty. Lien partenaire —",
  ourTransparency: "notre transparence",
  readMore: "À lire sur le sujet",
  shopButton: "Voir sur la boutique LR",
  shopButtonHidden: (name) => ` : ${name} (lien partenaire, nouvel onglet)`,
  stickyButton: "Voir le produit",
  discover: "Découvrir",
  calloutEyebrow: "Notre sélection",
  calloutTitle: "Pour aller plus loin",
  calloutNote: "Des produits LR que nous avons étudiés en lien avec ce sujet. Liens partenaires :",
  calloutLink: "en savoir plus",
  listingTitle: "Notre sélection LR",
  listingDescription:
    "Les produits LR Health & Beauty à l'aloe vera et les compléments LR Lifetakt que nous avons étudiés : composition, usage, précautions et avis.",
  listingEyebrow: "Notre sélection",
  listingHeading: "Les produits que nous avons étudiés",
  listingLead:
    "Soins à l'aloe vera et compléments LR Lifetakt : pour chaque produit, sa composition, son mode d'emploi, ses précautions et notre avis, avant de le commander sur la boutique officielle LR.",
  listingDisclosure:
    "Aloessential est partenaire indépendant LR Health & Beauty : les liens vers la boutique sont des liens partenaires.",
  listingLabel: "Liste des produits",
};

const it: ProductStrings = {
  products: "Prodotti",
  kind: { complement: "Integratore alimentare", soin: "Trattamento", set: "Set" },
  seoTitle: (name) => `${name}: composizione e recensione`,
  readReview: "Leggi la nostra recensione",
  partnerInline: "Link partner: potremmo ricevere una commissione, senza costi aggiuntivi per te.",
  learnMore: "Scopri di più",
  sku: (sku) => `Cod. LR ${sku}`,
  priceOnShop: "Prezzo e disponibilità sul negozio ufficiale",
  keyPoints: "I punti chiave",
  review: "La nostra recensione",
  forWhom: "Per chi?",
  composition: "Composizione",
  ingredient: "Ingrediente",
  quantity: "Quantità",
  usage: "Modo d'uso",
  precautions: "Avvertenze",
  precautionsNote:
    "Queste informazioni non sostituiscono il parere di un professionista della salute. Chiedi consiglio al medico o al farmacista in caso di gravidanza, allattamento, terapie in corso o dubbi.",
  supplementMentions: [
    "Non superare la dose giornaliera raccomandata.",
    "Gli integratori non vanno intesi come sostituti di una dieta variata, equilibrata e di uno stile di vita sano.",
    "Tenere fuori dalla portata dei bambini al di sotto dei tre anni di età.",
  ],
  faq: "Domande frequenti",
  checkedOn: "Informazioni sul prodotto verificate il",
  checkedAfter:
    "sulla scheda ufficiale LR. La composizione può cambiare e variare da un paese all'altro: fa fede solo l'etichetta del prodotto.",
  orderOnShop: "Ordina sul negozio LR",
  fulfilment: "Ordine, pagamento e consegna sono gestiti da LR Health & Beauty. Link partner —",
  ourTransparency: "la nostra trasparenza",
  readMore: "Da leggere sull'argomento",
  shopButton: "Vedi sul negozio LR",
  shopButtonHidden: (name) => `: ${name} (link partner, nuova scheda)`,
  stickyButton: "Vedi il prodotto",
  discover: "Scopri",
  calloutEyebrow: "La nostra selezione",
  calloutTitle: "Per approfondire",
  calloutNote: "Prodotti LR che abbiamo esaminato in relazione a questo argomento. Link partner:",
  calloutLink: "scopri di più",
  listingTitle: "La nostra selezione LR",
  listingDescription:
    "I prodotti LR Health & Beauty disponibili in Italia che abbiamo esaminato: composizione, modo d'uso, avvertenze e recensione.",
  listingEyebrow: "La nostra selezione",
  listingHeading: "I prodotti che abbiamo esaminato",
  listingLead:
    "Per ogni prodotto: composizione, modo d'uso, avvertenze e la nostra recensione, prima di ordinarlo sul negozio ufficiale LR Italia.",
  listingDisclosure:
    "Aloessential è partner indipendente di LR Health & Beauty: i link verso il negozio sono link partner.",
  listingLabel: "Elenco dei prodotti",
};

const en: ProductStrings = {
  products: "Products",
  kind: { complement: "Food supplement", soin: "Skincare", set: "Set" },
  seoTitle: (name) => `${name}: ingredients and review`,
  readReview: "Read our review",
  partnerInline: "Partner link: we may earn a commission, at no extra cost to you.",
  learnMore: "Find out more",
  sku: (sku) => `LR ref. ${sku}`,
  priceOnShop: "Price and availability on the official shop",
  keyPoints: "Key points",
  review: "Our review",
  forWhom: "Who is it for?",
  composition: "Ingredients",
  ingredient: "Ingredient",
  quantity: "Amount",
  usage: "How to use",
  precautions: "Precautions",
  precautionsNote:
    "This information does not replace advice from a health professional. Ask your GP or pharmacist if you are pregnant, breastfeeding, taking medicines or unsure.",
  supplementMentions: [
    "Do not exceed the recommended daily dose.",
    "Food supplements should not be used as a substitute for a varied and balanced diet and a healthy lifestyle.",
    "Store out of the reach of young children.",
  ],
  faq: "Frequently asked questions",
  checkedOn: "Product information checked on",
  checkedAfter:
    "on LR's official product sheet. Ingredients can change and may vary between countries: only the product label is binding.",
  orderOnShop: "Order from the LR shop",
  fulfilment: "Orders, payment and delivery are handled by LR Health & Beauty. Partner link —",
  ourTransparency: "our transparency",
  readMore: "Further reading",
  shopButton: "View on the LR shop",
  shopButtonHidden: (name) => `: ${name} (partner link, opens in a new tab)`,
  stickyButton: "View the product",
  discover: "Discover",
  calloutEyebrow: "Our selection",
  calloutTitle: "Going further",
  calloutNote: "LR products we have reviewed in connection with this topic. Partner links:",
  calloutLink: "find out more",
  listingTitle: "Our LR selection",
  listingDescription:
    "The LR Health & Beauty products available in the UK that we have reviewed: ingredients, how to use them, precautions and our review.",
  listingEyebrow: "Our selection",
  listingHeading: "The products we have reviewed",
  listingLead:
    "For each product: its ingredients, how to use it, precautions and our review, before you order it from the official LR UK shop.",
  listingDisclosure: "Aloessential is an independent LR Health & Beauty partner: links to the shop are partner links.",
  listingLabel: "Product list",
};

const de: ProductStrings = {
  products: "Produkte",
  kind: { complement: "Nahrungsergänzungsmittel", soin: "Pflege", set: "Set" },
  seoTitle: (name) => `${name}: Zusammensetzung und Bewertung`,
  readReview: "Unsere Bewertung lesen",
  partnerInline: "Partnerlink: Wir erhalten möglicherweise eine Provision, ohne Mehrkosten für Sie.",
  learnMore: "Mehr erfahren",
  sku: (sku) => `LR-Art.-Nr. ${sku}`,
  priceOnShop: "Preis und Verfügbarkeit im offiziellen Shop",
  keyPoints: "Das Wichtigste",
  review: "Unsere Bewertung",
  forWhom: "Für wen?",
  composition: "Zusammensetzung",
  ingredient: "Zutat",
  quantity: "Menge",
  usage: "Anwendung",
  precautions: "Hinweise",
  precautionsNote:
    "Diese Informationen ersetzen nicht den Rat einer Fachperson. Fragen Sie in Schwangerschaft und Stillzeit, bei laufender Behandlung oder im Zweifel Ihre Ärztin, Ihren Arzt oder Ihre Apotheke.",
  supplementMentions: [
    "Die angegebene empfohlene tägliche Verzehrmenge darf nicht überschritten werden.",
    "Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung und eine gesunde Lebensweise.",
    "Für kleine Kinder unzugänglich aufbewahren.",
  ],
  faq: "Häufige Fragen",
  checkedOn: "Produktinformationen geprüft am",
  checkedAfter:
    "anhand des offiziellen LR-Produktblatts. Die Zusammensetzung kann sich ändern und von Land zu Land abweichen: Maßgeblich ist allein die Kennzeichnung des Produkts.",
  orderOnShop: "Im LR-Shop bestellen",
  fulfilment: "Bestellung, Zahlung und Lieferung erfolgen über LR Health & Beauty. Partnerlink —",
  ourTransparency: "unsere Transparenz",
  readMore: "Mehr zum Thema",
  shopButton: "Im LR-Shop ansehen",
  shopButtonHidden: (name) => `: ${name} (Partnerlink, neuer Tab)`,
  stickyButton: "Zum Produkt",
  discover: "Ansehen",
  calloutEyebrow: "Unsere Auswahl",
  calloutTitle: "Weiterführend",
  calloutNote: "LR-Produkte, die wir zu diesem Thema geprüft haben. Partnerlinks:",
  calloutLink: "mehr erfahren",
  listingTitle: "Unsere LR-Auswahl",
  listingDescription:
    "Die in Deutschland erhältlichen Produkte von LR Health & Beauty, die wir geprüft haben: Zusammensetzung, Anwendung, Hinweise und Bewertung.",
  listingEyebrow: "Unsere Auswahl",
  listingHeading: "Die Produkte, die wir geprüft haben",
  listingLead:
    "Zu jedem Produkt: Zusammensetzung, Anwendung, Hinweise und unsere Bewertung, bevor Sie es im offiziellen LR-Shop Deutschland bestellen.",
  listingDisclosure:
    "Aloessential ist unabhängiger Partner von LR Health & Beauty: Links zum Shop sind Partnerlinks.",
  listingLabel: "Produktliste",
};

const es: ProductStrings = {
  products: "Productos",
  kind: { complement: "Complemento alimenticio", soin: "Cuidado", set: "Set" },
  seoTitle: (name) => `${name}: composición y opinión`,
  readReview: "Leer nuestra opinión",
  partnerInline: "Enlace de afiliado: podemos recibir una comisión, sin coste adicional para ti.",
  learnMore: "Más información",
  sku: (sku) => `Ref. LR ${sku}`,
  priceOnShop: "Precio y disponibilidad en la tienda oficial",
  keyPoints: "Lo esencial",
  review: "Nuestra opinión",
  forWhom: "¿Para quién?",
  composition: "Composición",
  ingredient: "Ingrediente",
  quantity: "Cantidad",
  usage: "Modo de empleo",
  precautions: "Precauciones",
  precautionsNote:
    "Esta información no sustituye la opinión de un profesional sanitario. Consulta a tu médico o farmacéutico si estás embarazada, das el pecho, sigues un tratamiento o tienes dudas.",
  supplementMentions: [
    "No superar la dosis diaria expresamente recomendada.",
    "Los complementos alimenticios no deben utilizarse como sustituto de una dieta equilibrada y un estilo de vida saludable.",
    "Mantener fuera del alcance de los niños más pequeños.",
  ],
  faq: "Preguntas frecuentes",
  checkedOn: "Información del producto comprobada el",
  checkedAfter:
    "en la ficha oficial de LR. La composición puede cambiar y variar de un país a otro: solo hace fe el etiquetado del producto.",
  orderOnShop: "Pedir en la tienda LR",
  fulfilment: "El pedido, el pago y la entrega corren a cargo de LR Health & Beauty. Enlace de afiliado —",
  ourTransparency: "nuestra transparencia",
  readMore: "Para leer sobre el tema",
  shopButton: "Ver en la tienda LR",
  shopButtonHidden: (name) => `: ${name} (enlace de afiliado, nueva pestaña)`,
  stickyButton: "Ver el producto",
  discover: "Descubrir",
  calloutEyebrow: "Nuestra selección",
  calloutTitle: "Para ir más allá",
  calloutNote: "Productos LR que hemos analizado en relación con este tema. Enlaces de afiliado:",
  calloutLink: "más información",
  listingTitle: "Nuestra selección LR",
  listingDescription:
    "Los productos de LR Health & Beauty disponibles en España que hemos analizado: composición, modo de empleo, precauciones y opinión.",
  listingEyebrow: "Nuestra selección",
  listingHeading: "Los productos que hemos analizado",
  listingLead:
    "De cada producto: su composición, su modo de empleo, sus precauciones y nuestra opinión, antes de pedirlo en la tienda oficial de LR España.",
  listingDisclosure:
    "Aloessential es socio independiente de LR Health & Beauty: los enlaces a la tienda son enlaces de afiliado.",
  listingLabel: "Lista de productos",
};

const ptPt: ProductStrings = {
  products: "Produtos",
  kind: { complement: "Suplemento alimentar", soin: "Cuidado", set: "Conjunto" },
  seoTitle: (name) => `${name}: composição e opinião`,
  readReview: "Ler a nossa opinião",
  partnerInline: "Link de parceiro: podemos receber uma comissão, sem custo adicional para ti.",
  learnMore: "Saber mais",
  sku: (sku) => `Ref. LR ${sku}`,
  priceOnShop: "Preço e disponibilidade na loja oficial",
  keyPoints: "Os pontos-chave",
  review: "A nossa opinião",
  forWhom: "Para quem?",
  composition: "Composição",
  ingredient: "Ingrediente",
  quantity: "Quantidade",
  usage: "Modo de utilização",
  precautions: "Precauções",
  precautionsNote:
    "Esta informação não substitui o parecer de um profissional de saúde. Pede conselho ao teu médico ou farmacêutico em caso de gravidez, amamentação, tratamento em curso ou dúvida.",
  supplementMentions: [
    "Não exceder a toma diária recomendada.",
    "Os suplementos alimentares não devem ser utilizados como substitutos de um regime alimentar variado e equilibrado e de um modo de vida saudável.",
    "Manter fora do alcance das crianças.",
  ],
  faq: "Perguntas frequentes",
  checkedOn: "Informação do produto verificada em",
  checkedAfter:
    "na ficha oficial da LR. A composição pode mudar e variar de país para país: só o rótulo do produto faz fé.",
  orderOnShop: "Encomendar na loja LR",
  fulfilment: "A encomenda, o pagamento e a entrega são assegurados pela LR Health & Beauty. Link de parceiro —",
  ourTransparency: "a nossa transparência",
  readMore: "Para ler sobre o tema",
  shopButton: "Ver na loja LR",
  shopButtonHidden: (name) => `: ${name} (link de parceiro, novo separador)`,
  stickyButton: "Ver o produto",
  discover: "Descobrir",
  calloutEyebrow: "A nossa seleção",
  calloutTitle: "Para ir mais longe",
  calloutNote: "Produtos LR que analisámos em relação a este tema. Links de parceiro:",
  calloutLink: "saber mais",
  listingTitle: "A nossa seleção LR",
  listingDescription:
    "Os produtos da LR Health & Beauty disponíveis em Portugal que analisámos: composição, modo de utilização, precauções e opinião.",
  listingEyebrow: "A nossa seleção",
  listingHeading: "Os produtos que analisámos",
  listingLead:
    "Para cada produto: a composição, o modo de utilização, as precauções e a nossa opinião, antes de o encomendares na loja oficial da LR.",
  listingDisclosure:
    "A Aloessential é parceira independente da LR Health & Beauty: os links para a loja são links de parceiro.",
  listingLabel: "Lista de produtos",
};

const pl: ProductStrings = {
  products: "Produkty",
  kind: { complement: "Suplement diety", soin: "Pielęgnacja", set: "Zestaw" },
  seoTitle: (name) => `${name}: skład i opinia`,
  readReview: "Przeczytaj naszą opinię",
  partnerInline: "Link partnerski: możemy otrzymać prowizję, bez dodatkowych kosztów dla Ciebie.",
  learnMore: "Dowiedz się więcej",
  sku: (sku) => `Nr art. LR ${sku}`,
  priceOnShop: "Cena i dostępność w oficjalnym sklepie",
  keyPoints: "Najważniejsze informacje",
  review: "Nasza opinia",
  forWhom: "Dla kogo?",
  composition: "Skład",
  ingredient: "Składnik",
  quantity: "Ilość",
  usage: "Sposób użycia",
  precautions: "Środki ostrożności",
  precautionsNote:
    "Te informacje nie zastępują porady specjalisty. W ciąży, w okresie karmienia piersią, w trakcie leczenia lub w razie wątpliwości zapytaj lekarza lub farmaceutę.",
  supplementMentions: [
    "Nie należy przekraczać zalecanej porcji do spożycia w ciągu dnia.",
    "Suplement diety nie może być stosowany jako substytut (zamiennik) zróżnicowanej diety i zdrowego trybu życia.",
    "Przechowywać w sposób niedostępny dla małych dzieci.",
  ],
  faq: "Najczęstsze pytania",
  checkedOn: "Informacje o produkcie sprawdzone",
  checkedAfter:
    "na podstawie oficjalnej karty produktu LR. Skład może się zmieniać i różnić w zależności od kraju: wiążące jest wyłącznie oznakowanie produktu.",
  orderOnShop: "Zamów w sklepie LR",
  fulfilment: "Zamówienie, płatność i dostawę realizuje LR Health & Beauty. Link partnerski —",
  ourTransparency: "nasza przejrzystość",
  readMore: "Warto przeczytać",
  shopButton: "Zobacz w sklepie LR",
  shopButtonHidden: (name) => `: ${name} (link partnerski, nowa karta)`,
  stickyButton: "Zobacz produkt",
  discover: "Zobacz",
  calloutEyebrow: "Nasz wybór",
  calloutTitle: "Więcej na ten temat",
  calloutNote: "Produkty LR, które przeanalizowaliśmy w związku z tym tematem. Linki partnerskie:",
  calloutLink: "dowiedz się więcej",
  listingTitle: "Nasz wybór produktów LR",
  listingDescription:
    "Produkty LR Health & Beauty dostępne w Polsce, które przeanalizowaliśmy: skład, sposób użycia, środki ostrożności i opinia.",
  listingEyebrow: "Nasz wybór",
  listingHeading: "Produkty, które przeanalizowaliśmy",
  listingLead:
    "Przy każdym produkcie: skład, sposób użycia, środki ostrożności i nasza opinia, zanim zamówisz go w oficjalnym sklepie LR Polska.",
  listingDisclosure:
    "Aloessential jest niezależnym partnerem LR Health & Beauty: linki do sklepu są linkami partnerskimi.",
  listingLabel: "Lista produktów",
};

const PRODUCT_UI: Record<Locale, ProductStrings> = { fr, it, en, de, es, "pt-pt": ptPt, pl };

export function productUi(locale: Locale): ProductStrings {
  return PRODUCT_UI[locale];
}
