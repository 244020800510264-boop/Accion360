export const defaultFaultTypes = [
  { id: "leve", tipo: "Leve", horas: 4 },
  { id: "moderada", tipo: "Moderada", horas: 8 },
  { id: "grave", tipo: "Grave", horas: 14 },
  { id: "muy-grave", tipo: "Muy Grave", horas: 20 },
];

export const defaultActivities = [
  {
    id: crypto.randomUUID(),
    nombre: "Apoyo en biblioteca",
    detalle: "Clasificacion de libros y apoyo a estudiantes de primer ingreso.",
    horas: 5,
    fecha: "2026-04-10",
  },
  {
    id: crypto.randomUUID(),
    nombre: "Limpieza de areas comunes",
    detalle: "Jornada de limpieza en patio central y salones.",
    horas: 3,
    fecha: "2026-04-14",
  },
];

export const defaultFaultHistory = [
  {
    id: crypto.randomUUID(),
    fecha: "2026-04-01",
    tipo: "Moderada",
    descripcion: "Uso inadecuado del uniforme escolar.",
    reportadoPor: "Tutor de grupo",
    sancionHoras: 8,
  },
];

export const reglamento = [
  {
    titulo: "Asistencia",
    descripcion:
      "Asistir puntualmente a clases y actividades de servicio social asignadas por el tutor.",
  },
  {
    titulo: "Respeto",
    descripcion:
      "Mantener trato respetuoso con companeros, docentes y personal administrativo.",
  },
  {
    titulo: "Integridad",
    descripcion:
      "Actuar con honestidad academica y social, evitando faltas de disciplina o violencia.",
  },
  {
    titulo: "Uso de instalaciones",
    descripcion:
      "Cuidar materiales, mobiliario y espacios escolares durante cualquier actividad institucional.",
  },
];
