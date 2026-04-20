import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  STORAGE_KEY,
  buildInitialState,
} from "../data/defaults.js";

const AppContext = createContext(null);

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function mergeWithDefaults(saved) {
  const base = buildInitialState();
  if (!saved) return base;
  return {
    profile: { ...base.profile, ...saved.profile },
    settings: { ...base.settings, ...saved.settings },
    notifications: Array.isArray(saved.notifications)
      ? saved.notifications
      : base.notifications,
    faultTypes: Array.isArray(saved.faultTypes) ? saved.faultTypes : base.faultTypes,
    historial: Array.isArray(saved.historial)
      ? saved.historial.map((h) => ({
          ...h,
          descripcion: h.descripcion ?? h.accion ?? "",
        }))
      : base.historial,
    activities: Array.isArray(saved.activities) ? saved.activities : base.activities,
    currentFalta: { ...base.currentFalta, ...saved.currentFalta },
  };
}

export function AppProvider({ children, onToast }) {
  const [view, setView] = useState("seguimiento");
  const [data, setData] = useState(() => mergeWithDefaults(loadPersisted()));
  const [modal, setModal] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const persist = useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      onToast?.("No se pudieron guardar los datos en este dispositivo.", "error");
      console.error(e);
    }
  }, [onToast]);

  useEffect(() => {
    persist(data);
  }, [data, persist]);

  const flushSave = useCallback(() => {
    persist(data);
    onToast?.("Datos guardados correctamente", "success");
  }, [data, persist, onToast]);

  const goMain = useCallback(() => {
    setView("seguimiento");
    setModal(null);
    setMobileSidebarOpen(false);
  }, []);

  const navigate = useCallback((nextView) => {
    setView(nextView);
    setMobileSidebarOpen(false);
  }, []);

  const horasRealizadas = useMemo(
    () => data.activities.reduce((acc, a) => acc + (Number(a.horas) || 0), 0),
    [data.activities]
  );

  const tipoActual = useMemo(
    () => data.faultTypes.find((t) => t.id === data.currentFalta.tipoId),
    [data.faultTypes, data.currentFalta.tipoId]
  );

  const horasAsignadas = tipoActual ? Number(tipoActual.horas) || 0 : 0;

  const horasPendientes = Math.max(0, horasAsignadas - horasRealizadas);

  const updateProfile = useCallback((patch) => {
    setData((d) => ({ ...d, profile: { ...d.profile, ...patch } }));
  }, []);

  const updateSettings = useCallback((patch) => {
    setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }));
  }, []);

  const updateFaultType = useCallback((id, horas) => {
    setData((d) => ({
      ...d,
      faultTypes: d.faultTypes.map((f) =>
        f.id === id ? { ...f, horas: Number(horas) || 0 } : f
      ),
    }));
  }, []);

  const markNotificationRead = useCallback((id) => {
    setData((d) => ({
      ...d,
      notifications: d.notifications.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      ),
    }));
  }, []);

  const addActivity = useCallback((actividad) => {
    const id = crypto.randomUUID();
    setData((d) => ({
      ...d,
      activities: [
        {
          id,
          nombre: actividad.nombre,
          detalle: actividad.detalle,
          horas: Number(actividad.horas) || 0,
          createdAt: new Date().toISOString(),
        },
        ...d.activities,
      ],
    }));
    return id;
  }, []);

  const removeActivity = useCallback((id) => {
    setData((d) => ({
      ...d,
      activities: d.activities.filter((a) => a.id !== id),
    }));
  }, []);

  const updateCurrentFalta = useCallback((patch) => {
    setData((d) => ({
      ...d,
      currentFalta: { ...d.currentFalta, ...patch },
    }));
  }, []);

  const addHistorialEntry = useCallback((entry) => {
    const id = crypto.randomUUID();
    setData((d) => ({
      ...d,
      historial: [
        {
          id,
          fecha: entry.fecha,
          tipoFalta: entry.tipoFalta,
          descripcion: entry.descripcion,
          reportadoPor: entry.reportadoPor,
          sancionHoras: Number(entry.sancionHoras) || 0,
        },
        ...d.historial,
      ],
    }));
    return id;
  }, []);

  const removeHistorialEntry = useCallback((id) => {
    setData((d) => ({
      ...d,
      historial: d.historial.filter((h) => h.id !== id),
    }));
  }, []);

  const value = useMemo(
    () => ({
      view,
      setView: navigate,
      data,
      setData,
      modal,
      setModal,
      mobileSidebarOpen,
      setMobileSidebarOpen,
      goMain,
      flushSave,
      pushToast: onToast ?? (() => {}),
      horasRealizadas,
      horasAsignadas,
      horasPendientes,
      tipoActual,
      updateProfile,
      updateSettings,
      updateFaultType,
      markNotificationRead,
      addActivity,
      removeActivity,
      updateCurrentFalta,
      addHistorialEntry,
      removeHistorialEntry,
    }),
    [
      view,
      navigate,
      data,
      modal,
      mobileSidebarOpen,
      goMain,
      flushSave,
      onToast,
      horasRealizadas,
      horasAsignadas,
      horasPendientes,
      tipoActual,
      updateProfile,
      updateSettings,
      updateFaultType,
      markNotificationRead,
      addActivity,
      removeActivity,
      updateCurrentFalta,
      addHistorialEntry,
      removeHistorialEntry,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
}
