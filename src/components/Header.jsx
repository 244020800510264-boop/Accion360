import { Bell, Moon, RefreshCw, Settings, Sun, UserRound } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Header({ onRefresh, onSettings, onNotifications, onProfile, isSaving = false, notificationCount = 0 }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-green-700 dark:text-emerald-300">
          Pequenas acciones grandes cambios
        </p>
        <h1 className="text-base font-semibold text-slate-700 sm:text-lg dark:text-slate-100">ACCION 360 - Seguimiento de servicio</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-icon" onClick={toggleTheme} aria-label="Cambiar tema">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="btn-icon" onClick={onRefresh} aria-label="Guardar datos">
          <RefreshCw size={18} className={isSaving ? "animate-spin" : ""} />
        </button>
        <button className="btn-icon" onClick={onSettings} aria-label="Ajustes">
          <Settings size={18} />
        </button>
        <button className="btn-icon relative" onClick={onNotifications} aria-label="Notificaciones">
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        <button className="btn-icon" onClick={onProfile} aria-label="Perfil">
          <UserRound size={18} />
        </button>
      </div>
    </header>
  );
}
