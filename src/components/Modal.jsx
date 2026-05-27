export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
      <div className="modal-panel w-full max-w-md rounded-2xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md bg-slate-100 px-2 py-1 text-sm text-slate-700 transition-all duration-[250ms] hover:scale-105 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
