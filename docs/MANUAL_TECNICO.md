# Manual Técnico — ACCION 360

## 1) Descripción general

**ACCION 360** es una SPA (Single Page Application) construida con:

- **React 18**
- **Vite**
- **Tailwind CSS**
- **lucide-react** (iconos)

No usa backend: toda la información se persiste en **`localStorage`**.

## 2) Instalación y ejecución

### 2.1 Requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm

### 2.2 Comandos

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## 3) Estructura de carpetas

```
src/
  App.jsx                   # Shell de la app + render de vistas + modales
  main.jsx                  # Entry de React
  index.css                 # Tailwind base/utilities
  components/
    Header.jsx              # Header fijo con acciones (modales/guardar)
    Sidebar.jsx             # Navegación SPA entre vistas
    Modal.jsx               # Contenedor reutilizable de modales
    ToastStack.jsx          # Sistema de toasts (UI)
    HoursSummaryBar.jsx     # Barra global de resumen de horas
    modals/
      ProfileModal.jsx
      SettingsModal.jsx
      NotificationsModal.jsx
      AddHistorialModal.jsx # Alta de faltas para Historial
  context/
    AppContext.jsx          # Estado global + persistencia localStorage
  data/
    defaults.js             # Estado inicial (seed)
    reglamento.js           # Contenido del reglamento
  hooks/
    useToast.js             # Hook de toasts (estado + timers)
  pages/
    SeguimientoFaltas.jsx
    HistorialFaltas.jsx
    ClaseFaltas.jsx
    Reglamento.jsx
```

## 4) Estado global y persistencia

### 4.1 Store

El estado global vive en `src/context/AppContext.jsx` y se expone vía `useApp()`.

Campos principales del estado (`data`):

- `profile`: datos del alumno + recuperación
- `settings`: datos de cuenta/tutor
- `notifications`: lista de notificaciones
- `faultTypes`: catálogo editable de tipos de falta y horas
- `historial`: faltas registradas
- `activities`: actividades de servicio (horas realizadas)
- `currentFalta`: falta “activa” del seguimiento (`descripcion`, `tipoId`)

### 4.2 Persistencia en localStorage

- Clave: `STORAGE_KEY` en `src/data/defaults.js`
- Estrategia: `useEffect` en el provider guarda `data` al cambiar.
- Acción manual: `flushSave()` (botón refrescar) fuerza guardado + toast.

### 4.3 Migración ligera

Para compatibilidad con datos antiguos, al cargar se normaliza historial:

- Si un registro trae `accion`, se mapea a `descripcion`.

## 5) Navegación SPA (sin router)

No se usa React Router.

- `view` (string) vive en el contexto.
- El sidebar llama `setView("seguimiento" | "historial" | "clase" | "reglamento")`.
- `App.jsx` renderiza la vista correspondiente.

Animación:

- El contenedor principal usa `key={view}` y `animate-fade-in`.

## 6) Cálculo de horas

En `AppContext.jsx`:

- `horasRealizadas`: suma de `activities[].horas`
- `tipoActual`: tipo seleccionado por `currentFalta.tipoId`
- `horasAsignadas`: `tipoActual.horas`
- `horasPendientes`: `max(0, horasAsignadas - horasRealizadas)`

Estas métricas alimentan:

- Tarjetas de la vista Seguimiento
- `HoursSummaryBar` (siempre visible)

## 7) Componentes clave

### 7.1 `Header`

Acciones:

- Refresco: `flushSave()`
- Ajustes/Notificaciones/Perfil: `setModal(...)`

### 7.2 Modales

Todos usan `Modal.jsx` y cierran regresando a seguimiento mediante `goMain()` (según flujo solicitado).

### 7.3 Historial

- Alta de faltas: `AddHistorialModal` + acción `addHistorialEntry`
- Eliminación: confirmación + `removeHistorialEntry`

### 7.4 Actividades

- Alta: `addActivity`
- Baja: confirmación + `removeActivity`

## 8) UI/UX y responsividad

- Tailwind para layout responsive (mobile-first).
- Sidebar móvil con overlay.
- Hover/transition y animaciones suaves (`fade-in`, `scale-in`).

## 9) Dónde editar textos y valores por defecto

- **Reglamento**: `src/data/reglamento.js`
- **Datos demo**: `src/data/defaults.js`

## 10) Siguientes mejoras recomendadas (opcionales)

- Reemplazar `window.confirm` por un modal de confirmación consistente con el diseño.
- Añadir filtros/búsqueda en historial y actividades.
- Añadir exportación (CSV/PDF) del historial y actividades.

