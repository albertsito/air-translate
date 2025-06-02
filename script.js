const micButton = document.getElementById("mic-button");
const spanishText = document.getElementById("spanish-text");
const englishText = document.getElementById("english-text");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Tu navegador no soporta reconocimiento de voz.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "es-ES";
  recognition.interimResults = false;

  micButton.addEventListener("click", () => {
    recognition.start();
    micButton.textContent = "🎤 Escuchando...";
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    spanishText.textContent = transcript;
    micButton.textContent = "🎤 Presiona para hablar";

    fetchTranslation(transcript).then(translation => {
      englishText.textContent = translation;
    }).catch(() => {
      englishText.textContent = "[Error al traducir]";
    });
  };

  recognition.onerror = (event) => {
    micButton.textContent = "🎤 Presiona para hablar";
    alert("Error en el reconocimiento: " + event.error);
  };
}

async function fetchTranslation(text) {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "es",
      target: "en",
      format: "text"
    })
  });

  const data = await response.json();
  return data.translatedText || "[Sin traducción]";
}
