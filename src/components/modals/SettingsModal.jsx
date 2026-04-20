import { Modal } from "../Modal.jsx";
import { useApp } from "../../context/AppContext.jsx";

export function SettingsModal() {
  const { data, updateSettings, goMain } = useApp();
  const s = data.settings;

  return (
    <Modal
      title="Ajustes de cuenta"
      onClose={goMain}
      footer={
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            onClick={goMain}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            REGRESAR
          </button>
        </div>
      }
    >
      <div className="space-y-4 text-sm">
        <p className="text-slate-600">
          Información institucional y de contacto del tutor o responsable asociado a la cuenta.
        </p>
        <div className="grid gap-3">
          <label className="block">
            <span className="text-xs font-semibold text-slate-500 uppercase">Institución</span>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              value={s.institucion}
              onChange={(e) => updateSettings({ institucion: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-500 uppercase">Ciclo escolar</span>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              value={s.cicloEscolar}
              onChange={(e) => updateSettings({ cicloEscolar: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-500 uppercase">Coordinación / tutoría</span>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
              value={s.coordinador}
              onChange={(e) => updateSettings({ coordinador: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-500 uppercase">Notas de la cuenta</span>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none resize-y"
              value={s.notasCuenta}
              onChange={(e) => updateSettings({ notasCuenta: e.target.value })}
            />
          </label>
        </div>
      </div>
    </Modal>
  );
}
