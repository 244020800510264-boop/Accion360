import { Activity, BookOpen, ClipboardList, FileText } from "lucide-react";

const navItems = [
  "SEGUIMIENTO DE FALTAS",
  "HISTORIAL DE FALTAS",
  "CLASE DE FALTAS",
  "REGLAMENTO",
];

const navIcons = {
  "SEGUIMIENTO DE FALTAS": Activity,
  "HISTORIAL DE FALTAS": ClipboardList,
  "CLASE DE FALTAS": BookOpen,
  REGLAMENTO: FileText,
};

export default function Sidebar({ active, onChange, onClose }) {
  return (
    <aside className="rounded-2xl bg-white p-3 shadow-soft dark:bg-slate-900">
      <p className="mb-3 px-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
        Panel del profesor
      </p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = navIcons[item];
          return (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                onClose?.();
              }}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                active === item
                  ? "bg-green-200 text-green-800 dark:bg-emerald-900/60 dark:text-emerald-200"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon size={16} className="shrink-0" />
                {item}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
