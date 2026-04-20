# ACCION 360 — Pequeñas acciones, grandes cambios

SPA (Single Page Application) para **seguimiento de horas de servicio** y consulta de **historial**, **clase de faltas** y **reglamento**. Interfaz tipo dashboard con encabezado verde, barra lateral y tarjetas de estadísticas, inspirada en el tablero Miro del equipo.

## Stack

- **React 18**
- **Vite 6**
- **Tailwind CSS 3**
- **Lucide React** (iconografía)

Los datos se persisten en **`localStorage`** en el navegador (perfil, actividades, tipos de falta, historial, notificaciones y ajustes).

## Requisitos

- Node.js **18+** (recomendado 20 LTS)
- npm (incluido con Node)

## Instalación

```bash
git clone https://github.com/<tu-usuario>/Accion360.git
cd Accion360
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Producción

```bash
npm run build
npm run preview
```

La carpeta `dist/` contiene los archivos estáticos listos para desplegar (GitHub Pages, Netlify, Vercel, etc.).

## Estructura del proyecto

```
src/
  App.jsx                 # Composición principal, modales y rutas internas por vista
  main.jsx
  index.css
  components/             # Header, Sidebar, Modal, Toast, logo
  components/modals/      # Ajustes, notificaciones, perfil
  context/AppContext.jsx  # Estado global + persistencia
  data/                   # Valores por defecto y texto del reglamento
  hooks/useToast.js
  pages/                  # Seguimiento, historial, clase de faltas, reglamento
public/
supabase/                 # Esquema SQL de referencia (opcional; la app actual usa localStorage)
```

## Funcionalidades principales

- **Seguimiento de faltas (vista por defecto):** formulario de actividad, totales de horas asignadas / realizadas / pendientes, falta y tipo actuales, grid de actividades.
- **Historial de faltas:** tarjetas con fecha, tipo, acción, quién reportó y sanción en horas.
- **Clase de faltas:** edición de horas por tipo (Leve, Moderada, Grave, Muy grave).
- **Reglamento:** normas agrupadas por sección (`src/data/reglamento.js`).
- **Modales:** ajustes de cuenta, notificaciones, perfil (con recuperación de contraseña por correo simulada).
- **Actualizar (icono refresco):** guarda en `localStorage` y muestra aviso **“Datos guardados correctamente”**.
- **Menú móvil:** abre/cierra el sidebar; **REGRESAR / cerrar modal** vuelve a la vista principal de seguimiento.

## Capturas sugeridas para el README

1. **Escritorio — Seguimiento:** encabezado con título en verde, sidebar y formulario + tarjetas de horas.
2. **Móvil:** menú lateral abierto y cabecera con iconos.
3. **Modal de perfil** con datos del alumno y bloque “¿Olvidaste tu contraseña?”.
4. **Clase de faltas** editando horas.
5. **Reglamento** con varias secciones visibles.

*(Sustituye este apartado por imágenes reales cuando las tengas, por ejemplo `![Seguimiento](./docs/screenshots/seguimiento.png)`.)*

## Notas para el equipo

- Para alinear textos del **reglamento** con el Miro, edita `src/data/reglamento.js`.
- Los datos demo iniciales están en `src/data/defaults.js`.
- La carpeta `supabase/` conserva un esquema de referencia por si en el futuro se conecta de nuevo a backend; la versión actual no requiere `config.js`.

## Licencia

Uso educativo / proyecto escolar — ajusta la licencia según lo acuerde tu equipo.
