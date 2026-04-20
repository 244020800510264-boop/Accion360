import { Bell, RefreshCw, Settings, UserRound } from "lucide-react";

export default function Header({ onRefresh, onSettings, onNotifications, onProfile }) {
  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-soft">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-green-700">
          Pequenas acciones grandes cambios
        </p>
        <h1 className="text-lg font-semibold text-slate-700">ACCION 360 - Seguimiento de servicio</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-icon" onClick={onRefresh} aria-label="Guardar datos">
          <RefreshCw size={18} />
        </button>
        <button className="btn-icon" onClick={onSettings} aria-label="Ajustes">
          <Settings size={18} />
        </button>
        <button className="btn-icon relative" onClick={onNotifications} aria-label="Notificaciones">
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button className="btn-icon" onClick={onProfile} aria-label="Perfil">
          <UserRound size={18} />
        </button>
      </div>
    </header>
  );
}
