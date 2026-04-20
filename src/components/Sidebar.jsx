const navItems = [
  "SEGUIMIENTO DE FALTAS",
  "HISTORIAL DE FALTAS",
  "CLASE DE FALTAS",
  "REGLAMENTO",
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="rounded-2xl bg-white p-3 shadow-soft">
      <p className="mb-3 px-2 text-xs font-semibold uppercase text-slate-500">Panel del profesor</p>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
              active === item ? "bg-green-200 text-green-800" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
