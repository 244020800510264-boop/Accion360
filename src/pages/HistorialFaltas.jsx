import { useState } from "react";
import { CalendarDays, Plus, Trash2, UserRound } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { AddHistorialModal } from "../components/modals/AddHistorialModal.jsx";

function tipoBadgeClass(tipo) {
  const t = (tipo || "").toUpperCase();
  if (t.includes("MUY GRAVE")) return "bg-red-100 text-red-800 border-red-200";
  if (t.includes("GRAVE")) return "bg-orange-100 text-orange-900 border-orange-200";
  if (t.includes("MODERADA")) return "bg-amber-100 text-amber-900 border-amber-200";
  if (t.includes("LEVE")) return "bg-sky-100 text-sky-900 border-sky-200";
  return "bg-slate-100 text-slate-800 border-slate-200";
}

export function HistorialFaltas() {
  const { data, removeHistorialEntry, pushToast } = useApp();
  const [addOpen, setAddOpen] = useState(false);

  const eliminar = (id) => {
    const ok = window.confirm("¿Eliminar esta falta del historial?");
    if (!ok) return;
    removeHistorialEntry(id);
    pushToast?.("Registro eliminado del historial", "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600 max-w-xl">
          Consulta las faltas registradas con fecha, tipo, descripción, quién reportó y la sanción en horas
          de servicio. Usa el botón para agregar un nuevo registro.
        </p>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-emerald-700 transition active:scale-[0.99] shrink-0"
        >
          <Plus className="h-5 w-5" />
          Registrar falta
        </button>
      </div>

      {!data.historial.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center animate-fade-in">
          <p className="text-sm font-medium text-slate-600">
            No hay faltas registradas todavía.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Pulsa <strong>Registrar falta</strong> o el botón <strong>+</strong> flotante para añadir la primera.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 animate-fade-in">
          {data.historial.map((h) => {
            const texto = h.descripcion || h.accion || "—";
            return (
              <li
                key={h.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                  <CalendarDays className="h-4 w-4 text-emerald-600" />
                  {h.fecha}
                </div>
                <span
                  className={`mt-2 inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tipoBadgeClass(h.tipoFalta)}`}
                >
                  {h.tipoFalta}
                </span>
                <p className="mt-2 text-sm font-semibold text-slate-900 leading-snug">{texto}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <UserRound className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>Reportado por: {h.reportadoPor}</span>
                </div>
                <p className="mt-2 text-sm">
                  <span className="text-slate-500">Sanción: </span>
                  <span className="font-bold text-orange-600 tabular-nums">{h.sancionHoras} h</span>
                  <span className="text-slate-500"> de servicio</span>
                </p>

                <button
                  type="button"
                  onClick={() => eliminar(h.id)}
                  className="absolute top-3 right-3 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 sm:opacity-100 focus:opacity-100 focus-visible:opacity-100"
                  title="Eliminar registro"
                  aria-label="Eliminar registro del historial"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {!addOpen ? (
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:scale-105 active:scale-95 transition sm:bottom-8 sm:right-8"
          aria-label="Registrar nueva falta"
        >
          <Plus className="h-7 w-7" />
        </button>
      ) : null}

      <AddHistorialModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
