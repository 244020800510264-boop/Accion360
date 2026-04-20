import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Scale,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

const items = [
  { id: "historial", label: "HISTORIAL DE FALTAS", icon: ClipboardList },
  { id: "clase", label: "CLASE DE FALTAS", icon: Scale },
  { id: "reglamento", label: "REGLAMENTO", icon: BookOpen },
  { id: "seguimiento", label: "SEGUIMIENTO DE FALTAS", icon: LayoutDashboard },
];

export function Sidebar({ variant = "desktop" }) {
  const { view, setView } = useApp();

  const nav = (
    <nav className="flex flex-col gap-1 p-3" aria-label="Principal">
      {items.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold tracking-wide transition-all duration-200 border ${
              active
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-white"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60"
            }`}
          >
            <Icon className={`h-5 w-5 shrink-0 ${active ? "text-white" : "text-emerald-600"}`} />
            <span className="leading-snug">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  if (variant === "mobile") {
    return (
      <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200 w-72 max-w-[85vw] shadow-xl">
        <div className="px-4 py-3 border-b border-slate-200 bg-white">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Menú
          </p>
        </div>
        {nav}
      </div>
    );
  }

  return (
    <aside className="hidden sm:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white min-h-[calc(100vh-7rem)] sticky top-28 self-start">
      {nav}
    </aside>
  );
}
