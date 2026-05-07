import { useState } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ServiceTrackerView from "../components/ServiceTrackerView";
import { useAuth } from "../context/AuthContext";
import { useServiceData } from "../hooks/useServiceData";

export default function AlumnoPage() {
  const { user, logout } = useAuth();
  const [modal, setModal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const service = useServiceData();
  const horasLiberadas = service.horasRealizadas;

  const handleSave = () => {
    setIsSaving(true);
    service.saveData();
    toast.success("Datos guardados correctamente");
    setTimeout(() => setIsSaving(false), 700);
  };

  return (
    <div className="min-h-screen bg-soft-bg p-4 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <Header
          onRefresh={handleSave}
          onSettings={() => setModal("settings")}
          onNotifications={() => setModal("notifications")}
          onProfile={() => setModal("profile")}
          isSaving={isSaving}
        />
        <div className="mb-3">
          <button className="btn-primary w-full sm:w-auto" onClick={() => setModal("guide")}>
            Guia para Liberar Horas
          </button>
        </div>
        <div className="card-enter rounded-2xl border border-soft-border bg-white/60 p-2 dark:border-slate-800 dark:bg-slate-900/60">
          <ServiceTrackerView mode="alumno" section="SEGUIMIENTO DE FALTAS" {...service} />
        </div>
      </div>

      <Modal open={modal === "settings"} title="Ajustes" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600 dark:text-slate-300">Tutor: Mtra. Claudia Herrera.</p>
      </Modal>
      <Modal open={modal === "notifications"} title="Notificaciones" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600 dark:text-slate-300">No hay notificaciones nuevas.</p>
      </Modal>
      <Modal open={modal === "profile"} title="Perfil" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600 dark:text-slate-300">Rol: Alumno</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">Matricula: {user?.matricula}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
            <p className="text-xs uppercase text-emerald-700 dark:text-emerald-300">Total acumulado</p>
            <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100">{service.horasRealizadas} h</p>
          </article>
          <article className="rounded-xl border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950/40">
            <p className="text-xs uppercase text-orange-700 dark:text-orange-300">Horas pendientes</p>
            <p className="text-xl font-bold text-orange-900 dark:text-orange-100">{service.horasPendientes} h</p>
          </article>
          <article className="rounded-xl border border-sky-200 bg-sky-50 p-3 dark:border-sky-800 dark:bg-sky-950/40">
            <p className="text-xs uppercase text-sky-700 dark:text-sky-300">Horas liberadas</p>
            <p className="text-xl font-bold text-sky-900 dark:text-sky-100">{horasLiberadas} h</p>
          </article>
        </div>
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
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-200">
          <section>
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Tipos de faltas</h4>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
              <li>Leve: retrasos o incumplimientos menores.</li>
              <li>Moderada: faltas de respeto o reincidencias.</li>
              <li>Grave: agresiones, danos materiales o conducta de riesgo.</li>
            </ul>
          </section>
          <section>
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Como liberar horas</h4>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
              <li>Leve: actividades breves de apoyo escolar y orden.</li>
              <li>Moderada: apoyo academico, tutorias y proyectos comunitarios.</li>
              <li>Grave: planes supervisados con mayor carga y seguimiento docente.</li>
            </ul>
          </section>
          <section>
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Ambitos donde aplicar horas</h4>
            <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-300">
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
