import { BookMarked } from "lucide-react";
import { reglamentoSecciones } from "../data/reglamento.js";

export function Reglamento() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <BookMarked className="h-6 w-6 text-blue-600 shrink-0" />
        <div>
          <h2 className="text-base font-bold text-slate-900">Reglamento de convivencia</h2>
          <p className="text-sm text-slate-600 mt-1">
            Listado de normas de conducta para la comunidad escolar. El contenido puede ajustarse para
            coincidir con la versión oficial del plantel.
          </p>
        </div>
      </div>

      <div className="space-y-4 animate-fade-in">
        {reglamentoSecciones.map((sec) => (
          <section
            key={sec.titulo}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:shadow-card-hover transition"
          >
            <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wide border-b border-emerald-100 pb-2">
              {sec.titulo}
            </h3>
            <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-slate-700 leading-relaxed">
              {sec.normas.map((n, idx) => (
                <li key={idx} className="pl-1">
                  {n}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
