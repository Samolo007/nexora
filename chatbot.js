const chatWidget = document.createElement("section");
chatWidget.className = "chat-widget";
chatWidget.innerHTML = `
  <section class="chat-panel" id="nexora-chat-panel" aria-label="Nexo" hidden>
    <header class="chat-header">
      <img class="chat-avatar" src="assets/nexo-avatar.png" alt="" />
      <div><strong>Nexo</strong><span>Posez-nous votre question</span></div>
      <button class="chat-close" type="button" aria-label="Fermer la conversation">×</button>
    </header>
    <div class="chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
      <p class="chat-message chat-answer">Bonjour ! Comment puis-je vous aider ?</p>
    </div>
    <form class="chat-form">
      <label class="sr-only" for="chat-question">Votre question</label>
      <input id="chat-question" name="message" type="text" maxlength="500" placeholder="Écrivez votre question…" autocomplete="off" required />
      <button type="submit" aria-label="Envoyer la question">Envoyer</button>
    </form>
  </section>
  <button class="chat-toggle" type="button" aria-expanded="false" aria-controls="nexora-chat-panel">
    <img class="chat-toggle-avatar" src="assets/nexo-avatar.png" alt="" /> Une question ?
  </button>
`;
document.body.append(chatWidget);
window.nexoraLanguage?.translatePage();

const panel = chatWidget.querySelector(".chat-panel");
const toggle = chatWidget.querySelector(".chat-toggle");
const closeButton = chatWidget.querySelector(".chat-close");
const form = chatWidget.querySelector(".chat-form");
const questionInput = chatWidget.querySelector("#chat-question");
const messages = chatWidget.querySelector(".chat-messages");
const sendButton = form.querySelector("button");

function setOpen(isOpen) {
  panel.hidden = !isOpen;
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.hidden = isOpen;
  if (isOpen) {
    questionInput.focus();
  } else {
    toggle.focus();
  }
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = questionInput.value.trim();
  if (!message) {
    questionInput.focus();
    return;
  }

  addMessage(message, "chat-user");
  questionInput.value = "";
  questionInput.disabled = true;
  sendButton.disabled = true;
  const pendingMessage = addMessage("Je cherche une réponse…", "chat-answer chat-pending");
  window.nexoraLanguage?.translatePage();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language: window.nexoraLanguage?.get() ?? "fr" }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || window.nexoraLanguage?.text("La réponse n’a pas pu être chargée."));
    }
    pendingMessage.textContent = result.answer;
    pendingMessage.classList.remove("chat-pending");
  } catch (error) {
    pendingMessage.textContent =
      error instanceof Error
        ? error.message
        : window.nexoraLanguage?.text("Impossible de joindre l’assistant. Réessayez plus tard.");
    pendingMessage.classList.remove("chat-pending");
  } finally {
    questionInput.disabled = false;
    sendButton.disabled = false;
    questionInput.focus();
  }
});
