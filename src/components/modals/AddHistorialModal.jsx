import { useEffect, useState } from "react";
import { Modal } from "../Modal.jsx";
import { useApp } from "../../context/AppContext.jsx";

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

export function AddHistorialModal({ open, onClose }) {
  const { data, addHistorialEntry, pushToast } = useApp();
  const [fecha, setFecha] = useState(todayISODate());
  const [tipoId, setTipoId] = useState(data.faultTypes[0]?.id ?? "");
  const [descripcion, setDescripcion] = useState("");
  const [reportadoPor, setReportadoPor] = useState("");
  const [sancionHoras, setSancionHoras] = useState(
    String(data.faultTypes[0]?.horas ?? 0)
  );
  const [errors, setErrors] = useState({});

  const tipoSel = data.faultTypes.find((t) => t.id === tipoId);

  useEffect(() => {
    if (!open) return;
    setFecha(todayISODate());
    setDescripcion("");
    setReportadoPor("");
    setErrors({});
    const first = data.faultTypes[0];
    if (first) setTipoId(first.id);
  }, [open]);

  useEffect(() => {
    if (!open || !tipoSel) return;
    setSancionHoras(String(tipoSel.horas ?? 0));
  }, [tipoId, tipoSel, open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!descripcion.trim()) next.descripcion = "Describe la falta.";
    if (!reportadoPor.trim()) next.reportadoPor = "Indica quién reportó.";
    const h = Number(sancionHoras);
    if (!sancionHoras || Number.isNaN(h) || h < 0) next.sancionHoras = "Horas de sanción inválidas.";
    setErrors(next);
    if (Object.keys(next).length) {
      pushToast?.("Revisa los campos obligatorios.", "error");
      return;
    }

    addHistorialEntry({
      fecha,
      tipoFalta: tipoSel?.nombre ?? "FALTA",
      descripcion: descripcion.trim(),
      reportadoPor: reportadoPor.trim(),
      sancionHoras: h,
    });
    pushToast?.("Falta registrada en el historial", "success");
    onClose();
  };

  return (
    <Modal
      title="Registrar falta en historial"
      onClose={onClose}
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="form-historial-add"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
          >
            Guardar
          </button>
        </div>
      }
    >
      <form id="form-historial-add" className="space-y-3 text-sm" onSubmit={submit}>
        <label className="block">
          <span className="text-xs font-semibold text-slate-500 uppercase">Fecha</span>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-500 uppercase">Tipo de falta</span>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value)}
          >
            {data.faultTypes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-500 uppercase">Descripción de la falta</span>
          <textarea
            rows={3}
            className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400 resize-y ${
              errors.descripcion ? "border-red-300" : "border-slate-200"
            }`}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe lo sucedido"
          />
          {errors.descripcion ? (
            <span className="text-xs text-red-600 mt-0.5 block">{errors.descripcion}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-500 uppercase">Reportado por</span>
          <input
            className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400 ${
              errors.reportadoPor ? "border-red-300" : "border-slate-200"
            }`}
            value={reportadoPor}
            onChange={(e) => setReportadoPor(e.target.value)}
            placeholder="Nombre o área"
          />
          {errors.reportadoPor ? (
            <span className="text-xs text-red-600 mt-0.5 block">{errors.reportadoPor}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-slate-500 uppercase">Sanción (horas de servicio)</span>
          <input
            type="number"
            min="0"
            step="0.25"
            className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400 ${
              errors.sancionHoras ? "border-red-300" : "border-slate-200"
            }`}
            value={sancionHoras}
            onChange={(e) => setSancionHoras(e.target.value)}
          />
          {errors.sancionHoras ? (
            <span className="text-xs text-red-600 mt-0.5 block">{errors.sancionHoras}</span>
          ) : null}
          <p className="text-[11px] text-slate-500 mt-1">
            Se rellena según el tipo; puedes ajustarla si la sanción fue distinta.
          </p>
        </label>
      </form>
    </Modal>
  );
}
