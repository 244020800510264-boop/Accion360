import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AlumnoPage from "./pages/AlumnoPage";
import LoginPage from "./pages/LoginPage";
import ProfesorPage from "./pages/ProfesorPage";

function ProtectedRoute({ role, children }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.rol !== role) return <Navigate to={`/${user?.rol}`} replace />;
  return children;
}

export default function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? `/${user.rol}` : "/login"} replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profesor"
        element={
          <ProtectedRoute role="profesor">
            <ProfesorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumno"
        element={
          <ProtectedRoute role="alumno">
            <AlumnoPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
