import { Modal } from "../Modal.jsx";
import { useApp } from "../../context/AppContext.jsx";
import { useEffect, useState } from "react";

export function ProfileModal({ onToast }) {
  const { data, updateProfile, goMain } = useApp();
  const p = data.profile;
  const [recoveryEmail, setRecoveryEmail] = useState(p.correoRecuperacion || "");

  useEffect(() => {
    setRecoveryEmail(p.correoRecuperacion || "");
  }, [p.correoRecuperacion]);

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (!recoveryEmail.trim()) {
      onToast?.("Ingresa un correo electrónico válido.", "error");
      return;
    }
    updateProfile({ correoRecuperacion: recoveryEmail.trim() });
    onToast?.("Solicitud registrada. Revisa tu correo (simulación).", "success");
  };

  return (
    <Modal
      title="Perfil del alumno"
      onClose={goMain}
      footer={
        <div className="flex flex-wrap gap-2 justify-end">
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
      <form className="space-y-3 text-sm" onSubmit={(e) => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field
            label="Nombre del alumno"
            value={p.nombreAlumno}
            onChange={(v) => updateProfile({ nombreAlumno: v })}
          />
          <Field
            label="Matrícula"
            value={p.matricula}
            onChange={(v) => updateProfile({ matricula: v })}
          />
          <Field
            label="Grado / grupo"
            value={p.gradoGrupo}
            onChange={(v) => updateProfile({ gradoGrupo: v })}
          />
          <Field
            label="Edad"
            value={p.edad}
            onChange={(v) => updateProfile({ edad: v })}
          />
          <Field
            label="Correo"
            type="email"
            value={p.correo}
            onChange={(v) => updateProfile({ correo: v })}
          />
          <Field
            label="Teléfono"
            value={p.telefono}
            onChange={(v) => updateProfile({ telefono: v })}
          />
          <Field
            label="Tutor a cargo"
            value={p.tutorNombre}
            onChange={(v) => updateProfile({ tutorNombre: v })}
          />
          <Field
            label="Correo del tutor"
            type="email"
            value={p.tutorCorreo}
            onChange={(v) => updateProfile({ tutorCorreo: v })}
          />
          <Field
            label="Teléfono del tutor"
            value={p.tutorTelefono}
            onChange={(v) => updateProfile({ tutorTelefono: v })}
            className="sm:col-span-2"
          />
        </div>

        <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-3 mt-4">
          <p className="text-xs font-bold text-orange-800 uppercase tracking-wide">
            ¿Olvidaste tu contraseña?
          </p>
          <p className="text-xs text-orange-900/80 mt-1">
            Ingresa el correo donde recibirás las instrucciones de recuperación.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              className="flex-1 rounded-lg border border-orange-200 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 outline-none"
              placeholder="correo@ejemplo.com"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={handleRecoverySubmit}
              className="rounded-lg px-3 py-2 text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, value, onChange, type = "text", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold text-slate-500 uppercase">{label}</span>
      <input
        type={type}
        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
