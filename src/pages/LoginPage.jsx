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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    if (!/^\d{10}$/.test(matricula)) {
      toast.error("La matricula debe tener 10 digitos");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Ingresa tu contraseña");
      setLoading(false);
      return;
    }

    const result = login(matricula, password);
    if (!result.ok) {
      toast.error("Credenciales invalidas");
      setLoading(false);
      return;
    }

    toast.success("Sesion iniciada");
    navigate(result.user.rol === "profesor" ? "/profesor" : "/alumno");
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8ff] dark:bg-slate-950">
      {/* Navbar fijo */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm h-16">
        <div className="flex justify-between items-center px-4 md:px-12 h-full">
          <span className="font-bold text-xl text-green-700 dark:text-emerald-400">ACCION 360</span>
          <div className="hidden md:flex gap-8">
            <a href="#" className="text-slate-500 hover:text-green-700">Servicios</a>
            <a href="#" className="text-slate-500 hover:text-green-700">Nosotros</a>
            <a href="#" className="text-slate-500 hover:text-green-700">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="flex-grow flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Fondo dividido */}
        <div className="absolute inset-0 z-0">
          <div className="hidden lg:block w-1/2 h-full bg-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" 
              alt="Office" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="w-full lg:w-1/2 h-full bg-[#faf8ff] absolute lg:static inset-0 lg:inset-auto"
               style={{
                 backgroundImage: 'radial-gradient(circle, rgba(34,197,94,0.03) 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }}>
          </div>
        </div>

        {/* Tarjeta del formulario */}
        <div className="relative z-10 w-full max-w-[480px]">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0px_10px_24px_rgba(0,108,73,0.08)] p-8 md:p-12 border border-slate-200/50 dark:border-slate-700">
            {/* Header de la tarjeta */}
            <div className="text-center mb-10">
              <h1 className="text-2xl font-bold text-green-700 dark:text-emerald-400">ACCION 360</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Pequeñas acciones, grandes cambios</p>
            </div>

            {/* Tabs Alumno / Profesor */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8">
              <button
                type="button"
                onClick={() => switchTab("alumno")}
                className={`flex-1 pb-2 text-sm font-semibold transition-all ${
                  tab === "alumno"
                    ? "text-green-700 dark:text-emerald-400 border-b-2 border-green-700 dark:border-emerald-400"
                    : "text-slate-500 hover:text-green-600"
                }`}
              >
                Alumno
              </button>
              <button
                type="button"
                onClick={() => switchTab("profesor")}
                className={`flex-1 pb-2 text-sm font-semibold transition-all ${
                  tab === "profesor"
                    ? "text-green-700 dark:text-emerald-400 border-b-2 border-green-700 dark:border-emerald-400"
                    : "text-slate-500 hover:text-green-600"
                }`}
              >
                Profesor
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={submit} className="space-y-6">
              {/* Campo matrícula */}
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Correo electrónico o ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 size-4" />
                  <input
                    className="w-full h-10 pl-10 pr-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Matrícula"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={matricula}
                    onChange={handleMatriculaChange}
                    disabled={loading}
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

              {/* Campo contraseña */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setOpenRecovery(true)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 size-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full h-10 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Botón submit */}
              <button
                type="submit"
                className={`w-full h-12 bg-green-600 hover:bg-green-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white rounded-lg font-bold text-base shadow-sm active:scale-[0.98] transition-all mt-2 ${loading ? "cursor-not-allowed opacity-70" : ""}`}
                disabled={loading}
              >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </button>

              {/* Texto de registro */}
              <div className="text-center pt-4">
                <p className="text-slate-500">
                  ¿No tienes una cuenta?{" "}
                  <span className="text-green-600 font-semibold">Regístrate</span>
                </p>
              </div>
            </form>

            {/* Botón de credenciales demo */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowCredentials(!showCredentials)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-600"
              >
                <KeyRound className="size-3.5" />
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

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 rounded-xl z-20 flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full"></div>
              </div>
            )}
          </div>

          {/* Texto debajo de la tarjeta */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Al iniciar sesión, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 gap-4">
          <span className="font-semibold text-green-700">ACCION 360</span>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-500">Terms of Service</a>
            <a href="#" className="text-xs text-slate-500">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500">Help Center</a>
          </div>
          <span className="text-xs text-slate-400">© 2024 ACCION 360. All rights reserved.</span>
        </div>
      </footer>

      {/* Modal de recuperación de contraseña */}
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
