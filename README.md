# Explorer App — UNIVO

Aplicación de consulta de países y territorios desarrollada para Diseño Web Adaptable con Vite, Vanilla TypeScript y Tailwind CSS v4. Permite buscar países, filtrar por región y consultar sus detalles sin recargar la página.

## Instalación y ejecución

Requisitos: Node.js 22.12 o superior y pnpm 11.

```bash
git clone https://github.com/Darlyn06D/explorer-app-univo.git
cd explorer-app-univo
npm install -g pnpm@11
pnpm install
pnpm dev
```

Abre la dirección que muestra Vite en la terminal.

Para compilar y revisar la aplicación:

```bash
pnpm build
pnpm preview
```

Para ejecutar las pruebas incluidas:

```bash
pnpm test
pnpm build
pnpm test:dom
```

En PowerShell, si se bloquea la ejecución de scripts, utiliza `pnpm.cmd` en lugar de `pnpm`.

## Tecnologías

- Vite.
- Vanilla TypeScript.
- Tailwind CSS v4 y su plugin oficial para Vite.
- Design tokens definidos mediante `@theme`.
- GitHub y Vercel.

## Organización del proyecto

| Ruta | Responsabilidad |
| --- | --- |
| `src/api/` | Peticiones HTTP y validación de los datos recibidos. |
| `src/types/` | Interfaces de países y datos de detalle. |
| `src/utils/` | Formateo, filtrado y debounce. |
| `src/render/` | Tarjetas, listado, detalle y estados de interfaz. |
| `src/main.ts` | Coordinación de carga, eventos y navegación. |
| `public/data/countries.json` | Fuente de datos facilitada por la docente. |

## Fuente de datos

Se utiliza el archivo JSON facilitado por la docente, alternativa permitida en el laboratorio ante las limitaciones de consultas de REST Countries.

El archivo contiene 254 países y territorios y se obtiene mediante `fetch`. La aplicación comprueba `response.ok`, valida la estructura recibida y maneja los errores. No requiere claves ni variables de entorno.

Los datos son una copia estática y no se actualizan automáticamente. Las banderas utilizan recursos externos; cuando una imagen no está disponible, se muestra una imagen de respaldo.

Los nombres proceden de la fuente de datos y están mayoritariamente en inglés. Algunos territorios no cuentan con un código válido para abrir su detalle.

## Funcionalidades

- Tarjetas con nombre, bandera, población, región y capital.
- Tratamiento de datos ausentes.
- Búsqueda sin distinguir mayúsculas y minúsculas.
- Búsqueda y región combinadas.
- Debounce de 300 ms en el buscador.
- Actualización inmediata al cambiar de región.
- Ocho tarjetas skeleton durante la carga.
- Mensajes de resultados vacíos y errores.
- Botón para reintentar la carga.
- Navegación al detalle mediante hash routing.
- Diseño adaptable y navegación con teclado.
- Container Queries y tipografía fluida con `clamp()`.

## Versión Vanilla TypeScript del laboratorio

La rama `fix/foco-enlace-detalle` conserva una versión identificada de la aplicación en Vanilla TypeScript:

https://github.com/Darlyn06D/explorer-app-univo/tree/fix/foco-enlace-detalle

Para ejecutarla:

```bash
git clone --branch fix/foco-enlace-detalle https://github.com/Darlyn06D/explorer-app-univo.git
cd explorer-app-univo
pnpm install
pnpm dev
```

## GitHub Flow y despliegue

- Producción: https://explorer-app-univo.vercel.app/
- Pull Request integrado: https://github.com/Darlyn06D/explorer-app-univo/pull/1
- Preview del cambio: https://explorer-app-univo-jb3c002bk-darlyn06d.vercel.app/

Configuración de Vercel: framework Vite, comando `pnpm build`, carpeta de salida `dist` y rama de producción `main`.

La mejora se realizó en la rama `fix/foco-enlace-detalle`, con el commit `fix: mejorar el foco visible del enlace de detalle`.

Se aumentó la separación del contorno de foco de 2 a 4 en el enlace de detalle para facilitar su identificación al navegar con teclado.

La revisión individual quedó registrada como comentario en el PR antes de integrarlo. Posteriormente se comprobó el foco mediante Tab en la preview y en producción. También se verificó en producción la búsqueda de El Salvador, su combinación con Europa y América, y la apertura del detalle.

Se configuró una regla de protección para `main` que requiere Pull Request, siguiendo la alternativa de trabajo individual sin aprobación externa.

## Autoría y referencia

Darlyn Dinora Andrade Zuniga — U20240714.

Universidad de Oriente — Ingeniería en Desarrollo de Software.

Proyecto desarrollado a partir de los contenidos y recursos de Explorer App proporcionados en clase:

https://github.com/Kcruz080492/ExplorerApp


## Captura de la aplicación

Foco visible del enlace «Ver más» comprobado en producción.
<img width="1600" height="1000" alt="WhatsApp Image 2026-10-13 at 12 28 10 AM" src="https://github.com/user-attachments/assets/974c6007-20bb-4d4c-97ad-b1cbb7c275fc" />
