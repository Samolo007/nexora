const summaryFields = {
  nom: document.querySelector("#summary-name"),
  entreprise: document.querySelector("#summary-company"),
  besoin: document.querySelector("#summary-need"),
  reference: document.querySelector("#summary-reference"),
};

try {
  const savedSubmission = sessionStorage.getItem("nexora-submission");
  if (savedSubmission) {
    const submission = JSON.parse(savedSubmission);
    const values = {
      nom: submission.nom,
      entreprise: submission.entreprise || "Non renseignée",
      besoin: submission.besoin || "Non renseigné",
      reference: submission.reference,
    };

    for (const [field, element] of Object.entries(summaryFields)) {
      if (element && typeof values[field] === "string") {
        element.textContent = values[field];
      }
    }

    sessionStorage.removeItem("nexora-submission");
  }
} catch (error) {
  if (!(error instanceof DOMException) && !(error instanceof SyntaxError)) {
    throw error;
  }

  const message = document.querySelector("#confirmation-error");
  if (message) {
    message.textContent = "Le récapitulatif n’a pas pu être chargé. Contactez-nous si votre demande a été envoyée.";
    message.hidden = false;
  }
}
