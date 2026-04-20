import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
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
}) {
  const [actividad, setActividad] = useState({ nombre: "", detalle: "", horas: "", fecha: "" });
  const [nuevaFalta, setNuevaFalta] = useState({
    fecha: "",
    tipo: "Leve",
    descripcion: "",
    reportadoPor: "",
    sancionHoras: "",
  });

  const canEditFaults = mode === "profesor";
  const vista = mode === "alumno" ? "SEGUIMIENTO DE FALTAS" : section;

  const tipoFaltasOptions = useMemo(() => data.tiposFaltas.map((item) => item.tipo), [data.tiposFaltas]);

  const submitActividad = (e) => {
    e.preventDefault();
    if (!actividad.nombre || !actividad.detalle || !actividad.horas) return;
    addActividad({ ...actividad, horas: Number(actividad.horas) });
    setActividad({ nombre: "", detalle: "", horas: "", fecha: "" });
  };

  const submitFalta = (e) => {
    e.preventDefault();
    if (!nuevaFalta.fecha || !nuevaFalta.descripcion || !nuevaFalta.reportadoPor || !nuevaFalta.sancionHoras) return;
    addHistorialFalta({ ...nuevaFalta, sancionHoras: Number(nuevaFalta.sancionHoras) });
    setNuevaFalta({ fecha: "", tipo: "Leve", descripcion: "", reportadoPor: "", sancionHoras: "" });
  };

  if (vista === "REGLAMENTO") {
    return (
      <section className="rounded-2xl bg-white p-4 shadow-soft">
        <h2 className="mb-3 text-lg font-semibold text-slate-700">Reglamento</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {reglamento.map((item) => (
            <article key={item.titulo} className="rounded-xl border border-soft-border bg-slate-50 p-3">
              <h3 className="font-semibold text-green-700">{item.titulo}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (vista === "CLASE DE FALTAS") {
    return (
      <section className="rounded-2xl bg-white p-4 shadow-soft">
        <h2 className="mb-3 text-lg font-semibold text-slate-700">Clase de faltas</h2>
        <div className="space-y-3">
          {data.tiposFaltas.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-2 gap-2 rounded-xl border border-soft-border p-3">
              <input
                className="input"
                value={item.tipo}
                onChange={(e) => {
                  const next = [...data.tiposFaltas];
                  next[idx] = { ...next[idx], tipo: e.target.value };
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
        <article className="rounded-2xl bg-white p-4 shadow-soft">
          <h2 className="mb-3 text-lg font-semibold text-slate-700">Historial de faltas</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {data.historialFaltas.map((item) => (
              <div key={item.id} className="rounded-xl border border-soft-border bg-slate-50 p-3">
                <p className="text-xs text-slate-500">{item.fecha}</p>
                <p className="font-semibold text-red-700">{item.tipo}</p>
                <p className="text-sm text-slate-700">{item.descripcion}</p>
                <p className="text-sm text-slate-500">Reportado por: {item.reportadoPor}</p>
                <p className="text-sm font-medium text-slate-700">Sancion: {item.sancionHoras} horas</p>
              </div>
            ))}
          </div>
        </article>

        {canEditFaults && (
          <form onSubmit={submitFalta} className="rounded-2xl bg-white p-4 shadow-soft">
            <h3 className="mb-3 font-semibold text-slate-700">Agregar nueva falta</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="input"
                type="date"
                value={nuevaFalta.fecha}
                onChange={(e) => setNuevaFalta((p) => ({ ...p, fecha: e.target.value }))}
              />
              <select
                className="input"
                value={nuevaFalta.tipo}
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

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-2xl bg-white p-4 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold uppercase text-green-700">Resumen de horas</h2>
        <div className="space-y-2">
          <div className="stat">Horas Asignadas: {data.horasAsignadas}</div>
          <div className="stat">Horas Realizadas: {horasRealizadas}</div>
          <div className="stat">Horas Pendientes: {horasPendientes}</div>
        </div>
        <div className="mt-4 space-y-2 rounded-xl border border-soft-border bg-slate-50 p-3">
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

      <article className="rounded-2xl bg-white p-4 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold uppercase text-green-700">Registrar actividad de servicio</h2>
        <form onSubmit={submitActividad} className="space-y-2">
          <input
            className="input"
            placeholder="Nombre de la actividad"
            value={actividad.nombre}
            onChange={(e) => setActividad((prev) => ({ ...prev, nombre: e.target.value }))}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Detalle"
            value={actividad.detalle}
            onChange={(e) => setActividad((prev) => ({ ...prev, detalle: e.target.value }))}
          />
          <input
            className="input"
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
          <button className="btn-primary w-full">Agregar actividad</button>
        </form>
      </article>

      <article className="rounded-2xl bg-white p-4 shadow-soft lg:col-span-1">
        <h2 className="mb-3 text-sm font-semibold uppercase text-green-700">Actividades de servicio</h2>
        <div className="space-y-2">
          {data.actividades.map((item) => (
            <div key={item.id} className="rounded-xl border border-soft-border p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-700">{item.nombre}</p>
                  <p className="text-sm text-slate-500">{item.detalle}</p>
                  <p className="text-xs text-slate-500">
                    {item.fecha || "Sin fecha"} - {item.horas} horas
                  </p>
                </div>
                <button
                  className="rounded-md p-1 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeActividad(item.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
