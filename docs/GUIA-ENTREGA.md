# Pasos pendientes en tus cuentas

## 1. Abrir y ejecutar

Extrae el ZIP. En VS Code usa Archivo → Abrir carpeta y selecciona `ExplorerApp-UNIVO`, donde está `package.json`. Terminal → Nueva terminal. Ejecuta los comandos del README. No abras `index.html` directamente ni uses Live Server: este proyecto necesita Vite.

## 2. Publicar en GitHub

Crea un repositorio público vacío llamado `explorer-app-univo` en tu cuenta, sin README inicial. Dentro de la carpeta del proyecto:

```bash
git init -b main
git add .
git commit -m "feat: implementar Explorer App modular en TypeScript"
git remote add origin https://github.com/TU_USUARIO/explorer-app-univo.git
git push -u origin main
```

Sustituye TU_USUARIO. Si Git solicita identidad, configura tu nombre y el correo de tu cuenta. Nunca compartas contraseñas ni tokens en el chat.

## 3. Vercel

Inicia sesión, Add New → Project → importa tu repositorio. Selecciona Vite, raíz donde está package.json, build `pnpm build`, salida `dist`, producción `main`. No requiere variables de API. Publica y verifica tarjetas, búsqueda, filtro y detalle. Guarda la URL principal.

## 4. Protección y mejora mediante PR

En GitHub: Settings → Branches → regla para `main`. Requerir PR. Para práctica individual, no exigir aprobación externa; registrar tu revisión como comentario, como permite S21. Si tu cuenta no ofrece protección, captura la limitación y continúa usando PR.

```bash
git switch -c fix/foco-enlace-detalle
```

En `src/render/countryCard.ts`, la constante `focus` tiene `focus-visible:outline-offset-2`. Mejora la separación cambiándola a `focus-visible:outline-offset-4`. Comprueba con Tab ambos enlaces de la tarjeta y Enter hacia el detalle. Es un cambio visible respecto de la versión inicial; no retires el foco para crear artificialmente un problema.

```bash
pnpm build
pnpm preview
git add src/render/countryCard.ts
git commit -m "fix: ampliar separación del foco en enlaces de países"
git push -u origin fix/foco-enlace-detalle
```

Abre un PR hacia main. Describe problema, cambio y pruebas reales. Copia la preview del último commit desde Vercel y añádela al PR. Verifica foco con Tab, navegación con Enter, regreso, búsqueda, región y vista móvil. Registra un comentario con lo probado y cualquier limitación. Integra el PR y comprueba la mejora en la URL principal de producción.

## 5. Documentación y etiqueta

Actualiza README con enlaces reales y una captura. Si main ya está protegida, hazlo mediante otra rama y PR:

```bash
git switch main
git pull --ff-only origin main
git switch -c docs/evidencias-entrega
```

Edita README. Sustituye los campos pendientes y el enlace de la etiqueta con tu usuario y repositorio. Agrega una captura con enlace relativo. Commit `docs: completar enlaces y evidencias de entrega`, push, revisión y merge. Después:

```bash
git switch main
git pull --ff-only origin main
git tag entrega-lab-vanilla
git push origin entrega-lab-vanilla
```

## 6. Texto para Canvas — S21

Completa con los datos reales:

- Mejora realizada: separación de 4 px del contorno de foco en enlaces de países.
- Repositorio:
- PR integrado:
- Preview revisada:
- Producción:
- README:
- Revisión realizada por:
- Captura de protección de main o limitación:
- Limitaciones o pruebas pendientes:

Ticket de salida: explica qué cambiaste, qué comprobaste antes del merge y qué evidencia demuestra que producción se actualizó (deployment de main y captura de la mejora en la URL principal).

## 7. Texto para Canvas — laboratorio S22

- Repositorio público:
- Versión Vanilla: enlace a `/tree/entrega-lab-vanilla`.
- README con instrucciones:
- Fuente: JSON proporcionado por la docente, cargado y validado mediante fetch.

## Pruebas manuales

Carga: DevTools → Network → ralentiza la conexión y recarga; aparecen ocho skeletons. Vacío: escribe `zzzzzz` o combina un país con una región que no le corresponde. Error: activa Offline y recarga; desactívalo y pulsa Reintentar. No dejes Offline ni rutas incorrectas al entregar.

Comprueba que limpiar solo el buscador conserva la región y que seleccionar todas las regiones conserva la búsqueda. El botón Limpiar filtros elimina ambos intencionalmente. El detalle `#/country/ZZ` debe dar error con regreso. Prueba 360, 768 y 1280 px y Tab. Las imágenes externas pueden fallar; el respaldo debe conservar el espacio de la bandera.
