import { useState } from "react";
import { toast } from "sonner";
import Modal from "../components/Modal";
import ServiceTrackerView from "../components/ServiceTrackerView";
import ProgressRing from "../components/ProgressRing";
import BentoCard from "../components/BentoCard";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import { useServiceData } from "../hooks/useServiceData";

export default function ProfesorPage() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState("SEGUIMIENTO DE FALTAS");
  const [modal, setModal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const service = useServiceData();

  const handleSave = () => {
    setIsSaving(true);
    service.saveData();
    toast.success("Datos guardados correctamente");
    setTimeout(() => setIsSaving(false), 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-surface-container-lowest shadow-sm z-50">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-8">
            <span className="font-headline-md text-headline-md font-bold text-primary">ACCION 360</span>
            <span className="hidden lg:block italic text-on-surface-variant font-label-md">
              "Pequeñas acciones, grandes cambios"
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full cursor-pointer hover:bg-surface-container-highest transition-colors"
              onClick={() => setModal("notifications")}
            >
              <Icon name="notifications" className="text-primary" />
              <span className="w-2 h-2 bg-error rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 border-l border-outline-variant pl-6">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-on-surface leading-none">Prof. Elena M.</p>
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider">Docente Titular</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">
                EM
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Shell Layout */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-surface-container-low fixed h-[calc(100vh-64px)] hidden md:flex flex-col border-r border-outline-variant">
          <div className="p-6 flex flex-col gap-2">
            <a
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-bold transition-colors ${
                section === "SEGUIMIENTO DE FALTAS"
                  ? "text-primary bg-primary-container"
                  : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
              }`}
              href="#"
              onClick={() => setSection("SEGUIMIENTO DE FALTAS")}
            >
              <Icon name="dashboard" filled={section === "SEGUIMIENTO DE FALTAS"} />
              <span className="font-label-md">Resumen</span>
            </a>
            <a
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
              href="#"
            >
              <Icon name="group" />
              <span className="font-label-md">Lista de Alumnos</span>
            </a>
            <a
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
              href="#"
            >
              <Icon name="event_busy" />
              <span className="font-label-md">Reportes de Faltas</span>
            </a>
            <a
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
              href="#"
            >
              <Icon name="mail" />
              <span className="font-label-md">Mensajería</span>
            </a>
            <div className="mt-auto pt-8">
              <a
                className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                href="#"
                onClick={() => setModal("settings")}
              >
                <Icon name="settings" />
                <span className="font-label-md">Ajustes</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full">
          {/* Bento Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Tool Bar: Search & Export */}
            <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-soft-focus border border-outline-variant/30">
              <div className="flex flex-1 gap-3 w-full max-w-2xl">
                <div className="relative flex-1">
                  <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-lg border-outline focus:ring-primary focus:border-primary bg-surface font-body-md"
                    placeholder="Buscar alumnos por nombre o ID..."
                    type="text"
                  />
                </div>
                <select className="rounded-lg border-outline focus:ring-primary focus:border-primary bg-surface font-label-md">
                  <option>Todas las Carreras</option>
                  <option>Ing. de Sistemas</option>
                  <option>Diseño Digital</option>
                </select>
                <select className="rounded-lg border-outline focus:ring-primary focus:border-primary bg-surface font-label-md">
                  <option>Grupo 101</option>
                  <option>Grupo 202</option>
                </select>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md hover:bg-secondary transition-all active:scale-95"
                  onClick={handleSave}
                >
                  <Icon name="download" />
                  Exportar Reporte
                </button>
              </div>
            </div>

            {/* Central Panel: Service Tracker */}
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              <BentoCard className="relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-3">
                    <Icon name="assignment" className="text-primary" />
                    {section}
                  </h2>
                </div>
                <ServiceTrackerView mode="profesor" section={section} {...service} />
              </BentoCard>

              {/* Quick Action: Notification Center */}
              <BentoCard className="bg-surface-container">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="campaign" className="text-primary" />
                  <h3 className="font-headline-md text-headline-md text-on-surface">Comunicación Masiva</h3>
                </div>
                <p className="text-on-surface-variant font-body-md mb-6">
                  Envía avisos a grupos completos o filtra por estado de avance.
                </p>
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 p-4 rounded-xl border-outline bg-surface focus:ring-primary focus:border-primary font-body-md resize-none"
                    placeholder="Escribe el mensaje para el grupo..."
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-label-sm cursor-pointer hover:opacity-80 transition-opacity">
                        Sistemas - G101
                      </span>
                      <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-label-sm cursor-pointer hover:opacity-80 transition-opacity">
                        Alumnos {"<"} 50%
                      </span>
                    </div>
                    <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label-md font-bold hover:bg-primary hover:text-white transition-all shadow-sm">
                      Enviar Aviso
                    </button>
                  </div>
                </div>
              </BentoCard>
            </div>

            {/* Side Panel: Stats & Quick Links */}
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Global Progress Card */}
              <BentoCard>
                <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-6">
                  Resumen del Semestre
                </h3>
                <div className="flex flex-col items-center">
                  <ProgressRing progress={75} size={160} strokeWidth={12}>
                    <span className="text-display-lg font-display-lg text-primary">75%</span>
                    <span className="text-label-sm text-on-surface-variant">Promedio Gral.</span>
                  </ProgressRing>
                  <div className="grid grid-cols-2 gap-4 w-full mt-8">
                    <div className="text-center p-3 bg-surface rounded-lg">
                      <p className="text-headline-md text-secondary font-bold">128</p>
                      <p className="text-label-sm text-on-surface-variant">Total Alumnos</p>
                    </div>
                    <div className="text-center p-3 bg-surface rounded-lg">
                      <p className="text-headline-md text-error font-bold">42</p>
                      <p className="text-label-sm text-on-surface-variant">Faltas Report.</p>
                    </div>
                  </div>
                </div>
              </BentoCard>

              {/* Recent Activity / News */}
              <BentoCard className="flex-1">
                <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-4">
                  Avisos Recientes
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-1">
                    <p className="font-label-md text-on-surface">Cierre de Actas - Periodo B</p>
                    <p className="text-label-sm text-on-surface-variant">Faltan 3 días para el cierre.</p>
                  </div>
                  <div className="border-l-4 border-secondary-fixed-dim pl-4 py-1">
                    <p className="font-label-md text-on-surface">Capacitación "Acción 360"</p>
                    <p className="text-label-sm text-on-surface-variant">Disponible en la plataforma virtual.</p>
                  </div>
                  <div className="border-l-4 border-outline pl-4 py-1">
                    <p className="font-label-md text-on-surface">Revisión de Horas Sociales</p>
                    <p className="text-label-sm text-on-surface-variant">Actualización de criterios 2024.</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 text-primary font-label-md hover:underline decoration-2 underline-offset-4">
                  Ver todo el centro de ayuda
                </button>
              </BentoCard>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 w-full py-8 border-t border-outline-variant">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-4">
              <span className="font-label-md font-semibold text-primary">ACCION 360</span>
              <div className="flex gap-6">
                <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm" href="#">
                  Terms of Service
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm" href="#">
                  Privacy Policy
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-opacity font-label-sm" href="#">
                  Help Center
                </a>
              </div>
              <p className="text-on-surface-variant font-label-sm">© 2024 ACCION 360. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>

      <Modal open={modal === "settings"} title="Ajustes" onClose={() => setModal("")}>
        <p className="text-sm text-on-surface-variant">Tutor asignado: Mtra. Claudia Herrera.</p>
      </Modal>
      <Modal open={modal === "notifications"} title="Notificaciones" onClose={() => setModal("")}>
        <ul className="list-disc pl-5 text-sm text-on-surface-variant">
          <li>Nueva actividad pendiente de revision.</li>
          <li>Actualizacion de reglamento disponible.</li>
        </ul>
      </Modal>
      <Modal open={modal === "profile"} title="Perfil" onClose={() => setModal("")}>
        <p className="text-sm text-on-surface-variant">Rol: Profesor/Tutor</p>
        <p className="text-sm text-on-surface-variant">Matricula: {user?.matricula}</p>
        <button
          className="btn-primary mt-3 w-full"
          onClick={() => {
            logout();
            toast.success("Sesion cerrada");
          }}
        >
          Cerrar sesion
        </button>
      </Modal>
    </div>
  );
}
