import { useState } from "react";
import { AlertTriangle, Clock3, PencilLine, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export function SeguimientoFaltas() {
  const {
    data,
    addActivity,
    removeActivity,
    updateCurrentFalta,
    horasAsignadas,
    horasRealizadas,
    horasPendientes,
    tipoActual,
    pushToast,
  } = useApp();

  const [nombre, setNombre] = useState("");
  const [detalle, setDetalle] = useState("");
  const [horas, setHoras] = useState("");
  const [errors, setErrors] = useState({});
  const [highlightId, setHighlightId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const falta = data.currentFalta;

  const submit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!nombre.trim()) nextErrors.nombre = "Indica el nombre de la actividad.";
    if (!detalle.trim()) nextErrors.detalle = "Describe la actividad.";
    const h = Number(horas);
    if (!horas || Number.isNaN(h) || h <= 0) nextErrors.horas = "Ingresa horas válidas (mayor a 0).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      pushToast?.("Revisa los campos del formulario.", "error");
      return;
    }

    const newId = addActivity({
      nombre: nombre.trim(),
      detalle: detalle.trim(),
      horas: h,
    });
    setNombre("");
    setDetalle("");
    setHoras("");
    setErrors({});
    setHighlightId(newId);
    window.setTimeout(() => setHighlightId(null), 1200);
    pushToast?.("Actividad agregada correctamente", "success");
  };

  const eliminarActividad = (id) => {
    const ok = window.confirm("¿Eliminar esta actividad del listado? Las horas realizadas se actualizarán.");
    if (!ok) return;
    setRemovingId(id);
    window.setTimeout(() => {
      removeActivity(id);
      setRemovingId(null);
      pushToast?.("Actividad eliminada", "success");
    }, 220);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <section className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-emerald-600" />
            Registrar actividad de servicio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Los totales de horas asignadas, realizadas y pendientes se actualizan al instante.
          </p>

          <form className="mt-4 space-y-3" onSubmit={submit} noValidate>
            <label className="block text-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Nombre de la actividad</span>
              <input
                className={`mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.nombre ? "border-red-300" : "border-slate-200"
                }`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Apoyo en biblioteca"
              />
              {errors.nombre ? (
                <span className="text-xs text-red-600 mt-1 block">{errors.nombre}</span>
              ) : null}
            </label>

            <label className="block text-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Detalle / descripción</span>
              <textarea
                rows={4}
                className={`mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400 resize-y ${
                  errors.detalle ? "border-red-300" : "border-slate-200"
                }`}
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                placeholder="Describe el servicio realizado"
              />
              {errors.detalle ? (
                <span className="text-xs text-red-600 mt-1 block">{errors.detalle}</span>
              ) : null}
            </label>

            <label className="block text-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase">Horas</span>
              <input
                type="number"
                min="0.25"
                step="0.25"
                className={`mt-1 w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.horas ? "border-red-300" : "border-slate-200"
                }`}
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
                placeholder="0"
              />
              {errors.horas ? (
                <span className="text-xs text-red-600 mt-1 block">{errors.horas}</span>
              ) : null}
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow hover:bg-emerald-700 active:scale-[0.99] transition"
            >
              Agregar Actividad
            </button>
          </form>
        </section>

        <section className="lg:col-span-7 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Horas asignadas" value={fmt(horasAsignadas)} accent="blue" />
            <StatCard label="Horas realizadas" value={fmt(horasRealizadas)} accent="emerald" />
            <StatCard label="Horas pendientes" value={fmt(horasPendientes)} accent="orange" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-800">
              <PencilLine className="h-4 w-4" />
              Falta en seguimiento (editable)
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Falta cometida
                  </p>
                  <textarea
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 leading-snug outline-none focus:ring-2 focus:ring-emerald-400 resize-y"
                    value={falta.descripcion}
                    onChange={(e) => updateCurrentFalta({ descripcion: e.target.value })}
                    placeholder="Describe la falta actual"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    Tipo de falta
                  </p>
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-emerald-800 bg-white outline-none focus:ring-2 focus:ring-emerald-400"
                    value={falta.tipoId}
                    onChange={(e) => updateCurrentFalta({ tipoId: e.target.value })}
                  >
                    {data.faultTypes.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nombre}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Horas asignadas según tabla en «Clase de faltas»:{" "}
                    <strong className="text-emerald-700 tabular-nums">{fmt(horasAsignadas)} h</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            Actividades de servicio
          </h3>
          <p className="text-xs text-slate-500">
            Total realizado:{" "}
            <span className="font-semibold text-emerald-700 tabular-nums">{fmt(horasRealizadas)} h</span>
            {tipoActual ? (
              <span className="text-slate-400"> · {tipoActual.nombre}</span>
            ) : null}
          </p>
        </div>

        {data.activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-12 text-center text-sm text-slate-500 animate-fade-in">
            No hay actividades registradas. Agrega la primera usando el formulario.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {data.activities.map((a) => {
              const isNew = highlightId && highlightId === a.id;
              const isOut = removingId === a.id;
              return (
                <article
                  key={a.id}
                  className={`relative rounded-2xl border bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover ${
                    isOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  } ${isNew ? "border-emerald-400 ring-2 ring-emerald-200" : "border-slate-200"}`}
                >
                  <div className="flex items-start justify-between gap-2 pr-10">
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">{a.nombre}</h4>
                    <span className="shrink-0 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 tabular-nums">
                      {fmt(a.horas)} h
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {a.detalle}
                  </p>
                  <button
                    type="button"
                    onClick={() => eliminarActividad(a.id)}
                    className="absolute top-3 right-3 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                    title="Eliminar actividad"
                    aria-label="Eliminar actividad"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function fmt(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return "0";
  return (Math.round(x * 100) / 100).toString();
}

function StatCard({ label, value, accent }) {
  const map = {
    blue: "from-sky-50 to-white border-sky-100",
    emerald: "from-emerald-50 to-white border-emerald-100",
    orange: "from-orange-50 to-white border-orange-100",
  };
  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm hover:shadow-md transition duration-300 ${map[accent]}`}
    >
      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}
