import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Index";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import RoleGuard from "../components/layout/RoleGuard";

function InternTasks() {
  return <div style={{ padding: 24 }}>Intern - Tasks</div>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/intern/tasks"
            element={
              <RoleGuard roles={["INTERN"]}>
                <InternTasks />
              </RoleGuard>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
