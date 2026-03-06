# 🌸 Majo — IA de Amor para María José

Una inteligencia artificial cariñosa hecha con amor, desplegada en GitHub Pages + Cloudflare Workers.

---

## 📁 Estructura del proyecto

```
majo/
├── index.html        ← La página web (va en GitHub Pages)
└── worker.js         ← El backend que oculta la API key (va en Cloudflare Workers)
```

---

## 🚀 Paso a paso para publicarlo

### PASO 1 — Crear cuenta en Anthropic y obtener API Key
1. Ve a [console.anthropic.com](https://console.anthropic.com)
2. Crea una cuenta gratuita
3. Ve a **Settings → API Keys → Create Key**
4. Copia la key (empieza con `sk-ant-...`) — guárdala, la necesitas en el Paso 3

---

### PASO 2 — Subir a GitHub Pages

1. Crea una cuenta en [github.com](https://github.com) si no tienes
2. Haz clic en **New repository**
3. Nómbralo `majo` (o como quieras)
4. Márcalo como **Public**
5. Sube el archivo `index.html` al repositorio
6. Ve a **Settings → Pages**
7. En *Source* selecciona **Deploy from a branch → main → / (root)**
8. Guarda — en unos minutos tu página estará en:
   ```
   https://TU-USUARIO.github.io/majo
   ```

---

### PASO 3 — Desplegar el Worker en Cloudflare (oculta la API key)

1. Crea una cuenta gratis en [cloudflare.com](https://cloudflare.com)
2. Ve a **Workers & Pages → Create → Create Worker**
3. Ponle el nombre `majo-worker`
4. Borra todo el código que aparece y pega el contenido de `worker.js`
5. Haz clic en **Deploy**
6. Ahora ve a **Settings → Variables → Add variable**
   - Nombre: `ANTHROPIC_API_KEY`
   - Valor: tu key de Anthropic (`sk-ant-...`)
   - Haz clic en **Encrypt** para que quede segura 🔒
7. Copia la URL de tu worker, se ve así:
   ```
   https://majo-worker.TU-USUARIO.workers.dev
   ```

---

### PASO 4 — Conectar GitHub Pages con el Worker

1. Abre `index.html` en GitHub (o en tu computador)
2. Busca esta línea cerca del final:
   ```javascript
   const WORKER_URL = 'https://majo-worker.TU-USUARIO.workers.dev';
   ```
3. Reemplaza la URL con la de tu worker del Paso 3
4. Guarda y sube el cambio a GitHub

---

## ✅ ¡Listo!

Abre `https://TU-USUARIO.github.io/majo` y Majo estará esperando a María José con todo el amor del mundo 💕

---

## 💰 ¿Cuánto cuesta?

| Servicio | Costo |
|----------|-------|
| GitHub Pages | **Gratis** |
| Cloudflare Workers | **Gratis** (100,000 requests/día) |
| Anthropic API | ~$0.003 por conversación (muy barato) |

---

Hecho con ❤️ especialmente para María José
