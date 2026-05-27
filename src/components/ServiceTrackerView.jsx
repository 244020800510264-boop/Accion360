import { useMemo, useState } from "react";
import { CheckCircle, ClipboardList, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { reglamento } from "../data/seed";

export default function ServiceTrackerView({
  mode,
  section,
  data,
  horasRealizadas,
  horasPendientes,
  addActividad,
  removeActividad,
  updateFaultCard,
  updateTiposFaltas,
  addHistorialFalta,
  removeHistorialFalta,
  updateActividad,
}) {
  const [actividad, setActividad] = useState({ nombre: "", detalle: "", horas: "", fecha: "" });
  const [camposError, setCamposError] = useState({});
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [nuevaFalta, setNuevaFalta] = useState({
    fecha: "",
    tipo: "",
    descripcion: "",
    reportadoPor: "",
    sancionHoras: "",
  });

  const canEditFaults = mode === "profesor";
  const vista = mode === "alumno" ? "SEGUIMIENTO DE FALTAS" : section;

  const tipoFaltasOptions = useMemo(
    () => data.tiposFaltas.map((item) => item.tipo ?? item.nombre ?? ""),
    [data.tiposFaltas],
  );

  const submitActividad = (e) => {
    e.preventDefault();
    const errors = {};
    if (!actividad.nombre) errors.nombre = true;
    if (!actividad.detalle) errors.detalle = true;
    if (!actividad.horas) errors.horas = true;
    if (Object.keys(errors).length > 0) {
      setCamposError(errors);
      return;
    }

    if (editingActivityId) {
      updateActividad(editingActivityId, { ...actividad, horas: Number(actividad.horas) });
      toast.success("Actividad actualizada: " + actividad.nombre);
      setEditingActivityId(null);
    } else {
      addActividad({ ...actividad, horas: Number(actividad.horas) });
      toast.success("Actividad registrada: " + actividad.nombre);
    }

    setActividad({ nombre: "", detalle: "", horas: "", fecha: "" });
    setCamposError({});
  };

  const submitFalta = (e) => {
    e.preventDefault();
    if (!nuevaFalta.fecha || !nuevaFalta.descripcion || !nuevaFalta.reportadoPor || !nuevaFalta.sancionHoras) return;
    addHistorialFalta({ ...nuevaFalta, sancionHoras: Number(nuevaFalta.sancionHoras) });
    setNuevaFalta({
      fecha: "",
      tipo: tipoFaltasOptions[0] ?? "",
      descripcion: "",
      reportadoPor: "",
      sancionHoras: "",
    });
  };

  if (vista === "REGLAMENTO") {
    return (
      <section className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-100">Reglamento</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {reglamento.map((item, idx) => (
            <article
              key={item.titulo}
              className="card-enter rounded-xl border border-soft-border bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <h3 className="font-semibold text-green-700 dark:text-emerald-300">{item.titulo}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (vista === "CLASE DE FALTAS") {
    return (
      <section className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-100">Clase de faltas</h2>
        <div className="space-y-3">
          {data.tiposFaltas.map((item, idx) => (
            <div
              key={item.id}
              className="card-enter grid grid-cols-1 gap-2 rounded-xl border border-soft-border p-3 sm:grid-cols-2 dark:border-slate-700"
              style={{ animationDelay: `${idx * 55}ms` }}
            >
              <input
                className="input"
                value={item.tipo ?? item.nombre ?? ""}
                onChange={(e) => {
                  const next = [...data.tiposFaltas];
                  const val = e.target.value;
                  next[idx] = { ...next[idx], tipo: val, nombre: val };
                  updateTiposFaltas(next);
                }}
              />
              <input
                className="input"
                type="number"
                value={item.horas}
                onChange={(e) => {
                  const next = [...data.tiposFaltas];
                  next[idx] = { ...next[idx], horas: Number(e.target.value) };
                  updateTiposFaltas(next);
                }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (vista === "HISTORIAL DE FALTAS") {
    return (
      <section className="space-y-4">
        <article className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
          <h2 className="mb-3 text-lg font-semibold text-slate-700 dark:text-slate-100">Historial de faltas</h2>
          {data.historialFaltas.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10">
              <ClipboardList size={40} className="text-slate-300 dark:text-slate-600" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Sin faltas registradas</p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {data.historialFaltas.map((item, idx) => (
                <div
                  key={item.id}
                  className="card-enter rounded-xl border border-soft-border bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
                  style={{ animationDelay: `${idx * 70}ms` }}
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.fecha}</p>
                  <p className="font-semibold text-red-700 dark:text-red-300">{item.tipo}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-100">{item.descripcion}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Reportado por: {item.reportadoPor}</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-100">
                    Sancion: {item.sancionHoras} horas
                  </p>
                  {canEditFaults && removeHistorialFalta && (
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition-all hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
                      onClick={() => removeHistorialFalta(item.id)}
                    >
                      <Trash2 size={16} />
                      Eliminar falta
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </article>

        {canEditFaults && (
          <form onSubmit={submitFalta} className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
            <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-100">Agregar nueva falta</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="input"
                type="date"
                value={nuevaFalta.fecha}
                onChange={(e) => setNuevaFalta((p) => ({ ...p, fecha: e.target.value }))}
              />
              <select
                className="input"
                value={nuevaFalta.tipo || tipoFaltasOptions[0] || ""}
                onChange={(e) => setNuevaFalta((p) => ({ ...p, tipo: e.target.value }))}
              >
                {tipoFaltasOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <input
                className="input"
                placeholder="Reportado por"
                value={nuevaFalta.reportadoPor}
                onChange={(e) => setNuevaFalta((p) => ({ ...p, reportadoPor: e.target.value }))}
              />
              <input
                className="input"
                type="number"
                placeholder="Sancion horas"
                value={nuevaFalta.sancionHoras}
                onChange={(e) => setNuevaFalta((p) => ({ ...p, sancionHoras: e.target.value }))}
              />
            </div>
            <textarea
              className="input mt-2"
              rows={3}
              placeholder="Descripcion"
              value={nuevaFalta.descripcion}
              onChange={(e) => setNuevaFalta((p) => ({ ...p, descripcion: e.target.value }))}
            />
            <button className="btn-primary mt-3">Agregar falta</button>
          </form>
        )}
      </section>
    );
  }

  const pct = Math.min(100, Math.round((horasRealizadas / (data.horasAsignadas || 1)) * 100));

  return (
    <section className="grid gap-4 xl:grid-cols-3">
      <article className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold uppercase text-green-700 dark:text-emerald-300">Resumen de horas</h2>
        <div className="space-y-2">
          <div className="stat">Horas Asignadas: {data.horasAsignadas}</div>
          <div className="stat">Horas Realizadas: {horasRealizadas}</div>
          <div className="stat">Horas Pendientes: {horasPendientes}</div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>{pct}%</span>
            {pct === 100 && (
              <>
                <CheckCircle size={18} className="text-green-600" />
                <span className="text-green-600">¡Completado!</span>
              </>
            )}
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                pct === 100 ? "bg-emerald-500" : "bg-green-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2 rounded-xl border border-soft-border bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          <input
            className="input"
            disabled={!canEditFaults}
            value={data.faltaCometida}
            onChange={(e) => updateFaultCard(e.target.value, data.tipoFaltaActual)}
          />
          <select
            className="input"
            disabled={!canEditFaults}
            value={data.tipoFaltaActual}
            onChange={(e) => updateFaultCard(data.faltaCometida, e.target.value)}
          >
            {tipoFaltasOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </article>

      <article className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold uppercase text-green-700 dark:text-emerald-300">
          Registrar actividad de servicio
        </h2>
        <form onSubmit={submitActividad} className="space-y-2">
          <input
            className={`input ${camposError.nombre ? "border-red-400" : ""}`}
            placeholder="Nombre de la actividad"
            value={actividad.nombre}
            onChange={(e) => setActividad((prev) => ({ ...prev, nombre: e.target.value }))}
          />
          <textarea
            className={`input ${camposError.detalle ? "border-red-400" : ""}`}
            rows={3}
            placeholder="Detalle"
            value={actividad.detalle}
            onChange={(e) => setActividad((prev) => ({ ...prev, detalle: e.target.value }))}
          />
          <input
            className={`input ${camposError.horas ? "border-red-400" : ""}`}
            type="number"
            placeholder="Horas"
            value={actividad.horas}
            onChange={(e) => setActividad((prev) => ({ ...prev, horas: e.target.value }))}
          />
          <input
            className="input"
            type="date"
            value={actividad.fecha}
            onChange={(e) => setActividad((prev) => ({ ...prev, fecha: e.target.value }))}
          />
          <button className="btn-primary w-full">
            {editingActivityId ? "Actualizar actividad" : "Agregar actividad"}
          </button>
          {editingActivityId && (
            <button
              type="button"
              className="w-full text-sm text-slate-500 underline"
              onClick={() => {
                setEditingActivityId(null);
                setActividad({ nombre: "", detalle: "", horas: "", fecha: "" });
                setCamposError({});
              }}
            >
              Cancelar edicion
            </button>
          )}
        </form>
      </article>

      <article className="rounded-2xl bg-white p-4 shadow-soft xl:col-span-1 dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold uppercase text-green-700 dark:text-emerald-300">
          Actividades de servicio
        </h2>
        <div className="space-y-2">
          {data.actividades.map((item, idx) => (
            <div
              key={item.id}
              className="card-enter rounded-xl border border-soft-border p-3 dark:border-slate-700"
              style={{ animationDelay: `${idx * 65}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-100">{item.nombre}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{item.detalle}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.fecha || "Sin fecha"} - {item.horas} horas
                  </p>
                </div>
                {canEditFaults && (
                  <div className="flex items-center gap-1">
                    {updateActividad && (
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-500 transition-all hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-sky-300"
                        onClick={() => {
                          setEditingActivityId(item.id);
                          setActividad({
                            nombre: item.nombre,
                            detalle: item.detalle,
                            horas: String(item.horas),
                            fecha: item.fecha || "",
                          });
                        }}
                        aria-label="Editar actividad"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                      onClick={() => removeActividad(item.id)}
                      aria-label="Eliminar actividad"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
