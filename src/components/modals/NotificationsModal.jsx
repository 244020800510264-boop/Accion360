import { Bell } from "lucide-react";
import { Modal } from "../Modal.jsx";
import { useApp } from "../../context/AppContext.jsx";

export function NotificationsModal() {
  const { data, markNotificationRead, goMain } = useApp();

  return (
    <Modal
      title="Notificaciones"
      onClose={goMain}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={goMain}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            REGRESAR
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {data.notifications.length === 0 ? (
          <p className="text-sm text-slate-600 py-6 text-center">
            No hay notificaciones por mostrar.
          </p>
        ) : (
          <ul className="space-y-2">
            {data.notifications.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => markNotificationRead(n.id)}
                  className={`w-full text-left rounded-xl border px-3 py-3 transition hover:shadow-md ${
                    n.leida
                      ? "bg-slate-50 border-slate-200"
                      : "bg-emerald-50/60 border-emerald-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Bell className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{n.titulo}</p>
                      <p className="text-xs text-slate-600 mt-1">{n.cuerpo}</p>
                      <p className="text-[11px] text-slate-400 mt-2">{n.fecha}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
