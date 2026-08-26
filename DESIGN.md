---
name: Onwe
description: Landing page vanguardista y tecnológica para B2B SaaS.
colors:
  neutral-bg: "#031c17"
  primary: "#00ff79"
  secondary: "#08af83"
  tertiary: "#c2ffdb"
typography:
  display:
    fontFamily: "Symora, serif"
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
rounded:
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
components:
  card-glass:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    rounded: "{rounded.2xl}"
---

# Design System: Onwe

## Overview

**Creative North Star: "El Pulso Tecnológico"**

Inspirado en la onda senoidal que dio origen a la marca, este sistema visual moderniza ese concepto a través de la tecnología. La atmósfera es audaz, inmersiva y vanguardista, apoyándose fuertemente en un fondo profundo salpicado por ruido visual (grain) y destellos de neón puro. La energía fluye a través de curvas orgánicas y animaciones CSS optimizadas, creando la sensación de que el sitio está vivo y procesando datos.

**Key Characteristics:**
- **Audaz e inmersivo:** Fondos casi negros (Abismo) con contrastes extremos de luz (Neón).
- **En movimiento:** Animaciones suaves a 60FPS y *scroll-driven animations* que guían la mirada.
- **Formas orgánicas:** Curvas sinuosas, circuitos y píldoras flotantes, huyendo de las cuadrículas rígidas.
- **Glassmorphism:** Capas translúcidas que permiten que el fondo respire a través de la interfaz.

## Colors

Paleta altamente contrastante que simula luces de neón en el vacío del espacio digital.

### Primary
- **Verde Matriz** (`#00ff79`): El acento principal. Usado para textos resaltados, botones call-to-action, luces de circuitos y efectos de "glow". Su rareza y saturación absoluta es la firma visual del sitio.

### Secondary
- **Jade Futurista** (`#08af83`): Color de apoyo usado en gradientes, bordes sutiles e íconos inactivos. Provee una transición suave entre el fondo oscuro y el neón agresivo.

### Tertiary
- **Cristal Líquido** (`#c2ffdb`): Usado en mezclas de ruido (*Grainient*) y reflexiones lumínicas sutiles para darle dimensión al fondo sin robar el protagonismo.

### Neutral
- **Abismo Tecnológico** (`#031c17`): El fondo base absoluto. Un verde increíblemente oscuro que absorbe la luz y hace resaltar el resto de colores.
- **Blanco Nieve** (`#f8fafc`): Para el texto principal, asegurando máxima legibilidad sobre el Abismo.

### Named Rules
**The Neon Rule.** El Verde Matriz debe ser usado con moderación absoluta. Solo debe iluminar elementos interactivos o palabras clave. Si todo brilla, nada destaca.

## Typography

**Display Font:** Symora (serif)
**Body Font:** Poppins (sans-serif)

**Character:** Una dualidad sorprendente. *Symora* aporta elegancia y un toque editorial orgánico a los titulares, mientras que *Poppins* garantiza un ritmo geométrico, moderno y ultra legible para la tecnología.

### Hierarchy
- **Display** (bold, 4xl-7xl, tight): Para el *hero* y títulos de secciones importantes (ej. "Why Onwe").
- **Body** (regular/medium, sm-base, relaxed): Para la lectura de descripciones y cartas.

## Elevation & Depth

Este sistema no utiliza sombras paralelas oscuras tradicionales (`box-shadow: 0 4px 10px #000`). En su lugar, utiliza luz emanada (*glow*) y capas translúcidas (*glassmorphism*) para indicar profundidad.

### Named Rules
**The Glass Depth Rule.** La profundidad se mide por cuán borroso es el fondo. Los elementos más altos en la jerarquía Z tienen más `backdrop-blur` y bordes semitransparentes que refractan la luz detrás de ellos.

## Shapes

Totalmente dominado por las curvas. Radios completos (`rounded-full`) para cápsulas, botones y logos. Bordes suavizados (`rounded-2xl`) para tarjetas grandes. Nada tiene puntas afiladas.

## Components

Las interfaces priorizan la sensación táctil de estar tocando cristal pulido sobre pantallas LED.

### Cards (Tarjetas de Circuito)
- **Shape:** Esquinas muy redondeadas (24px).
- **Background:** Cristal templado (`bg-white/5` con `backdrop-blur-xl`).
- **Border:** Líneas finas translúcidas (`border-white/10` o `border-emerald-500/20`).
- **Interacción:** Al hacer *hover*, un leve resplandor verde aparece por debajo del cristal y la tarjeta se expande.

## Do's and Don'ts

### Do:
- **Do** usar siempre fondos translúcidos (`backdrop-blur-md` a `xl`) para componentes flotantes.
- **Do** usar `clip-path` y animaciones nativas para transiciones de estado complejas en texto.

### Don't:
- **Don't** usar gris sólido para fondos secundarios. Siempre usa transparencias sobre el Abismo Tecnológico.
- **Don't** usar líneas rectas cruzadas de forma rígida; prefiere curvas o *S-curves* orgánicas para guiar la vista.
