/**
 * script.js
 * - Actualiza .amount-value, .recipient-name y .time-value
 * - Cambia los valores en cada ciclo de la animación CSS (animationiteration)
 * - Genera montos entre 12.000 y 338.000 con mayor probabilidad por debajo de 100.000
 * - Formatea número en estilo `es-AR` (puntos para miles, coma para decimales)
 * - Hora en zona Argentina (America/Argentina/Buenos_Aires) en formato HH:MM (24h)
 */

/* ---------- Configuración / datos ---------- */
const FIRST_NAMES = [
  "Valerián","Mateo","Sofía","Martina","Lucas","Julieta","Diego","Lucía",
  "Tomás","Camila","Agustín","Florencia","Benjamín","Isabella","Bruno",
  "Marcos","María","Santiago","Agustina","Nicolás","Federico","Paula"
];

const LAST_NAMES = [
  "González","Pérez","Rodríguez","Gómez","Fernández","López","Sánchez",
  "Martínez","García","Romero","Díaz","Rossi","Torres","Vega","Cruz",
  "Canaza","Méndez","Silva","Álvarez","Ramos","Herrera"
];

/* Probabilidades y rangos */
const PROB_LOWER = 0.75; // 75% de probabilidad de que el monto esté <= 100.000
const MIN_AMOUNT = 12000;
const LOWER_MAX = 100000;
const UPPER_MAX = 338000;

/* Preferencia de decimales: 80% serán .00 */
const DECIMAL_ZERO_PROB = 0.8;

/* Selectores (deben coincidir con el HTML que ya creaste) */
const SEL_AMOUNT = ".amount-value";
const SEL_NAME = ".recipient-name";
const SEL_TIME = ".time-value";
const SEL_NOTIF = ".mp-notif";

/* ---------- Utilidades ---------- */

/** Devuelve entero aleatorio entre min y max (incluidos) */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Elige un elemento aleatorio de un array */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Genera un nombre completo aleatorio (Nombre + Apellido(s)) */
function generateRandomName() {
  const first = pick(FIRST_NAMES);
  // 60% con dos apellidos, 40% con uno
  const multiSurname = Math.random() < 0.6;
  const surname1 = pick(LAST_NAMES);
  if (multiSurname) {
    let surname2 = pick(LAST_NAMES);
    // evitar apellido idéntico dos veces seguidas (pequeña corrección)
    if (surname2 === surname1) {
      surname2 = pick(LAST_NAMES.filter(s => s !== surname1));
    }
    return `${first} ${surname1} ${surname2}`;
  } else {
    return `${first} ${surname1}`;
  }
}

/** Genera un monto aleatorio con la distribución solicitada */
function generateRandomAmountValue() {
  const r = Math.random();
  let integerPart;
  if (r < PROB_LOWER) {
    integerPart = randInt(MIN_AMOUNT, LOWER_MAX);
  } else {
    integerPart = randInt(LOWER_MAX + 1, UPPER_MAX);
  }

  // Decimales: con probabilidad DECIMAL_ZERO_PROB -> 00, si no -> 0..99
  let cents;
  if (Math.random() < DECIMAL_ZERO_PROB) {
    cents = 0;
  } else {
    cents = randInt(0, 99);
  }

  return integerPart + cents / 100;
}

/** Formatea número según convención argentina (puntos miles, coma decimales), 2 decimales */
function formatAmountEsAR(value) {
  // Usamos Intl.NumberFormat con locale 'es-AR'
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/** Obtiene la hora actual en zona Argentina (HH:MM, 24h) */
function getArgentinaTimeHHMM() {
  try {
    const now = new Date();
    // toLocaleTimeString con timeZone para asegurar hora AR
    const parts = now.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires"
    });
    // parts suele venir como "21:18"
    return parts;
  } catch (e) {
    // Fallback sencillo si algo falla: usar hora local (formato HH:MM)
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }
}

/* ---------- Actualización del DOM ---------- */

/** Actualiza los tres elementos con nuevos datos aleatorios */
function updateNotificationContent() {
  const elAmount = document.querySelector(SEL_AMOUNT);
  const elName = document.querySelector(SEL_NAME);
  const elTime = document.querySelector(SEL_TIME);

  if (!elAmount && !elName && !elTime) return; // nada que hacer

  // Generar nuevo contenido
  const newName = generateRandomName();
  const newAmountVal = generateRandomAmountValue();
  const newAmountFormatted = formatAmountEsAR(newAmountVal);
  const newTime = getArgentinaTimeHHMM();

  // Actualizar (si existe)
  if (elName) elName.textContent = newName;
  if (elAmount) elAmount.textContent = newAmountFormatted;
  if (elTime) elTime.textContent = newTime;
}

/* ---------- Inicialización y eventos de animación ---------- */

function initNotificationRandomizer() {
  const notif = document.querySelector(SEL_NOTIF);

  // Actualiza de entrada para que la primera aparición tenga contenido aleatorio
  updateNotificationContent();

  if (!notif) {
    // Si no existe el elemento (por algún motivo), podemos configurar un timer que actualice cada X segundos
    // como fallback: actualiza cada 6.4s (igual que la duración por defecto en tu CSS)
    setInterval(updateNotificationContent, 6400);
    return;
  }

  // Cuando la animación comienza por primera vez
  notif.addEventListener("animationstart", () => {
    // Aseguramos que al inicio del primer ciclo se muestren datos nuevos (por si el HTML trae placeholders)
    updateNotificationContent();
  });

  // Cada vez que comienza una nueva iteración de la animación -> actualizamos los datos
  notif.addEventListener("animationiteration", () => {
    // Pequeña defer para evitar parpadeos (se actualiza inmediatamente al iniciar la iteración)
    // requestAnimationFrame asegura que el DOM se actualice en el siguiente frame
    requestAnimationFrame(updateNotificationContent);
  });

  // Como plus opcional: también actualizamos si la ventana gana foco (útil cuando se vuelve a la pestaña)
  window.addEventListener("focus", updateNotificationContent);
}

/* Ejecutar al cargar el script */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNotificationRandomizer);
} else {
  initNotificationRandomizer();
}
