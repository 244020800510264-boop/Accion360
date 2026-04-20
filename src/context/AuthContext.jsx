import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "accion360_auth";
const AuthContext = createContext(null);

const users = [
  { matricula: "1234567890", password: "demo1234", rol: "alumno", nombre: "Alumno Demo" },
  { matricula: "9876543210", password: "demo1234", rol: "profesor", nombre: "Profesor Demo" },
];

function getInitialAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialAuth);

  const login = (matricula, password) => {
    const match = users.find((item) => item.matricula === matricula && item.password === password);
    if (!match) return { ok: false, error: "Credenciales invalidas" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(match));
    setUser(match);
    return { ok: true, user: match };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
