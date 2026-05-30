# 🎉 Feliz Cumpleaños — Sitio Web Interactivo

Proyecto web festivo con animaciones de confeti, globos y carta interactiva.

## ✨ Características

- **Carta/sobre interactiva** — haz clic para abrirla y revelar el mensaje
- **Animaciones de confeti** — lluvia de confeti con múltiples formas y colores
- **Globos ascendentes** — globos coloridos que suben desde la parte inferior
- **Partículas de fondo** — sparkles suaves animados en canvas
- **Tipografía festiva** — Google Fonts: Paytone One + Nunito + Dancing Script
- **Diseño Memphis/Vibrant** — paleta brillante con gradientes festivos
- **Accesible** — aria-labels, foco por teclado, respeta `prefers-reduced-motion`

## 📁 Estructura del Proyecto

```
feliz-cumpleanos/
├── index.html                  ← Página principal
├── README.md                   ← Este archivo
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Tokens de diseño (colores, tipografía, etc.)
│   │   ├── animations.css      ← Keyframes y reglas de animación
│   │   ├── layout.css          ← Estructura, fondo, encabezado, formas
│   │   ├── card.css            ← Componente sobre + tarjeta
│   │   └── particles.css       ← Estilos de confeti y globos
│   └── js/
│       ├── main.js             ← Punto de entrada, inicialización
│       ├── card.js             ← Controlador de interacción carta/sobre
│       ├── confetti.js         ← Motor de partículas de confeti
│       ├── balloons.js         ← Motor de globos
│       └── bgCanvas.js         ← Sistema de partículas de canvas (fondo)
```

## 🚀 Cómo abrir

1. Abre la carpeta `feliz-cumpleanos/` en **VSCode**
2. Instala la extensión **Live Server** (si no la tienes)
3. Haz clic derecho en `index.html` → **Open with Live Server**
4. ¡O simplemente abre `index.html` directamente en tu navegador!

> No requiere compilación, bundler ni dependencias externas.
> Todo funciona con HTML, CSS y JavaScript vanilla.

## 🎨 Personalización

### Cambiar el mensaje de la carta
En `index.html`, busca la clase `.card-message`:
```html
<p class="card-message">
  TU MENSAJE PERSONALIZADO AQUÍ
</p>
```

### Cambiar los colores
En `assets/css/variables.css`, ajusta las variables CSS:
```css
--color-primary:   #FF4D7D;  /* Rosa principal */
--color-secondary: #FFD93D;  /* Amarillo dorado */
--color-accent-1:  #6C63FF;  /* Violeta eléctrico */
```

### Ajustar la intensidad del confeti
En `assets/js/confetti.js`, modifica el método `burst()`:
```js
ConfettiEngine.burst(120, 50); // (cantidad, posición_X%)
```

### Cambiar la fuente del título
En `index.html`, reemplaza el link de Google Fonts.

## 🌐 Navegadores Soportados

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 📄 Licencia

Libre para uso personal. Diseñado con ❤️.
