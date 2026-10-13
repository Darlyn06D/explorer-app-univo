# Explorer App — UNIVO

Aplicación de consulta de países y territorios desarrollada con Vanilla TypeScript para Diseño Web Adaptable. Permite buscar por nombre, combinar la búsqueda con una región y abrir el detalle sin recargar el documento.

## Ejecutar

Requisitos: Node.js 22.12 o superior (también Node 24), Git y pnpm 11.

```bash
npm install -g pnpm@11
pnpm install
pnpm dev
```

Abre la dirección indicada por Vite. Para construir y revisar la versión de producción:

```bash
pnpm build
pnpm preview
```

Para comprobar la validación de datos, los filtros, el debounce y los estados:

```bash
pnpm test
pnpm build
pnpm test:dom
```

## Tecnologías y organización

Vite, TypeScript y Tailwind CSS v4 con el plugin oficial de Vite. Los tokens de color, radios y espaciado están en `src/style.css`, dentro de `@theme`.

| Ruta | Responsabilidad |
| --- | --- |
| `src/api/countries.ts` | Petición HTTP, comprobación de respuesta y validación/normalización del JSON. |
| `src/types/` | Contratos de país y detalle, incluyendo población ausente. |
| `src/utils/` | Formato, filtrado puro, escape de texto y debounce cancelable. |
| `src/render/` | Tarjetas, grid, detalle y estados visuales. |
| `src/main.ts` | Eventos, carga inicial, navegación y actualización del DOM. |
| `public/data/countries.json` | Datos estáticos facilitados por la docente. |

## Fuente de datos

Se utiliza el JSON facilitado por la docente, alternativa autorizada en S22 ante límites de consultas de REST Countries. Contiene 254 registros de países y territorios; no se actualiza automáticamente. Se carga mediante `fetch`, se comprueba `response.ok` y se valida la estructura en tiempo de ejecución. No requiere una clave ni variables de entorno. Las banderas siguen siendo recursos externos y necesitan conexión; si fallan se muestra una imagen de respaldo.

La búsqueda utiliza los nombres de la fuente, mayoritariamente en inglés (por ejemplo, `Belize`). Las etiquetas de región de la interfaz están en español. Algunos territorios no tienen código de dos letras y muestran «Detalle no disponible».

## Funciones

- Búsqueda parcial sin distinguir mayúsculas, con limpieza de espacios.
- Región y búsqueda combinadas sin modificar el conjunto original.
- Debounce de 300 ms en búsqueda; selector inmediato.
- Ocho skeletons durante la carga, estado vacío, error y reintento.
- Detalle mediante `#/country/SV`, regreso y navegación Atrás/Adelante.
- Menú móvil accesible, foco visible, controles táctiles y respaldo de banderas.
- Grid responsive, Container Queries y títulos fluidos con `clamp()`.

## Versión Vanilla TypeScript

Etiqueta de entrega: `entrega-lab-vanilla`.

Después de publicar el repositorio, agrega aquí su enlace directo: `https://github.com/TU_USUARIO/TU_REPOSITORIO/tree/entrega-lab-vanilla`. Este enlace es una plantilla y debe sustituirse por el real.

## Publicación y recorrido del cambio

Configuración Vercel: framework **Vite**, build **pnpm build**, salida **dist**, rama de producción **main**. No configurar una API key para esta fuente JSON.

Completar después de publicar y revisar realmente:

- Producción: pendiente.
- PR integrado: pendiente.
- Preview revisada: pendiente.
- Revisión: pendiente de registrar en el PR antes del merge.

El procedimiento está en [GUIA-ENTREGA.md](docs/GUIA-ENTREGA.md). No presentar enlaces pendientes como evidencia de despliegue.

## Capturas

Las capturas visuales están pendientes de tomar en el navegador. Usa los pasos de `docs/GUIA-ENTREGA.md`. No se incluyen evidencias ficticias de Vercel ni de GitHub.

## Créditos

Darlyn Dinora Andrade Zúñiga — U20240714.
Universidad de Oriente, Ingeniería en Desarrollo de Software.
Se tomó como referencia el material y el proyecto docente de Karla Cecilia Cruz de González, [ExplorerApp](https://github.com/Kcruz080492/ExplorerApp). Se reorganizó y corrigió la coordinación, se añadió validación del JSON, debounce modular y verificaciones de comportamiento.
