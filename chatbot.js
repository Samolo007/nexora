/* =========================================================
   NEXO – assistant virtuel NEXORA (FR + EN, 100 % navigateur)
   Pour modifier : éditez CONTACT et la liste FAQ ci-dessous.
========================================================= */

// Coordonnées utilisées dans les réponses de l’assistant.
const CONTACT = {
  phone: "+237 673 477 264",
  email: "nexoratech@outlook.fr",
  whatsapp: "https://wa.me/237673477264",
};

/* ---------- Textes de l’interface ---------- */
const UI = {
  fr: { subtitle: "Posez-nous votre question", welcome: "Bonjour ! Comment puis-je vous aider ?", placeholder: "Écrivez votre question…", send: "Envoyer", toggle: "Une question ?", close: "Fermer la conversation", label: "Votre question", reminder: "Pour rappel : " },
  en: { subtitle: "Ask us your question", welcome: "Hello! How can I help you?", placeholder: "Type your question…", send: "Send", toggle: "Any questions?", close: "Close the conversation", label: "Your question", reminder: "As a reminder: " },
};

/* ---------- Messages standards ---------- */
const MSG = {
  greeting: {
    fr: `Bonjour ! Je suis l’assistant virtuel de NEXORA. Je peux vous renseigner sur nos services (sites web, boutiques en ligne, réservation…), notre façon de travailler ou la manière de nous contacter. Que souhaitez-vous savoir ?`,
    en: `Hello! I’m NEXORA’s virtual assistant. I can tell you about our services (websites, online stores, booking systems…), how we work, or how to reach us. What would you like to know?`,
  },
  thanks: {
    fr: `Avec plaisir ! N’hésitez pas si vous avez d’autres questions.`,
    en: `You’re welcome! Feel free to ask if you have any other questions.`,
  },
  bye: {
    fr: `Merci de votre visite et à bientôt chez NEXORA !`,
    en: `Thank you for visiting, and see you soon at NEXORA!`,
  },
  escalate: {
    fr: `Votre demande nécessite un accompagnement plus précis de notre équipe. Je vous invite à contacter notre service client afin qu’un conseiller puisse vous apporter une réponse adaptée.`,
    en: `Your request needs more precise support from our team. Please contact our customer service so that an advisor can give you a suitable answer.`,
  },
};

/* ---------- Questions qui vont TOUJOURS au service client ---------- */
const ESCALATE_TRIGGERS = [
  // FR
  "reduction", "remise", "rabais", "negocier", "negociation", "moins cher",
  "reclamation", "pas satisfait", "insatisfait", "insatisfaite", "mecontent", "decu",
  "contrat", "facture", "partenariat", "collaboration", "collaborer", "partenaire",
  "projet en cours",
  // EN
  "discount", "negotiate", "cheaper", "complaint", "dissatisfied", "unhappy",
  "contract", "invoice", "partnership", "collaborate", "partner", "ongoing project", "project in progress",
];

/* ---------- Base de connaissances ----------
   triggers = façons de poser la question (minuscules, sans accents, sans ponctuation) */
