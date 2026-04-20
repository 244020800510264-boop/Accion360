export const STORAGE_KEY = "accion360-v2-state";

export const defaultFaultTypes = [
  { id: "ft-leve", nombre: "FALTA LEVE", horas: 4 },
  { id: "ft-moderada", nombre: "FALTA MODERADA", horas: 12 },
  { id: "ft-grave", nombre: "FALTA GRAVE", horas: 48 },
  { id: "ft-muy-grave", nombre: "FALTA MUY GRAVE", horas: 96 },
];

export const defaultProfile = {
  nombreAlumno: "Juan Pérez García",
  matricula: "2024001234",
  gradoGrupo: "3° A",
  edad: "15",
  correo: "juan.perez@escuela.edu.mx",
  telefono: "55 1234 5678",
  tutorNombre: "María García López",
  tutorCorreo: "maria.garcia@correo.com",
  tutorTelefono: "55 9876 5432",
  correoRecuperacion: "",
};

export const defaultSettings = {
  institucion: "Secundaria Técnica No. 45",
  cicloEscolar: "2025-2026",
  coordinador: "Lic. Ana Ruiz Morales",
  notasCuenta: "Los datos se guardan localmente en este dispositivo.",
};

export const defaultNotifications = [
  {
    id: "n1",
    titulo: "Recordatorio de servicio",
    cuerpo: "Tienes horas pendientes por registrar esta semana.",
    fecha: "2026-04-14",
    leida: false,
  },
  {
    id: "n2",
    titulo: "Actualización de reglamento",
    cuerpo: "Se publicó una nueva versión del reglamento interno.",
    fecha: "2026-04-10",
    leida: true,
  },
];

export const defaultHistorial = [
  {
    id: "h1",
    fecha: "2026-03-22",
    tipoFalta: "FALTA MODERADA",
    accion: "Uso de celular en evaluación",
    reportadoPor: "Prof. Luis Hernández",
    sancionHoras: 12,
  },
  {
    id: "h2",
    fecha: "2026-02-10",
    tipoFalta: "FALTA LEVE",
    accion: "Llegada tardía reiterada",
    reportadoPor: "Orientación educativa",
    sancionHoras: 4,
  },
];

export const defaultCurrentFalta = {
  descripcion: "GOLPEAR A UN COMPAÑERO DE CLASE",
  tipoId: "ft-grave",
};

export function buildInitialState() {
  return {
    profile: { ...defaultProfile },
    settings: { ...defaultSettings },
    notifications: defaultNotifications.map((n) => ({ ...n })),
    faultTypes: defaultFaultTypes.map((f) => ({ ...f })),
    historial: defaultHistorial.map((h) => ({ ...h })),
    activities: [],
    currentFalta: { ...defaultCurrentFalta },
  };
}
