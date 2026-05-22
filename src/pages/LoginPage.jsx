import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Modal from "../components/Modal";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [role, setRole] = useState("alumno");
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [openRecovery, setOpenRecovery] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!/^\d{10}$/.test(matricula)) {
      toast.error("La matricula debe tener 10 digitos");
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
    setTimeout(() => {
      navigate(result.user.rol === "profesor" ? "/profesor" : "/alumno");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest shadow-sm h-16">
        <div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">ACCION 360</div>
          <div className="hidden md:flex gap-8">
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Servicios</a>
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Nosotros</a>
            <a className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors" href="#">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Background Imagery */}
        <div className="absolute inset-0 z-0 flex pointer-events-none">
          <div className="hidden lg:block w-1/2 h-full bg-surface-container">
            <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-low opacity-60" />
          </div>
          <div className="w-full lg:w-1/2 h-full bg-background flex items-center justify-center">
            <div className="w-full h-full opacity-5 bg-[radial-gradient(#006c49_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[480px]">
          <div className="bg-surface-container-lowest rounded-xl shadow-elevated p-8 md:p-12 border border-outline-variant/30">
            {/* Branding */}
            <div className="text-center mb-10">
              <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ACCION 360</h1>
              <p className="text-on-surface-variant mt-2 font-body-md text-body-md">Pequeñas acciones, grandes cambios</p>
            </div>

            {/* Role Tabs */}
            <div className="flex border-b border-outline-variant mb-8">
              <button
                className={`flex-1 pb-2 font-label-md text-label-md transition-all ${
                  role === "alumno"
                    ? "text-primary font-semibold active-tab"
                    : "text-on-surface-variant hover:text-primary"
                }`}
                onClick={() => setRole("alumno")}
              >
                Alumno
              </button>
              <button
                className={`flex-1 pb-2 font-label-md text-label-md transition-all ${
                  role === "profesor"
                    ? "text-primary font-semibold active-tab"
                    : "text-on-surface-variant hover:text-primary"
                }`}
                onClick={() => setRole("profesor")}
              >
                Profesor
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="email">
                  Correo electrónico o ID
                </label>
                <div className="relative">
                  <Icon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    className="w-full h-10 pl-10 pr-4 bg-white border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    id="email"
                    placeholder="usuario@dominio.com"
                    type="text"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="password">
                    Contraseña
                  </label>
                  <a
                    className="font-label-md text-label-md text-primary hover:underline transition-all"
                    onClick={() => setOpenRecovery(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    className="w-full h-10 pl-10 pr-12 bg-white border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} />
                  </button>
                </div>
              </div>

              <button
                className="w-full h-12 bg-primary-container text-on-primary hover:bg-primary transition-all rounded-lg font-bold text-lg shadow-sm active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </button>

              <div className="text-center pt-4">
                <p className="text-on-surface-variant font-body-md text-body-md">
                  ¿No tienes una cuenta?{" "}
                  <a className="text-primary font-semibold hover:underline" href="#">
                    Regístrate
                  </a>
                </p>
              </div>
            </form>

            {/* Demo credentials */}
            <p className="mt-6 text-xs text-on-surface-variant text-center">
              Demo: Alumno 1234567890 / demo1234 - Profesor 9876543210 / demo1234
            </p>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="w-full py-8 bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-4">
          <div className="font-label-md text-label-md font-semibold text-primary">ACCION 360</div>
          <div className="flex gap-6">
            <a className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-opacity duration-200" href="#">
              Terms of Service
            </a>
            <a className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-opacity duration-200" href="#">
              Privacy Policy
            </a>
            <a className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-opacity duration-200" href="#">
              Help Center
            </a>
          </div>
          <p className="text-secondary font-label-sm text-label-sm">© 2024 ACCION 360. All rights reserved.</p>
        </div>
      </footer>

      <Modal open={openRecovery} title="Recuperar cuenta" onClose={() => setOpenRecovery(false)}>
        <p className="mb-2 text-sm text-on-surface-variant">Ingresa tu correo para recuperar acceso.</p>
        <input
          className="w-full h-10 px-4 bg-surface-container-lowest border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
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
