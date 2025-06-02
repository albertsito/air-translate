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
  const dictionary = {
    "hola": "hello",
    "buenos": "good",
    "días": "days",
    "día": "day",
    "a": "to",
    "todos": "everyone",
    "todas": "all",
    "buenos días": "good morning",
    "buenas tardes": "good afternoon",
    "buenas noches": "good night",
    "adiós": "goodbye",
    "gracias": "thank you",
    "por": "for",
    "favor": "please",
    "cómo": "how",
    "estás": "are you",
    "qué": "what",
    "tal": "up",
    "me": "my",
    "llamo": "name is",
    "sí": "yes",
    "no": "no",
    "dónde": "where",
    "está": "is",
    "el": "the",
    "baño": "bathroom",
    "no entiendo": "I don't understand",
    "puedes": "can you",
    "ayudarme": "help me",
    "cuánto": "how much",
    "cuesta": "does it cost",
    "estoy": "I am",
    "perdido": "lost",
    "hablas": "do you speak",
    "inglés": "English",
    "buen": "good",
    "trabajo": "job",
    "feliz": "happy",
    "cumpleaños": "birthday",
    "salud": "bless you",
    "lo": "I",
    "siento": "sorry",
    "hora": "time",
    "es": "is",
    "repetir": "repeat",
    "te": "I",
    "quiero": "love you",
    "viaje": "trip",
    "provecho": "meal",
    "puedo": "can",
    "encontrar": "find",
    "un": "a",
    "taxi": "taxi",
    "bien": "fine",
    "pasa": "up",
    "navidad": "christmas",
    "año": "year",
    "nuevo": "new",
    "cómo te llamas": "what is your name",
    "hasta": "until",
    "luego": "later",
    "pronto": "soon",
    "bienvenido": "welcome",
    "hablar": "speak",
    "más": "more",
    "despacio": "slowly",
    "hablo": "I speak",
    "muy": "very",
    "bien": "well",
    "estación": "station",
    "cansado": "tired",
    "mostrarme": "show me",
    "día": "day",
    "extraño": "miss you"
  };

  // Normaliza el texto
  const key = text.toLowerCase().trim();

  // Si frase completa está en diccionario, devuelve
  if (dictionary[key]) {
    return dictionary[key];
  }

  // Si no, intenta traducir palabra por palabra
  const words = key.split(/\s+/);
  const translatedWords = words.map(word => dictionary[word] || word);
  const translatedText = translatedWords.join(" ");

  return translatedText;
}