const FAQ = [
  { id: 1,
    fr: ["qu est ce que nexora", "c est quoi nexora", "qui etes vous", "qui est nexora", "presentation", "presentez vous", "parlez moi de nexora", "nexora c est quoi"],
    en: ["what is nexora", "who are you", "who is nexora", "about nexora", "tell me about nexora", "about you", "introduce yourself"],
    a: {
      fr: `NEXORA est une agence de solutions numériques et d’accompagnement digital. Nous aidons les entreprises et les entrepreneurs à développer leur présence en ligne et à améliorer leurs activités grâce aux outils numériques.`,
      en: `NEXORA is a digital solutions and digital support agency. We help businesses and entrepreneurs grow their online presence and improve their operations through digital tools.`,
    } },
  { id: 2,
    fr: ["services", "quels services", "que proposez vous", "que faites vous", "vous faites quoi", "prestations", "offres", "activites", "domaines"],
    en: ["services", "what services", "what do you offer", "what do you do", "what do you provide", "what can you do", "offers", "offer"],
    a: {
      fr: `Nous proposons notamment la création de sites web, les solutions e-commerce, les systèmes de réservation, le développement de solutions numériques adaptées aux entreprises et l’accompagnement dans leurs projets de digitalisation.`,
      en: `We offer website creation, e-commerce solutions, booking systems, the development of digital solutions tailored to businesses, and support with digitalization projects.`,
    } },
  { id: 3,
    fr: ["a qui s adressent", "a qui", "pour qui", "qui peut faire appel", "vos clients", "public cible"],
    en: ["who is it for", "who are your services for", "who can use", "your clients", "target audience", "for whom", "who do you work with"],
    a: {
      fr: `Nos services s’adressent aux entrepreneurs, petites et moyennes entreprises, commerces, établissements et organisations qui souhaitent développer ou améliorer leur présence et leurs activités numériques.`,
      en: `Our services are designed for entrepreneurs, small and medium-sized businesses, shops, establishments and organizations that want to develop or improve their digital presence and activities.`,
    } },
  { id: 4,
    fr: ["quels pays", "quel pays", "dans quels pays", "pays", "ou etes vous", "ou etes vous situe", "situe", "situes", "localisation", "adresse", "basee", "ou se trouve", "intervenez", "afrique", "france", "cameroun", "senegal", "cote d ivoire", "ville"],
    en: ["which countries", "what countries", "countries", "country", "where are you", "where are you located", "where are you based", "located", "location", "address", "based", "where is", "operate", "africa", "france"],
    a: {
      fr: `NEXORA est basée en France et développe des projets destinés notamment aux marchés francophones africains. Pour connaître les possibilités d’accompagnement dans votre pays, contactez notre équipe.`,
      en: `NEXORA is based in France and develops projects aimed in particular at French-speaking African markets. To find out what support is available in your country, please contact our team.`,
    } },
  { id: 5,
    fr: ["contacter", "contact", "joindre", "whatsapp", "telephone", "numero", "email", "mail", "formulaire", "appeler", "coordonnees"],
    en: ["contact", "contact you", "contact details", "reach you", "reach", "phone", "phone number", "number", "email", "mail", "form", "call you", "call", "whatsapp"],
    a: {
      fr: `Vous pouvez nous écrire à ${CONTACT.email} ou nous contacter sur WhatsApp au ${CONTACT.phone}.`,
      en: `Email us at ${CONTACT.email} or reach us on WhatsApp at ${CONTACT.phone}.`,
    } },
  { id: 6,
    fr: ["creez vous des sites", "creer un site", "creation de site", "creation de sites", "site web", "sites web", "site vitrine", "faire un site", "faites vous des sites", "site internet"],
    en: ["create websites", "build websites", "build a website", "make a website", "website", "websites", "web site", "web design", "web development", "showcase website", "do you make websites"],
    a: {
      fr: `Oui ! Nous concevons des sites web modernes, adaptés aux besoins des entreprises : sites vitrines, sites de présentation, sites professionnels et autres solutions web.`,
      en: `Yes! We design modern websites tailored to business needs: showcase sites, presentation sites, professional websites and other web solutions.`,
    } },
  { id: 7,
    fr: ["boutique", "boutique en ligne", "e commerce", "ecommerce", "vendre en ligne", "magasin en ligne", "site marchand"],
    en: ["online store", "online shop", "e commerce", "ecommerce", "shop", "store", "sell online", "webshop"],
    a: {
      fr: `Oui, nous pouvons étudier la création d’une boutique en ligne permettant de présenter vos produits et de faciliter les demandes ou les achats de vos clients, selon les fonctionnalités souhaitées.`,
      en: `Yes, we can look into creating an online store to showcase your products and make it easier for your customers to make requests or purchases, depending on the features you want.`,
    } },
  { id: 8,
    fr: ["reservation", "reservations", "reserver", "systeme de reservation", "booking", "restaurant", "hotel", "hebergement", "rendez vous en ligne"],
    en: ["booking", "bookings", "booking system", "reservation", "reservations", "reserve", "book", "restaurant", "hotel", "accommodation", "appointment", "appointments"],
    a: {
      fr: `Oui. Nous pouvons concevoir des solutions de réservation adaptées à différents secteurs d’activité, notamment les restaurants, les établissements d’hébergement et les services.`,
      en: `Yes. We can design booking solutions suited to different business sectors, including restaurants, accommodation providers and service businesses.`,
    } },
  { id: 9,
    fr: ["application", "appli", "plateforme", "app mobile", "logiciel", "sur mesure", "personnalise", "personnalisee"],
    en: ["app", "application", "mobile app", "platform", "software", "custom", "custom solution", "tailor made"],
    a: {
      fr: `Nous pouvons étudier le développement de plateformes et de solutions numériques personnalisées en fonction de votre activité et de vos besoins.`,
      en: `We can look into developing custom platforms and digital solutions based on your business and your needs.`,
    } },
  { id: 10,
    fr: ["stock", "stocks", "gestion de stock", "inventaire"],
    en: ["stock", "stock management", "inventory", "inventory management"],
    a: {
      fr: `Oui, nous étudions des solutions numériques permettant aux entreprises de mieux organiser et suivre leurs stocks. Les fonctionnalités dépendent du projet.`,
      en: `Yes, we look into digital solutions that help businesses organize and track their stock better. The features depend on the project.`,
    } },
  { id: 11,
    fr: ["automatisation", "automatiser", "automatisations", "automatique", "outils numeriques"],
    en: ["automation", "automate", "automating", "automated", "automatic", "digital tools"],
    a: {
      fr: `Nous pouvons étudier l’intégration d’outils numériques et l’automatisation de certaines tâches afin de simplifier les opérations et d’améliorer l’organisation des entreprises.`,
      en: `We can look into integrating digital tools and automating certain tasks to simplify operations and improve how businesses are organized.`,
    } },
  { id: 12,
    fr: ["digitaliser", "digitalisation", "numeriser", "transformation digitale", "m aider a digitaliser", "digitaliser mon entreprise", "passer au numerique"],
    en: ["digitalize", "digitalise", "digitalization", "digitalisation", "digitize", "digitise", "digital transformation", "go digital", "help me digitalize", "digitalize my business"],
    a: {
      fr: `Bien sûr ! Nous pouvons vous accompagner dans l’identification de vos besoins et vous proposer une solution numérique adaptée à votre activité. Vous pouvez nous présenter votre projet afin que notre équipe l’étudie.`,
      en: `Of course! We can help you identify your needs and suggest a digital solution suited to your business. You can tell us about your project so that our team can look into it.`,
    } },
  { id: 13, price: true,
    fr: ["combien coute", "combien ca coute", "combien cela coute", "combien pour", "combien faut il", "prix", "tarif", "tarifs", "cout", "budget", "cher", "coute"],
    en: ["how much does", "how much is", "how much for", "how much will", "cost", "costs", "price", "prices", "pricing", "rate", "rates", "budget", "expensive"],
    a: {
      fr: `Le tarif dépend du type de site, des fonctionnalités demandées et de la complexité du projet. Chaque demande est étudiée individuellement. Contactez notre équipe pour obtenir une proposition adaptée à vos besoins.`,
      en: `The price depends on the type of website, the features requested and the complexity of the project. Each request is assessed individually. Contact our team to get a proposal tailored to your needs.`,
    } },
  { id: 14,
    fr: ["devis", "obtenir un devis", "demander un devis"],
    en: ["quote", "quotation", "get a quote", "request a quote", "estimate"],
    a: {
      fr: `Il vous suffit de nous présenter votre activité et votre projet à travers nos moyens de contact. Notre équipe étudiera votre demande et vous communiquera une proposition adaptée.`,
      en: `Simply tell us about your business and your project through our contact options. Our team will review your request and send you a tailored proposal.`,
    } },
  { id: 15,
    fr: ["delai", "delais", "combien de temps", "duree", "rapidement", "quand sera", "temps de realisation"],
    en: ["how long", "how long does it take", "how much time", "delivery time", "turnaround", "timeline", "deadline", "duration", "how fast"],
    a: {
      fr: `Les délais varient selon la nature du projet, les fonctionnalités souhaitées et les éléments à fournir. Une estimation vous sera communiquée après l’étude de votre demande.`,
      en: `Timelines vary depending on the nature of the project, the features you want and the materials to be provided. An estimate will be given after we review your request.`,
    } },
  { id: 16,
    fr: ["paiement", "payer", "modalites", "modalites de paiement", "mobile money", "orange money", "acompte", "reglement", "comment payer"],
    en: ["payment", "payments", "pay", "payment methods", "payment terms", "payment options", "mobile money", "deposit", "how to pay"],
    a: {
      fr: `Les modalités de paiement sont définies en fonction du projet et précisées dans la proposition commerciale ou l’accord conclu avec le client. Pour obtenir des informations précises, contactez notre équipe.`,
      en: `Payment terms are set according to the project and specified in the commercial proposal or the agreement made with the client. For precise information, please contact our team.`,
    } },
  { id: 17,
    fr: ["demarrer", "commencer", "debuter", "lancer un projet", "nouveau projet", "demarche", "comment demarrer", "comment commencer"],
    en: ["start", "get started", "begin", "start a project", "new project", "how to start", "how do i start", "how do we start"],
    a: {
      fr: `C’est simple ! Présentez-nous votre activité, votre besoin et votre objectif. Notre équipe prendra connaissance de votre demande, échangera avec vous et vous proposera une solution adaptée.`,
      en: `It’s simple! Tell us about your business, your need and your goal. Our team will review your request, discuss it with you and propose a suitable solution.`,
    } },
  { id: 18,
    fr: ["avancement", "suivre", "suivi", "suivi de mon projet", "etat de mon projet", "ou en est mon projet"],
    en: ["progress", "track", "tracking", "project status", "status of my project", "follow my project", "where is my project"],
    a: {
      fr: `Pour connaître l’état d’avancement de votre projet, contactez directement le membre de notre équipe chargé de votre suivi ou notre service client.`,
      en: `To find out how your project is progressing, please contact the team member in charge of your follow-up directly, or our customer service.`,
    } },
  { id: 19,
    fr: ["apres livraison", "assistance", "maintenance", "support", "apres vente", "sav", "suivi apres"],
    en: ["after delivery", "after sales", "after sale", "after launch", "support", "maintenance", "assistance", "after sales support"],
    a: {
      fr: `Les possibilités d’assistance et de suivi après livraison dépendent des conditions prévues pour chaque projet. Contactez notre équipe pour connaître les modalités applicables à votre prestation.`,
      en: `Support and follow-up options after delivery depend on the terms set for each project. Contact our team to find out what applies to your service.`,
    } },
  { id: 20,
    fr: ["probleme", "bug", "ne marche pas", "ne fonctionne pas", "erreur", "panne", "en panne", "aide", "mon site ne marche pas", "j ai un probleme"],
    en: ["problem", "issue", "bug", "not working", "does not work", "doesn t work", "error", "down", "help", "my website is not working", "i have a problem", "i have an issue"],
    a: {
      fr: `Nous vous invitons à contacter notre service client en décrivant le problème rencontré. Si possible, joignez une capture d’écran afin de faciliter son identification et sa prise en charge.`,
      en: `Please contact our customer service and describe the problem you are facing. If possible, attach a screenshot to help us identify it and handle it.`,
    } },
];

