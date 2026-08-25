# Product Requirements Document (PRD) - Landing Page Onwe

## 1. Visión General
Este documento define los requisitos de diseño, estructura y comportamiento visual para la primera landing page de la startup **Onwe**. El objetivo principal es crear una experiencia inmersiva y de alta conversión dirigida a negocios, empresas y emprendedores digitales que buscan digitalizar sus procesos a través de aplicaciones web y sistemas a medida.

---

## 2. Identidad Visual y UI/UX
El diseño debe evocar un tono moderno, tecnológico y premium, utilizando técnicas de iluminación digital sobre fondos oscuros (estilo Lumenda/Unizen).

*   **Tema Principal:** Dark Mode.
*   **Paleta de Colores:**
    *   Fondo Base: `#031c17` (Verde/Cian muy oscuro).
    *   Acentos y Degradados: `#00ff79` (Verde neón), `#08af83` (Verde esmeralda), `#c2ffdb` (Menta claro).
    *   Texto secundario y fondos de tarjetas: Tonos oscuros translúcidos o grises acordes para mantener el contraste.
*   **Tipografía:**
    *   Encabezados (H1, H2, H3): **Symora**. Su uso será exclusivo para títulos de alto impacto y frases gancho.
    *   Cuerpos de texto y botones: **Poppins**. Para asegurar una legibilidad óptima y limpieza visual.
*   **Lenguaje Visual:** Uso de tarjetas con bordes sutilmente iluminados, halos de luz desenfocados en el fondo, y un *bento-grid* asimétrico para la organización de la información (estilo Hiver).

---

## 3. Stack Tecnológico y Comportamiento UI
La arquitectura frontend se centrará en el rendimiento y la espectacularidad visual, dividiendo responsabilidades entre herramientas específicas:

*   **Estructura Base:** Next.js, React y Tailwind CSS.
*   **Librería de Componentes (React Bits):** Se utilizará para elementos visuales aislados.
    *   Fondos dinámicos e interactivos (ej. partículas, fluidos de luz, auroras).
    *   Microinteracciones en botones y tarjetas (efectos de brillo al hacer hover, bordes magnéticos).
    *   Efectos de texto independientes (carruseles de palabras, revelado de texto).
*   **Orquestación de Animaciones (GSAP):** Encargado exclusivo de la experiencia de navegación.
    *   *ScrollTriggers* para desencadenar eventos según la posición de la página.
    *   Apariciones en cascada (*staggering*) de los elementos del grid.
    *   Fijación de secciones (*pinning*) para transiciones narrativas complejas.

---

## 4. Estructura de la Página y Flujo de Scroll
La página seguirá una narrativa lineal diseñada para atrapar la atención y dirigir al usuario hacia el punto de contacto. No se define copy estricto, sino la intención y el diseño de cada bloque.

### 4.1. Hero Section (100vh)
*   **Layout:** Centrado o con alineación fuerte a la izquierda, dominando la pantalla completa.
*   **Visual:** Fondo interactivo provisto por React Bits (luces sutiles en los tonos verdes corporativos que reaccionen al mouse). Logotipo de Onwe prominente.
*   **Contenido:** Titular principal (H1) con el gancho de valor, seguido de un subtítulo breve y un botón de Call to Action (CTA) primario.
*   **Animación (GSAP):** Entrada suave al cargar el DOM. Los elementos de texto y el botón deben aparecer en cascada desde abajo con un efecto de *fade-in*.

### 4.2. Transición de Narrativa (Problema vs. Solución)
*   **Layout:** Sección de paso que conecta el impacto inicial con los servicios.
*   **Visual:** Diseño tipográfico grande y audaz.
*   **Animación (GSAP):** Al hacer scroll, la pantalla se debe fijar (*pinning*). El texto que describe el "estado actual / problema" del cliente se desvanece, transforma o tacha dinámicamente, siendo reemplazado por la "solución digital" que ofrece Onwe, antes de permitir que el scroll continúe hacia abajo.

### 4.3. Cuadrícula de Servicios (Bento-Grid Estilo Hiver)
*   **Layout:** Una cuadrícula asimétrica construida con CSS Grid / Tailwind. Diferentes proporciones para las tarjetas (ej. una tarjeta rectangular ancha que ocupe dos columnas para el servicio estrella, y tarjetas cuadradas más pequeñas para servicios secundarios).
*   **Visual:** Cada tarjeta funciona como un contenedor independiente. 
    *   Deben tener un fondo translúcido (Glassmorphism sutil) o un color sólido muy oscuro, resaltando contra el fondo `#031c17`.
    *   Uso de microinteracciones de React Bits en el interior de las tarjetas (iconos flotantes o bordes que brillan al pasar el cursor).
*   **Animación (GSAP):** A medida que el contenedor del Grid entra al viewport, las tarjetas deben revelarse una por una en cascada (*stagger reveal*), deslizándose ligeramente desde abajo.

### 4.4. Diferenciadores / Ventaja Competitiva
*   **Layout:** Sección más minimalista y horizontal.
*   **Visual:** Lista de características o bloques de texto (velocidad, escalabilidad, diseño).
*   **Animación (React Bits):** Uso de efectos de texto en hover (ej. desenfoque del resto del texto al pasar el cursor sobre un punto específico, o revelado de información oculta).

### 4.5. Sección de Cierre y Contacto
*   **Layout:** Diseño limpio y enfocado al final de la página.
*   **Visual:** Un formulario minimalista (inputs sin bordes fuertes, solo líneas inferiores o contenedores muy oscuros, manteniendo la elegancia).
*   **Campos Requeridos:** Nombre, Empresa, Área de texto para el requerimiento, Botón de envío estilizado.
*   **Animación (GSAP):** Revelado final suave al terminar el recorrido del scroll. El footer con enlaces a redes sociales y correo debe integrarse fluidamente debajo.

---

## 5. Requisitos No Funcionales y UI Adicional
*   **Responsive Design:** El *Bento-Grid* debe colapsar a una sola columna en dispositivos móviles. Las animaciones pesadas (fondos interactivos) deben desactivarse o simplificarse en móviles para preservar batería y rendimiento.
*   **Accesibilidad (A11y):** Asegurar que los contrastes de los textos (especialmente el gris sobre `#031c17`) superen los estándares WCAG. 
*   **Performance:** Implementar *lazy loading* para los componentes de React Bits que no estén en el Hero Section.
