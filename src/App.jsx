import { AppProvider, useApp } from "./context/AppContext.jsx";
import { useToast } from "./hooks/useToast.js";
import { Header } from "./components/Header.jsx";
import { HoursSummaryBar } from "./components/HoursSummaryBar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { ToastStack } from "./components/ToastStack.jsx";
import { SettingsModal } from "./components/modals/SettingsModal.jsx";
import { NotificationsModal } from "./components/modals/NotificationsModal.jsx";
import { ProfileModal } from "./components/modals/ProfileModal.jsx";
import { SeguimientoFaltas } from "./pages/SeguimientoFaltas.jsx";
import { HistorialFaltas } from "./pages/HistorialFaltas.jsx";
import { ClaseFaltas } from "./pages/ClaseFaltas.jsx";
import { Reglamento } from "./pages/Reglamento.jsx";

function Shell() {
  const { view, modal, mobileSidebarOpen, setMobileSidebarOpen } = useApp();

  const titleMap = {
    seguimiento: "Seguimiento de faltas",
    historial: "Historial de faltas",
    clase: "Clase de faltas",
    reglamento: "Reglamento",
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <HoursSummaryBar />

      {mobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 sm:hidden flex">
          <button
            type="button"
            className="flex-1 bg-slate-900/40"
            aria-label="Cerrar menú"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <Sidebar variant="mobile" />
        </div>
      ) : null}

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <Sidebar variant="desktop" />
        <main className="flex-1 px-3 py-5 sm:px-6 sm:py-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Vista actual
              </p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {titleMap[view] || "Seguimiento"}
              </h1>
            </div>
          </div>

          <div key={view} className="animate-fade-in motion-reduce:animate-none">
            {view === "seguimiento" ? <SeguimientoFaltas /> : null}
            {view === "historial" ? <HistorialFaltas /> : null}
            {view === "clase" ? <ClaseFaltas /> : null}
            {view === "reglamento" ? <Reglamento /> : null}
          </div>
        </main>
      </div>

      {modal === "settings" ? <SettingsModal /> : null}
      {modal === "notifications" ? <NotificationsModal /> : null}
      {modal === "profile" ? <ProfileBridge /> : null}
    </div>
  );
}

function ProfileBridge() {
  const { pushToast } = useApp();
  return <ProfileModal onToast={pushToast} />;
}

export default function App() {
  const { toasts, pushToast, removeToast } = useToast();

  return (
    <AppProvider onToast={pushToast}>
      <Shell />
      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </AppProvider>
  );
}
