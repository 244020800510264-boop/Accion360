import { useEffect } from "react";
import { CalendarDays, UserRound } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export function HistorialFaltas() {
  const { data, view, pushToast } = useApp();

  useEffect(() => {
    if (view !== "historial") return;
    if (!data.historial.length) {
      pushToast?.("No hay faltas registradas", "info");
    }
  }, [view, data.historial.length, pushToast]);

  if (!data.historial.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-14 text-center">
        <p className="text-sm text-slate-600">
          No hay faltas registradas en el historial.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">
        Registro de incidencias previas y sanciones en horas de servicio.
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {data.historial.map((h) => (
          <li
            key={h.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card hover:shadow-card-hover transition"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
              <CalendarDays className="h-4 w-4 text-emerald-600" />
              {h.fecha}
            </div>
            <p className="mt-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
              {h.tipoFalta}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{h.accion}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
              <UserRound className="h-4 w-4 text-slate-400" />
              <span>Reportado por: {h.reportadoPor}</span>
            </div>
            <p className="mt-2 text-sm">
              <span className="text-slate-500">Sanción: </span>
              <span className="font-bold text-orange-600">{h.sancionHoras} h</span> de servicio
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
