const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const maxRequestBytes = 4096;
const maxMessageLength = 500;
const supportedLanguages = ["fr", "en", "es"];
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(payload));
}

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreEntry(message, keywords) {
  return keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalize(keyword);
    const isPhrase = normalizedKeyword.includes(" ");
    const messageWords = message.split(" ");
    const matched = isPhrase
      ? message.includes(normalizedKeyword)
      : messageWords.some(
          (word) =>
            word === normalizedKeyword ||
            (word.endsWith("s") && word.slice(0, -1) === normalizedKeyword) ||
            (normalizedKeyword.endsWith("s") &&
              normalizedKeyword.slice(0, -1) === word),
        );

    return score + (matched ? (isPhrase ? 2 : 1) : 0);
  }, 0);
}

async function answerQuestion(message, language) {
  const databasePath = path.join(root, "base-connaissances.json");
  const contents = await fs.readFile(databasePath, "utf8");
  const database = JSON.parse(contents);

  if (!database || !Array.isArray(database.entries)) {
    throw new Error("base-connaissances.json has an invalid structure");
  }

  for (const entry of database.entries) {
    const validEntry =
      entry &&
      entry.keywords &&
      entry.answers &&
      supportedLanguages.every(
        (locale) =>
          Array.isArray(entry.keywords[locale]) &&
          entry.keywords[locale].every((keyword) => typeof keyword === "string") &&
          typeof entry.answers[locale] === "string" &&
          entry.answers[locale].trim(),
      );
    if (!validEntry) {
      throw new Error("base-connaissances.json has an invalid entry");
    }
  }

  const normalizedMessage = normalize(message);
  let bestEntry;
  let bestScore = 0;

  for (const entry of database.entries) {
    const score = scoreEntry(normalizedMessage, entry.keywords[language]);
    if (score > bestScore) {
      bestEntry = entry;
      bestScore = score;
    }
  }

  return (
    bestEntry?.answers[language] ??
    {
      fr: "Je n’ai pas encore la réponse à cette question. Vous pouvez écrire à notre équipe via la page Contact.",
      en: "I don't have an answer to that yet. Please contact our team through the Contact page.",
      es: "Todavía no tengo una respuesta para esa pregunta. Ponte en contacto con nuestro equipo desde la página de contacto.",
    }[language]
  );
}

async function readJsonBody(request) {
  let size = 0;
  const chunks = [];

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxRequestBytes) {
      const error = new Error("The request exceeds the maximum allowed size.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("The request body must be valid JSON.");
    error.statusCode = 400;
    throw error;
  }
}

async function serveStatic(request, response, pathname) {
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  const contentType = contentTypes[path.extname(filePath).toLowerCase()];
  if (!contentType) {
    response.writeHead(404).end("Not found");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : file);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      response.writeHead(404).end("Not found");
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Invalid URL");
    return;
  }

  if (pathname === "/api/chat") {
    if (request.method !== "POST") {
      response.writeHead(405, { Allow: "POST" }).end("Method not allowed");
      return;
    }

    let requestLanguage = "fr";
    try {
      const body = await readJsonBody(request);
      requestLanguage = supportedLanguages.includes(body?.language)
        ? body.language
        : "fr";
      if (!body || typeof body.message !== "string") {
        sendJson(response, 400, {
          error: {
            fr: "Écrivez une question pour continuer.",
            en: "Enter a question to continue.",
            es: "Escribe una pregunta para continuar.",
          }[requestLanguage],
        });
        return;
      }

      const message = body.message.trim();
      if (!message || message.length > maxMessageLength) {
        sendJson(response, 400, {
          error: {
            fr: `La question doit contenir entre 1 et ${maxMessageLength} caractères.`,
            en: `Your question must contain between 1 and ${maxMessageLength} characters.`,
            es: `Tu pregunta debe tener entre 1 y ${maxMessageLength} caracteres.`,
          }[requestLanguage],
        });
        return;
      }

      sendJson(response, 200, {
        answer: await answerQuestion(message, requestLanguage),
      });
    } catch (error) {
      if (error.statusCode) {
        sendJson(response, error.statusCode, { error: error.message });
        return;
      }
      console.error("Chatbot request failed:", error);
      sendJson(response, 500, {
        error: {
          fr: "L’assistant est temporairement indisponible. Réessayez dans un instant.",
          en: "The assistant is temporarily unavailable. Please try again shortly.",
          es: "El asistente no está disponible temporalmente. Inténtalo de nuevo en unos instantes.",
        }[requestLanguage],
      });
    }
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
    return;
  }

  try {
    await serveStatic(request, response, pathname);
  } catch (error) {
    console.error("Static file request failed:", error);
    if (!response.headersSent) {
      response.writeHead(500).end("Internal server error");
    }
  }
});

server.listen(port, () => {
  console.log(`Nexora is available at http://localhost:${port}`);
});
