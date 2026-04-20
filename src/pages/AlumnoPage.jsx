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
  const service = useServiceData();

  const handleSave = () => {
    service.saveData();
    toast.success("Datos guardados correctamente");
  };

  return (
    <div className="min-h-screen bg-soft-bg p-4">
      <div className="mx-auto max-w-6xl">
        <Header
          onRefresh={handleSave}
          onSettings={() => setModal("settings")}
          onNotifications={() => setModal("notifications")}
          onProfile={() => setModal("profile")}
        />
        <div className="rounded-2xl border border-soft-border bg-white/60 p-2">
          <ServiceTrackerView mode="alumno" section="SEGUIMIENTO DE FALTAS" {...service} />
        </div>
      </div>

      <Modal open={modal === "settings"} title="Ajustes" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600">Tutor: Mtra. Claudia Herrera.</p>
      </Modal>
      <Modal open={modal === "notifications"} title="Notificaciones" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600">No hay notificaciones nuevas.</p>
      </Modal>
      <Modal open={modal === "profile"} title="Perfil" onClose={() => setModal("")}>
        <p className="text-sm text-slate-600">Rol: Alumno</p>
        <p className="text-sm text-slate-600">Matricula: {user?.matricula}</p>
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