const SMALLTALK = {
  greeting: ["bonjour", "bonsoir", "salut", "hello", "hi", "hey", "coucou", "bjr", "slt", "good morning", "good afternoon", "good evening"],
  bye: ["au revoir", "aurevoir", "a bientot", "bonne journee", "bonne soiree", "bye", "goodbye", "see you", "see you soon", "have a nice day"],
  thanks: ["merci", "thanks", "thank you", "thx"],
};

/* ---------- Détection de langue ---------- */
const WORDS = {
  fr: "bonjour bonsoir salut vous votre vos quels quel quelle est que qui comment combien pour des les une je mon ma sont etes faites avez proposez peut puis pouvez ou du de la le et en ca cela ceci".split(" "),
  en: "hello hi hey you your what which how much do does the is are can i my for to of and have offer provide this that".split(" "),
};

function siteLang() {
  let l = "";
  try { l = window.nexoraLanguage?.get?.() || ""; } catch (e) {}
  l = (l || document.documentElement.lang || "fr").toLowerCase().slice(0, 2);
  return l === "fr" ? "fr" : l === "en" ? "en" : l === "es" ? "en" : "fr";
}

function detectLang(norm, hint) {
  const tokens = norm.trim().split(" ");
  const count = (list) => tokens.filter((t) => list.includes(t)).length;
  const fr = count(WORDS.fr), en = count(WORDS.en);
  if (fr > en) return "fr";
  if (en > fr) return "en";
  return hint || siteLang();
}

