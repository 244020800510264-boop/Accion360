import { useState } from "react";
import { toast } from "sonner";
import Modal from "../components/Modal";
import ServiceTrackerView from "../components/ServiceTrackerView";
import ProgressRing from "../components/ProgressRing";
import BentoCard from "../components/BentoCard";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import { useServiceData } from "../hooks/useServiceData";

export default function AlumnoPage() {
  const { user, logout } = useAuth();
  const [modal, setModal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const service = useServiceData();
  const horasLiberadas = service.horasRealizadas;
  const metaFinal = 150;
  const progressPercentage = (service.horasRealizadas / metaFinal) * 100;

  const handleSave = () => {
    setIsSaving(true);
    service.saveData();
    toast.success("Datos guardados correctamente");
    setTimeout(() => setIsSaving(false), 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest shadow-sm h-16 flex items-center px-margin-mobile md:px-margin-desktop justify-between">
        <div className="flex items-center gap-4">
          <span className="font-headline-md text-headline-md font-bold text-primary">ACCION 360</span>
          <div className="hidden md:block h-6 w-px bg-outline-variant"></div>
          <span className="hidden md:block font-label-md text-label-md text-on-surface-variant italic">
            Pequeñas acciones, grandes cambios
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full"
            onClick={() => setModal("notifications")}
          >
            <Icon name="notifications" />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center text-on-primary">
            <span className="font-label-sm">JS</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="hidden md:flex w-64 bg-surface-container-lowest flex-col py-6 px-4 gap-2 border-r border-outline-variant">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold bg-primary-container/10 transition-colors" href="#">
            <Icon name="dashboard" />
            <span className="font-label-md text-label-md">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
            <Icon name="assignment" />
            <span className="font-label-md text-label-md">Mis Actividades</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
            <Icon name="calendar_today" />
            <span className="font-label-md text-label-md">Calendario de Servicio</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
            <Icon name="description" />
            <span className="font-label-md text-label-md">Documentos</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" href="#">
            <Icon name="gavel" />
            <span className="font-label-md text-label-md">Reglamento</span>
          </a>
        </nav>

        {/* Main Content Canvas */}
        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
          <div className="max-w-container-max mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Hola, Juan Sebastián</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Continúa transformando tu entorno hoy.</p>
              </div>
              <button
                className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm active:scale-95"
                onClick={() => setModal("guide")}
              >
                <Icon name="add" />
                Guía para Liberar Horas
              </button>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* Progress Card */}
              <BentoCard className="md:col-span-4 flex flex-col items-center justify-center text-center gap-6">
                <ProgressRing progress={progressPercentage} size={192} strokeWidth={8}>
                  <span className="font-display-lg text-display-lg text-primary">{service.horasRealizadas}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Horas Realizadas
                  </span>
                </ProgressRing>
                <div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Meta final: <span className="font-bold text-on-surface">{metaFinal} horas</span>
                  </p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                    {progressPercentage.toFixed(1)}% completado
                  </div>
                </div>
              </BentoCard>

              {/* Service Tracker */}
              <BentoCard className="md:col-span-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <Icon name="assignment" className="text-primary" />
                    Seguimiento de Faltas
                  </h2>
                </div>
                <ServiceTrackerView mode="alumno" section="SEGUIMIENTO DE FALTAS" {...service} />
              </BentoCard>

              {/* Stats Cards */}
              <BentoCard className="md:col-span-4">
                <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest mb-4">Resumen</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-surface rounded-lg">
                    <p className="text-headline-md text-primary font-bold">{service.horasRealizadas} h</p>
                    <p className="text-label-sm text-on-surface-variant">Total acumulado</p>
                  </div>
                  <div className="text-center p-4 bg-surface rounded-lg">
                    <p className="text-headline-md text-error font-bold">{service.horasPendientes} h</p>
                    <p className="text-label-sm text-on-surface-variant">Horas pendientes</p>
                  </div>
                  <div className="text-center p-4 bg-surface rounded-lg">
                    <p className="text-headline-md text-secondary font-bold">{horasLiberadas} h</p>
                    <p className="text-label-sm text-on-surface-variant">Horas liberadas</p>
                  </div>
                </div>
              </BentoCard>

              {/* Call to Action Banner */}
              <div className="md:col-span-8 relative overflow-hidden rounded-2xl bg-on-primary-fixed-variant p-8 text-on-primary">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-primary-fixed opacity-10" style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}></div>
                <div className="relative z-10 max-w-2xl">
                  <h2 className="font-headline-md text-headline-md mb-2">¿Necesitas ayuda con tu servicio?</h2>
                  <p className="font-body-md text-body-md text-primary-fixed mb-6 opacity-90">
                    Consulta nuestro centro de ayuda o descarga el manual de procedimientos para asegurar que tus actividades sean válidas.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity"
                      onClick={() => setModal("guide")}
                    >
                      Guía de Usuario
                    </button>
                    <button
                      className="border border-primary-fixed text-primary-fixed px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-fixed/10 transition-colors"
                      onClick={() => setModal("profile")}
                    >
                      Contactar Soporte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-8">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-label-md text-label-md font-semibold text-primary">ACCION 360</span>
          <div className="flex gap-6">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
              Help Center
            </a>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 ACCION 360. All rights reserved.</p>
        </div>
      </footer>

      {/* Bottom Nav for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest shadow-[0_-1px_10px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 px-4 z-50">
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <Icon name="dashboard" />
          <span className="text-[10px] font-bold">Inicio</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <Icon name="assignment" />
          <span className="text-[10px]">Actividades</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <Icon name="calendar_today" />
          <span className="text-[10px]">Agenda</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <Icon name="person" />
          <span className="text-[10px]">Perfil</span>
        </a>
      </div>

      <Modal open={modal === "notifications"} title="Notificaciones" onClose={() => setModal("")}>
        <p className="text-sm text-on-surface-variant">No hay notificaciones nuevas.</p>
      </Modal>
      <Modal open={modal === "profile"} title="Perfil" onClose={() => setModal("")}>
        <p className="text-sm text-on-surface-variant">Rol: Alumno</p>
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
      <Modal open={modal === "guide"} title="Guia para Liberar Horas" onClose={() => setModal("")}>
        <div className="space-y-4 text-sm text-on-surface">
          <section>
            <h4 className="font-semibold text-primary">Tipos de faltas</h4>
            <ul className="mt-2 space-y-1 text-on-surface-variant">
              <li>Leve: retrasos o incumplimientos menores.</li>
              <li>Moderada: faltas de respeto o reincidencias.</li>
              <li>Grave: agresiones, danos materiales o conducta de riesgo.</li>
            </ul>
          </section>
          <section>
            <h4 className="font-semibold text-primary">Como liberar horas</h4>
            <ul className="mt-2 space-y-1 text-on-surface-variant">
              <li>Leve: actividades breves de apoyo escolar y orden.</li>
              <li>Moderada: apoyo academico, tutorias y proyectos comunitarios.</li>
              <li>Grave: planes supervisados con mayor carga y seguimiento docente.</li>
            </ul>
          </section>
          <section>
            <h4 className="font-semibold text-primary">Ambitos donde aplicar horas</h4>
            <ul className="mt-2 space-y-1 text-on-surface-variant">
              <li>Escuela: biblioteca, laboratorio, brigadas internas.</li>
              <li>Comunidad: limpieza, apoyo social, campanas solidarias.</li>
              <li>Ambiental: reforestacion, reciclaje, cuidado de areas verdes.</li>
            </ul>
          </section>
        </div>
      </Modal>
    </div>
  );
}
