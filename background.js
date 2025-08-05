// Lista de emoticonos que se mostrarán aleatoriamente
const emoticonos = ["😊", "🤖", "🎉", "🌈", "🦄", "💡", "🔥", "😎"];

/**
 * Función que selecciona un emoticono al azar
 * y muestra una notificación en Chrome con él.
 */
function mostrarEmoticono() {
    const emoji = emoticonos[Math.floor(Math.random() * emoticonos.length)];

    chrome.notifications.create({
        type: "basic",             // Tipo de notificación
        iconUrl: 'image.png',       // Icono que se mostrará
        title: "Tu emoji del momento", // Título de la notificación
        message: emoji,            // Contenido de la notificación (el emoticono)
        priority: 1
    });
}


/**
 * Al instalar la extensión, se crea una alarma llamada "emojiAlarma"
 * que se ejecutará cada 5 minutos (puedes cambiarlo si quieres).
 */
chrome.runtime.onInstalled.addListener(() => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "image.png",
        title: "Extensión instalada",
        message: "¡Hola! Tu extensión ya está activa 🎉",
        priority: 1
    });
});

/**
 * Cuando se dispara la alarma, mostramos un emoticono aleatorio.
 */
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "emojiAlarma") {
        mostrarEmoticono();
    }
});
