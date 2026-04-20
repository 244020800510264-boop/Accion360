# Manual de Usuario — ACCION 360

## 1) Objetivo

**ACCION 360** es una aplicación tipo dashboard para:

- Registrar **actividades de servicio** (horas realizadas)
- Consultar y administrar el **historial de faltas**
- Editar **horas asignadas** por tipo de falta
- Consultar el **reglamento** por secciones

La app funciona como **Single Page Application (SPA)**: cambias de sección sin recargar la página.

## 2) Requisitos para usarla

- Un navegador moderno (Chrome/Edge/Firefox).
- No requiere internet para operar (los datos se guardan localmente en el dispositivo).

## 3) Pantalla principal (Seguimiento de faltas)

En la parte superior verás:

- **Header** con iconos (Actualizar, Ajustes, Notificaciones, Perfil).
- Una **barra de resumen** con: **Horas asignadas**, **realizadas** y **pendientes** (se actualiza en tiempo real).

### 3.1 Registrar actividad de servicio

En el formulario:

- **Nombre de la actividad**: escribe un nombre corto.
- **Detalle/Descripción**: describe lo realizado.
- **Horas**: ingresa un número (ej. `1`, `2.5`, `0.25`).

Luego presiona **“Agregar Actividad”**.

**Qué pasa al agregar**

- La actividad aparece como tarjeta en “Actividades de servicio”.
- Las **Horas realizadas** aumentan.
- Las **Horas pendientes** se recalculan automáticamente.

### 3.2 Eliminar una actividad

En cada tarjeta de actividad hay un botón de eliminar.

- Al presionarlo, la app te pedirá confirmación.
- Si aceptas, la actividad se elimina y las horas se actualizan.

### 3.3 Editar “Falta cometida” y “Tipo de falta”

En el bloque de “Falta en seguimiento (editable)”:

- Puedes **editar la descripción** de la falta.
- Puedes **cambiar el tipo de falta** (Leve/Moderada/Grave/Muy grave).

Al cambiar el tipo, se recalculan las **Horas asignadas** según la tabla de “Clase de faltas”.

## 4) Sidebar (menú lateral)

Botones disponibles:

- **HISTORIAL DE FALTAS**
- **CLASE DE FALTAS**
- **REGLAMENTO**
- **SEGUIMIENTO DE FALTAS**

El botón activo se resalta en verde.

## 5) Historial de faltas

Aquí se muestran tarjetas con:

- **Fecha**
- **Tipo de falta**
- **Descripción**
- **Reportado por**
- **Sanción** (horas de servicio)

### 5.1 Agregar una nueva falta

Usa cualquiera de estos botones:

- **“Registrar falta”** (arriba)
- Botón flotante **“+”** (abajo a la derecha)

Completa el formulario y presiona **Guardar**.

### 5.2 Eliminar una falta del historial

Cada tarjeta tiene opción de eliminar:

- La app pide confirmación antes de borrar.

### 5.3 Si el historial está vacío

Verás el mensaje:

**“No hay faltas registradas todavía.”**

## 6) Clase de faltas

Verás una tabla editable:

- **Tipo de falta**: (Leve, Moderada, Grave, Muy grave)
- **Horas asignadas**: campo numérico editable

Al cambiar las horas:

- Se guardan automáticamente.
- Se reflejan en “Seguimiento” al instante cuando el tipo activo coincide.

## 7) Reglamento

Se muestra en tarjetas por sección (por ejemplo):

- Asistencia y Puntualidad
- Respeto y Convivencia
- Integridad Académica
- Uso de Instalaciones y Bienes

## 8) Botones del Header

- **Actualizar (↻)**: guarda todos los cambios y muestra el mensaje:
  - **“Datos guardados correctamente”**
- **Ajustes (⚙️)**: abre un modal con información de cuenta/tutor.
- **Notificaciones (🛎️)**: abre un modal (si está vacío muestra “No hay notificaciones nuevas”).
- **Perfil (👤)**: abre un modal con datos del alumno y permite editar.

## 9) Guardado de datos (importante)

Los datos se guardan en el navegador usando **localStorage**:

- Si cierras y vuelves a abrir la app en el mismo navegador/dispositivo, los datos se mantienen.
- Si borras los datos del navegador, se perderán los registros locales.

