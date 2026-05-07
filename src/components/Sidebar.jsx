const navItems = [
  "SEGUIMIENTO DE FALTAS",
  "HISTORIAL DE FALTAS",
  "CLASE DE FALTAS",
  "REGLAMENTO",
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="rounded-2xl bg-white p-3 shadow-soft dark:bg-slate-900">
      <p className="mb-3 px-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Panel del profesor</p>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-[250ms] hover:scale-[1.03] ${
              active === item
                ? "bg-green-200 text-green-800 dark:bg-emerald-900/60 dark:text-emerald-200"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
