import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [openRecovery, setOpenRecovery] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(matricula)) {
      toast.error("La matricula debe tener 10 digitos");
      return;
    }
    const result = login(matricula, password);
    if (!result.ok) {
      toast.error("Credenciales invalidas");
      return;
    }
    toast.success("Sesion iniciada");
    navigate(result.user.rol === "profesor" ? "/profesor" : "/alumno");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-bg p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-green-700">
          PEQUENAS ACCIONES GRANDES CAMBIOS
        </p>
        <h1 className="mt-2 text-center text-xl font-semibold text-slate-700">ACCION 360 - Seguimiento de servicio</h1>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            className="input"
            placeholder="Matricula (10 digitos)"
            maxLength={10}
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-primary w-full">Iniciar Sesion</button>
        </form>
        <button onClick={() => setOpenRecovery(true)} className="mt-3 text-sm text-green-700 underline">
          Olvidaste tu contrasena?
        </button>
        <p className="mt-4 text-xs text-slate-500">
          Alumno: 1234567890 / demo1234 - Profesor: 9876543210 / demo1234
        </p>
      </div>

      <Modal open={openRecovery} title="Recuperar cuenta" onClose={() => setOpenRecovery(false)}>
        <p className="mb-2 text-sm text-slate-600">Ingresa tu correo para recuperar acceso.</p>
        <input
          className="input"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => {
            if (!email.includes("@")) {
              toast.error("Correo invalido");
              return;
            }
            toast.success("Enlace de recuperacion enviado");
            setOpenRecovery(false);
          }}
          className="btn-primary mt-3 w-full"
        >
          Enviar
        </button>
      </Modal>
    </div>
  );
}
