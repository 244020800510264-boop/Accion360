import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { defaultFaultTypes } from "../data/defaults";
import { defaultActivities, defaultFaultHistory } from "../data/seed";

const STORAGE_KEY = "accion360_data";
const DEFAULT_ASSIGNED_HOURS = 150;

function normalizeTiposFaltas(list) {
  return (list ?? []).map((f) => ({
    ...f,
    tipo: f.tipo ?? f.nombre ?? "",
    nombre: f.nombre ?? f.tipo ?? "",
  }));
}

function getInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        tiposFaltas: normalizeTiposFaltas(parsed.tiposFaltas ?? defaultFaultTypes),
      };
    }
  } catch {
    // noop
  }
  const tiposFaltas = normalizeTiposFaltas(defaultFaultTypes);
  return {
    horasAsignadas: DEFAULT_ASSIGNED_HOURS,
    actividades: defaultActivities,
    historialFaltas: defaultFaultHistory,
    tiposFaltas,
    faltaCometida: "Golpe a un companero de clase",
    tipoFaltaActual: tiposFaltas.find((f) => f.id === "ft-grave")?.tipo ?? tiposFaltas[0]?.tipo ?? "",
  };
}

export function useServiceData() {
  const [data, setData] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const horasRealizadas = useMemo(
    () => data.actividades.reduce((acc, item) => acc + Number(item.horas || 0), 0),
    [data.actividades],
  );
  const horasPendientes = Math.max(0, data.horasAsignadas - horasRealizadas);

  const addActividad = (payload) => {
    if (payload.horas <= 0) {
      toast.error("Las horas deben ser mayor a 0");
      return;
    }
    if (payload.horas > 24) {
      toast.error("Máximo 24 horas por actividad");
      return;
    }
    setData((prev) => ({
      ...prev,
      actividades: [{ id: crypto.randomUUID(), ...payload }, ...prev.actividades],
    }));
  };

  const removeActividad = (id) => {
    setData((prev) => ({ ...prev, actividades: prev.actividades.filter((item) => item.id !== id) }));
  };

  const updateActividad = (id, payload) => {
    setData((prev) => ({
      ...prev,
      actividades: prev.actividades.map((item) => (item.id === id ? { ...item, ...payload } : item)),
    }));
  };

  const updateFaultCard = (faltaCometida, tipoFaltaActual) => {
    setData((prev) => ({ ...prev, faltaCometida, tipoFaltaActual }));
  };

  const updateTiposFaltas = (tiposFaltas) => {
    setData((prev) => ({ ...prev, tiposFaltas }));
  };

  const addHistorialFalta = (item) => {
    setData((prev) => ({
      ...prev,
      historialFaltas: [{ id: crypto.randomUUID(), ...item }, ...prev.historialFaltas],
    }));
  };

  const removeHistorialFalta = (id) => {
    setData((prev) => ({
      ...prev,
      historialFaltas: prev.historialFaltas.filter((item) => item.id !== id),
    }));
  };

  const saveData = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return {
    data,
    horasRealizadas,
    horasPendientes,
    addActividad,
    removeActividad,
    updateActividad,
    updateFaultCard,
    updateTiposFaltas,
    addHistorialFalta,
    removeHistorialFalta,
    saveData,
  };
}
