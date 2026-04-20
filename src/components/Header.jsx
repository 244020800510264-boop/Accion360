import {
  Bell,
  Menu,
  RefreshCw,
  Settings,
  UserRound,
} from "lucide-react";
import { LogoMark } from "./LogoMark.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useState } from "react";

export function Header() {
  const {
    setModal,
    flushSave,
    setMobileSidebarOpen,
    mobileSidebarOpen,
    data,
  } = useApp();
  const unreadCount = data.notifications.filter((n) => !n.leida).length;
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    flushSave();
    window.setTimeout(() => setSpinning(false), 700);
  };

  const iconBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md transition";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:px-5">
        <button
          type="button"
          className={`sm:hidden ${iconBtn}`}
          aria-label="Abrir menú"
          aria-expanded={mobileSidebarOpen}
          onClick={() => setMobileSidebarOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <LogoMark className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="rounded-xl bg-emerald-100/90 px-3 py-2 sm:px-4 border border-emerald-200/80 shadow-sm">
              <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-emerald-900 text-center sm:text-left leading-tight">
                PEQUEÑAS ACCIONES GRANDES CAMBIOS
              </p>
            </div>
            <p className="mt-1 hidden sm:block text-xs text-slate-500 font-medium">
              ACCION 360 · Seguimiento de servicio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            className={iconBtn}
            title="Actualizar y guardar"
            aria-label="Actualizar y guardar"
            onClick={handleRefresh}
          >
            <RefreshCw
              className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`}
            />
          </button>
          <button
            type="button"
            className={iconBtn}
            title="Ajustes"
            aria-label="Ajustes"
            onClick={() => setModal("settings")}
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${iconBtn} relative`}
            title="Notificaciones"
            aria-label="Notificaciones"
            onClick={() => setModal("notifications")}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-1 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className={iconBtn}
            title="Perfil"
            aria-label="Perfil"
            onClick={() => setModal("profile")}
          >
            <UserRound className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
