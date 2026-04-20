import { useApp } from "../context/AppContext.jsx";

function fmt(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return "0";
  return (Math.round(x * 100) / 100).toString();
}

export function HoursSummaryBar() {
  const { horasAsignadas, horasRealizadas, horasPendientes } = useApp();

  return (
    <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/95 to-teal-50/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-1.5 px-3 py-2.5 text-xs sm:px-5 sm:text-sm text-emerald-950">
        <span className="font-semibold uppercase tracking-wide text-emerald-800/90">
          Resumen de horas
        </span>
        <span className="tabular-nums">
          <span className="text-emerald-700/80 font-medium">Asignadas: </span>
          <strong>{fmt(horasAsignadas)} h</strong>
        </span>
        <span className="tabular-nums">
          <span className="text-emerald-700/80 font-medium">Realizadas: </span>
          <strong>{fmt(horasRealizadas)} h</strong>
        </span>
        <span className="tabular-nums">
          <span className="text-emerald-700/80 font-medium">Pendientes: </span>
          <strong className="text-orange-700">{fmt(horasPendientes)} h</strong>
        </span>
      </div>
    </div>
  );
}
