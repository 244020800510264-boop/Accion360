import { useEffect, useMemo, useState } from "react";
import { defaultActivities, defaultFaultHistory, defaultFaultTypes } from "../data/seed";

const STORAGE_KEY = "accion360_data";
const DEFAULT_ASSIGNED_HOURS = 150;

function getInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // noop
  }
  return {
    horasAsignadas: DEFAULT_ASSIGNED_HOURS,
    actividades: defaultActivities,
    historialFaltas: defaultFaultHistory,
    tiposFaltas: defaultFaultTypes,
    faltaCometida: "Golpe a un companero de clase",
    tipoFaltaActual: "Grave",
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
    setData((prev) => ({
      ...prev,
      actividades: [{ id: crypto.randomUUID(), ...payload }, ...prev.actividades],
    }));
  };

  const removeActividad = (id) => {
    setData((prev) => ({ ...prev, actividades: prev.actividades.filter((item) => item.id !== id) }));
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

  const saveData = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return {
    data,
    horasRealizadas,
    horasPendientes,
    addActividad,
    removeActividad,
    updateFaultCard,
    updateTiposFaltas,
    addHistorialFalta,
    saveData,
  };
}
