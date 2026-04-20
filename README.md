# ACCION 360 - Pequenas acciones, grandes cambios

Aplicacion React + Vite + Tailwind con sistema de roles (Alumno y Profesor/Tutor) para seguimiento de horas de servicio, faltas y reglamento.

## Stack tecnico

- React + Vite
- React Router
- Tailwind CSS
- Lucide React (iconos)
- Sonner (toasts)
- Persistencia local con `localStorage`

## Credenciales de prueba

- Alumno:
  - Matricula: `1234567890`
  - Contrasena: `demo1234`
- Profesor/Tutor:
  - Matricula: `9876543210`
  - Contrasena: `demo1234`

## Flujo de uso

1. Abrir la app en `/` o `/login`.
2. Iniciar sesion segun rol.
3. Si es Alumno se redirige a `/alumno` (vista simplificada).
4. Si es Profesor se redirige a `/profesor` (vista completa con sidebar).

## Funcionalidades incluidas

- Login por rol con persistencia en `localStorage`.
- Recuperacion de contrasena con modal.
- Header en ambas vistas con:
  - Boton guardar/refrescar (toast de guardado).
  - Boton ajustes (modal).
  - Boton notificaciones (modal).
  - Boton perfil (modal con cierre de sesion).
- Profesor:
  - Sidebar con vistas activas: Seguimiento, Historial, Clase de Faltas y Reglamento.
  - Seguimiento de faltas con:
    - Formulario de actividades.
    - Totales de horas en tiempo real.
    - Lista de actividades con eliminar.
    - Edicion de falta cometida y tipo de falta.
  - Clase de faltas editable y persistida.
  - Historial de faltas con alta de nuevas faltas.
- Alumno:
  - Vista simplificada para consultar y registrar sus actividades y horas.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