/* ---------- Moteur de réponse ---------- */
function normalize(text) {
  return " " + text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'`´-]/g, " ")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim() + " ";
}

const hasPhrase = (norm, p) => norm.includes(" " + p + " ");
const score = (norm, list) => list.reduce((s, t) => (hasPhrase(norm, t) ? s + t.split(" ").length : s), 0);

function contactLines() {
  const lines = [];
  if (CONTACT.phone) lines.push(`📞 ${CONTACT.phone}`);
  if (CONTACT.email) lines.push(`📧 ${CONTACT.email}`);
  if (CONTACT.whatsapp) lines.push(`💬 WhatsApp : ${CONTACT.whatsapp}`);
  return lines.length ? "\n\n" + lines.join("\n") : "";
}

function getAnswer(question) {
  const norm = normalize(question);

  // Indice de langue d’après les formulations reconnues
  const scored = FAQ.map((e) => ({ e, sFr: score(norm, e.fr), sEn: score(norm, e.en) }))
    .map((x) => ({ ...x, s: x.sFr + x.sEn }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const top = scored[0];
  const hint = top ? (top.sFr > top.sEn ? "fr" : top.sEn > top.sFr ? "en" : null) : null;
  const lang = detectLang(norm, hint);

  if (ESCALATE_TRIGGERS.some((t) => hasPhrase(norm, t))) {
    return { text: MSG.escalate[lang] + contactLines(), key: "escalate", lang };
  }

  if (top) {
    // Question de prix + service précis : on répond sur le service puis sur le tarif
    const service = scored.find((x) => !x.e.price);
    const priceHit = scored.find((x) => x.e.price);
    if (service && priceHit) {
      return { text: service.e.a[lang] + "\n\n" + priceHit.e.a[lang], key: service.e.id, lang };
    }
    return { text: top.e.a[lang], key: top.e.id, lang };
  }

  const isSmall = (list) => list.some((t) => hasPhrase(norm, t));
  if (isSmall(SMALLTALK.greeting)) return { text: MSG.greeting[lang], key: "greeting", lang };
  if (isSmall(SMALLTALK.bye)) return { text: MSG.bye[lang], key: "bye", lang };
  if (isSmall(SMALLTALK.thanks)) return { text: MSG.thanks[lang], key: "thanks", lang };

  return { text: MSG.escalate[lang] + contactLines(), key: "escalate", lang };
}

/* ---------- Interface du widget ---------- */
const chatWidget = document.createElement("section");
chatWidget.className = "chat-widget";
chatWidget.innerHTML = `
  <section class="chat-panel" id="nexora-chat-panel" aria-label="Nexo" hidden>
    <header class="chat-header">
      <img class="chat-avatar" src="assets/nexo-avatar.png" alt="" onerror="this.style.display='none'" />
      <div><strong>Nexo</strong><span data-ui="subtitle"></span></div>
      <button class="chat-close" type="button" data-ui-aria="close">×</button>
    </header>
    <div class="chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
      <p class="chat-message chat-answer" data-ui="welcome"></p>
    </div>
    <form class="chat-form">
      <label class="sr-only" for="chat-question" data-ui="label"></label>
      <input id="chat-question" name="message" type="text" maxlength="500" autocomplete="off" required />
      <button type="submit" data-ui="send"></button>
    </form>
  </section>
  <button class="chat-toggle" type="button" aria-expanded="false" aria-controls="nexora-chat-panel">
    <img class="chat-toggle-avatar" src="assets/nexo-avatar.png" alt="" onerror="this.style.display='none'" /><span data-ui="toggle"></span>
  </button>
`;
document.body.append(chatWidget);

const panel = chatWidget.querySelector(".chat-panel");
const toggle = chatWidget.querySelector(".chat-toggle");
const closeButton = chatWidget.querySelector(".chat-close");
const form = chatWidget.querySelector(".chat-form");
const questionInput = chatWidget.querySelector("#chat-question");
const messages = chatWidget.querySelector(".chat-messages");
const sendButton = form.querySelector("button");

let lastKey = null;
let conversationStarted = false;

// Applique la langue du site aux textes de l’interface
function applyUiLang() {
  const t = UI[siteLang()];
  chatWidget.querySelectorAll("[data-ui]").forEach((el) => {
    // le message d’accueil ne change plus une fois la conversation commencée
    if (el.dataset.ui === "welcome" && conversationStarted) return;
    el.textContent = t[el.dataset.ui];
  });
  closeButton.setAttribute("aria-label", t.close);
  sendButton.setAttribute("aria-label", t.send);
  questionInput.placeholder = t.placeholder;
}
applyUiLang();

function setOpen(isOpen) {
  if (isOpen) applyUiLang();
  panel.hidden = !isOpen;
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.hidden = isOpen;
  if (isOpen) questionInput.focus();
  else toggle.focus();
}

function addMessage(text, className) {
  const message = document.createElement("p");
  message.className = `chat-message ${className}`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

toggle.addEventListener("click", () => setOpen(true));
closeButton.addEventListener("click", () => setOpen(false));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();
  if (!question) {
    questionInput.focus();
    return;
  }

  conversationStarted = true;
  addMessage(question, "chat-user");
  questionInput.value = "";
  sendButton.disabled = true;
  const pending = addMessage("…", "chat-answer chat-pending");

  setTimeout(() => {
    const { text, key, lang } = getAnswer(question);
    pending.textContent = key === lastKey && key !== "escalate" ? UI[lang].reminder + text : text;
    pending.classList.remove("chat-pending");
    lastKey = key;
    sendButton.disabled = false;
    messages.scrollTop = messages.scrollHeight;
    questionInput.focus();
  }, 450);
});