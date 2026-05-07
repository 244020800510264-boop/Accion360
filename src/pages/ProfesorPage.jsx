import { useState } from "react";
import { toast } from "sonner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import ServiceTrackerView from "../components/ServiceTrackerView";
import Sidebar from "../components/Sidebar";
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
    <div className="min-h-screen bg-soft-bg p-4 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <Header
          onRefresh={handleSave}
          onSettings={() => setModal("settings")}
          onNotifications={() => setModal("notifications")}
          onProfile={() => setModal("profile")}
          isSaving={isSaving}
        />
        <div className="card-enter grid gap-4 lg:grid-cols-[240px_1fr]">
          <Sidebar active={section} onChange={setSection} />
          <ServiceTrackerView mode="profesor" section={section} {...service} />
        </div>
      </div>

      <Modal open={modal === "settings"} title="Ajustes" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600 dark:text-slate-300">Tutor asignado: Mtra. Claudia Herrera.</p>
      </Modal>
      <Modal open={modal === "notifications"} title="Notificaciones" onClose={() => setModal("")}>
        <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Nueva actividad pendiente de revision.</li>
          <li>Actualizacion de reglamento disponible.</li>
        </ul>
      </Modal>
      <Modal open={modal === "profile"} title="Perfil" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600 dark:text-slate-300">Rol: Profesor/Tutor</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">Matricula: {user?.matricula}</p>
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
