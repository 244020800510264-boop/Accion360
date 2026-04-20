import { Scale } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export function ClaseFaltas() {
  const { data, updateFaultType, horasAsignadas } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Scale className="h-6 w-6 text-emerald-600 shrink-0" />
        <div>
          <h2 className="text-base font-bold text-slate-900">Clase de faltas</h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            <strong className="text-slate-800">Edita las horas asignadas por tipo de falta</strong> (FALTA
            LEVE, MODERADA, GRAVE y MUY GRAVE). Los valores se guardan automáticamente en este dispositivo y
            se reflejan al instante en el seguimiento: la falta activa usa la plantilla del tipo
            seleccionado, actualmente{" "}
            <span className="font-semibold text-emerald-700 tabular-nums">{horasAsignadas} h</span>{" "}
            asignadas según el tipo vinculado.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-bold text-slate-500 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Tipo de falta</th>
              <th className="px-4 py-3 w-40">Horas asignadas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.faultTypes.map((f) => (
              <tr key={f.id} className="hover:bg-emerald-50/40 transition">
                <td className="px-4 py-3 font-semibold text-slate-800">{f.nombre}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                    value={f.horas}
                    onChange={(e) => updateFaultType(f.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
