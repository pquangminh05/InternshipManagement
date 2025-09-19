import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Index";
import InternshipList from "../pages/internships/InternshipList";
import StudentList from "../pages/students/StudentList";
import CompanyList from "../pages/companies/CompanyList";

// Layout & Guards
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import RoleGuard from "../components/layout/RoleGuard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/internships"
              element={
                <RoleGuard roles={["HR", "ADMIN"]}>
                  <InternshipList />
                </RoleGuard>
              }
            />
            <Route
              path="/students"
              element={
                <RoleGuard roles={["HR", "ADMIN"]}>
                  <StudentList />
                </RoleGuard>
              }
            />
            <Route
              path="/companies"
              element={
                <RoleGuard roles={["HR", "ADMIN"]}>
                  <CompanyList />
                </RoleGuard>
              }
            />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
