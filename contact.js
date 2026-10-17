const forms = document.querySelectorAll("[data-nexora-form]");

for (const form of forms) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submission = {
      nom: formData.get("nom")?.toString().trim() ?? "",
      entreprise: formData.get("entreprise")?.toString().trim() ?? "",
      besoin: formData.get("besoin")?.toString().trim() ?? "",
      reference: `NX-${Date.now().toString(36).toUpperCase()}`,
    };

    try {
      sessionStorage.setItem("nexora-submission", JSON.stringify(submission));
      window.location.assign("confirmation.html");
    } catch (error) {
      const message = form.querySelector(".form-error");
      if (!(error instanceof DOMException) || !message) {
        throw error;
      }

      message.textContent = "Impossible de préparer la confirmation. Réessayez ou contactez-nous par email.";
      message.hidden = false;
    }
  });
}
