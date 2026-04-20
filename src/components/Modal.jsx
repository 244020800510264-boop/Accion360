export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
          <button onClick={onClose} className="rounded-md bg-slate-100 px-2 py-1 text-sm">
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
