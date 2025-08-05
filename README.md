# 🚀 Emoticonos Aleatorios - Extensión de Chrome con React

Esta guía te muestra cómo crear una extensión de Chrome que muestra emoticonos aleatorios cada cierto tiempo. Incluye una versión básica en JavaScript puro y una versión más avanzada con React (usando Vite).

---

## 📦 Opción 1: Extensión simple en JavaScript

### 🧱 Estructura

```
emoticono-extension/
├── manifest.json
├── background.js
└── icon.png
```

### 📄 `manifest.json`

**🧾 ¿Qué es el archivo manifest.json?**
Es el archivo de configuración principal de una extensión de Chrome.

Le dice al navegador qué hace tu extensión, cómo debe comportarse, qué archivos usa, y qué permisos necesita.

Es obligatorio y siempre debe estar en la raíz del proyecto.


#### **🧠 ¿Por qué se usa?**
Porque el navegador necesita saber:
- Cómo se llama tu extensión
- Qué versión es
- Qué scripts usa (fondo, contenido, popup, etc.
- Qué permisos necesita (como mostrar notificaciones o acceder a pestañas
- Qué íconos usa
- Qué tipo de extensión es (popup, content script, background, etc.)

Tu extensión no podrá cargarse en Chrome. Aparecerá un error diciendo que falta el manifest.json.



```json
{
  "manifest_version": 3,               // Obligatorio. Usa siempre la versión 3 (la actual).
  "name": "Mi Extensión de Chrome",    // Nombre que verá el usuario.
  "version": "1.0",                    // Versión actual de tu extensión.
  "description": "Muestra emoticonos", // Breve descripción.

  "permissions": [                     // Permisos necesarios para funcionar.
    "notifications",                  // Mostrar notificaciones del sistema.
    "alarms"                          // Programar tareas periódicas.
  ],

  "background": {                      // Define el script que corre en segundo plano.
    "service_worker": "background.js" // Service worker que mantiene la lógica viva.
  },

  "action": {                          // Define el comportamiento al hacer clic en el icono.
    "default_popup": "index.html",     // (opcional) Página que se abre al hacer clic.
    "default_title": "Haz clic aquí"   // (opcional) Texto al pasar el ratón por el icono.
  },

  "icons": {                           // Íconos que representa tu extensión.
    "48": "icon.png"                  // Imagen de 48x48 píxeles.
  }
}

```

#### Documentación completa:

👉 https://developer.chrome.com/docs/extensions/mv3/manifest/

---

## 🧠 ¿Qué es el objeto `chrome`?

El objeto `chrome` está disponible automáticamente en los scripts de extensiones. Te permite acceder a funcionalidades como alarmas, notificaciones, almacenamiento, etc.

- No necesitas importar nada.
- Solo funciona dentro del contexto de la extensión (no en una web normal).

### 🔗 Documentación útil:

- [Guía oficial de extensiones](https://developer.chrome.com/docs/extensions/)
- [Referencia de API `chrome.*`](https://developer.chrome.com/docs/extensions/reference/)
- [`chrome.notifications`](https://developer.chrome.com/docs/extensions/reference/notifications/)
- [`chrome.alarms`](https://developer.chrome.com/docs/extensions/reference/alarms/)

---

## 🧪 Cómo probar

1. Ve a `chrome://extensions/`
2. Activa "Modo desarrollador"
3. Haz clic en "Cargar descomprimida"
4. Selecciona la carpeta de tu extensión

---

## ⚛️ Opción 2: Versión con React (Vite)

### 1. Crear el proyecto con Vite

```bash
npm create vite@latest mi-extension-react --template react
cd mi-extension-react
npm install
```

### 2. Añadir el `manifest.json` en `public/`

```json
{
  "manifest_version": 3,
  "name": "Mi Extensión React",
  "version": "1.0",
  "description": "Una extensión de Chrome hecha con React",
  "action": {
    "default_popup": "index.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["notifications", "alarms"],
  "icons": {
    "48": "icon.png"
  }
}
```

### 3. Crear el `background.js`

Este archivo debe estar fuera del sistema React:

```js
const emoticonos = ["😄", "🤖", "🎉", "🌈"];

function mostrarEmoticono() {
  const emoji = emoticonos[Math.floor(Math.random() * emoticonos.length)];
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Emoji del momento",
    message: emoji,
    priority: 1
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("emojiAlarma", {
    periodInMinutes: 1
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "emojiAlarma") {
    mostrarEmoticono();
  }
});
```

### 4. Compilar y cargar

```bash
npm run build
```

Luego en `chrome://extensions/`, carga la carpeta `/dist`.

---

## 🧩 Notas finales

- Las notificaciones de Chrome **aparecen como globos del sistema**, no dentro del navegador.
- Verifica permisos del sistema si no ves nada.
- Usa `console.log` en el background y revisa la consola del service worker para depurar.

