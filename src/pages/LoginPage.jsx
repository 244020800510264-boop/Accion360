import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound, Lock, User } from "lucide-react";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [openRecovery, setOpenRecovery] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [tab, setTab] = useState("alumno");
  const [matriculaError, setMatriculaError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleMatriculaChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setMatricula(val);
    if (val.length > 0 && val.length < 10) {
      setMatriculaError("Faltan " + (10 - val.length) + " dígito(s)");
    } else {
      setMatriculaError("");
    }
  };

  const demoMatricula = tab === "alumno" ? "1234567890" : "9876543210";
  const demoPassword = "demo1234";

  const switchTab = (newTab) => {
    setTab(newTab);
    setMatricula("");
    setPassword("");
    setMatriculaError("");
  };

  const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!/^\d{10}$/.test(matricula)) {
      toast.error("La matricula debe tener 10 digitos");
      setIsLoading(false);
      return;
    }
    if (!password) {
      toast.error("Ingresa tu contraseña");
      setIsLoading(false);
      return;
    }

    const result = login(matricula, password);
    if (!result.ok) {
      toast.error("Credenciales invalidas");
      setIsLoading(false);
      return;
    }

    toast.success("Sesion iniciada");
    navigate(result.user.rol === "profesor" ? "/profesor" : "/alumno");
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-bg p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-green-700">
          PEQUENAS ACCIONES GRANDES CAMBIOS
        </p>
        <h1 className="mt-2 text-center text-xl font-semibold text-slate-700">ACCION 360 - Seguimiento de servicio</h1>

        <div className="mt-5 flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => switchTab("alumno")}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === "alumno"
                ? "border-green-600 text-green-700"
                : "border-transparent text-slate-400"
            }`}
          >
            <User className="h-4 w-4" />
            Alumno
          </button>
          <button
            type="button"
            onClick={() => switchTab("profesor")}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === "profesor"
                ? "border-green-600 text-green-700"
                : "border-transparent text-slate-400"
            }`}
          >
            <Lock className="h-4 w-4" />
            Profesor
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <div>
            <div className="relative">
              <input
                className="input pr-12"
                placeholder="Matricula (10 digitos)"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={matricula}
                onChange={handleMatriculaChange}
                disabled={isLoading}
              />
              <span
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                  matricula.length === 10 ? "text-green-600" : "text-slate-400"
                }`}
              >
                {matricula.length}/10
              </span>
            </div>
            {matriculaError && <p className="mt-1 text-xs text-red-500">{matriculaError}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input pr-10"
              placeholder="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button className="btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Iniciando..." : "Iniciar Sesion"}
          </button>
        </form>

        <button onClick={() => setOpenRecovery(true)} className="mt-3 text-sm text-green-700 underline">
          Olvidaste tu contrasena?
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-600"
          >
            <KeyRound className="h-3.5 w-3.5" />
            Ver credenciales de prueba
          </button>

          {showCredentials && (
            <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="font-mono text-xs text-slate-700">
                Matrícula: {demoMatricula}
                <br />
                Contraseña: {demoPassword}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMatricula(demoMatricula);
                  setPassword(demoPassword);
                  setShowCredentials(false);
                  setMatriculaError("");
                }}
                className="mt-2 text-xs font-medium text-green-700 underline hover:text-green-800"
              >
                Usar estas credenciales
              </button>
            </div>
          )}
        </div>
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
