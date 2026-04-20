import { X } from "lucide-react";

export function Modal({ title, children, onClose, footer }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] animate-fade-in"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl border border-slate-100 animate-scale-in max-h-[90vh] flex flex-col">
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-2 border-b border-slate-100">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-800 pr-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition shrink-0"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
        {footer ? (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/80 rounded-b-2xl">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
