import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastStack({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg animate-fade-in ${
            t.variant === "error"
              ? "bg-white border-red-200 text-red-800"
              : t.variant === "info"
                ? "bg-sky-50 border-sky-200 text-sky-950"
                : "bg-emerald-50 border-emerald-200 text-emerald-900"
          }`}
          role="status"
        >
          {t.variant === "error" ? (
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          ) : t.variant === "info" ? (
            <Info className="h-5 w-5 shrink-0 mt-0.5 text-sky-600" />
          ) : (
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" />
          )}
          <p className="text-sm font-medium leading-snug flex-1">{t.message}</p>
          <button
            type="button"
            className="rounded-md p-1 hover:bg-black/5"
            onClick={() => onDismiss(t.id)}
            aria-label="Cerrar aviso"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
