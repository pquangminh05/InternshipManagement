import { useAuthStore } from "../../store/authStore";

export default function RoleGuard({ children, allowedRoles = [] }) {
  const user = useAuthStore((s) => s.user);
  
  if (!user) return null;
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>Không có quyền truy cập</h2>
        <p>Bạn không có quyền truy cập vào trang này.</p>
      </div>
    );
  }
  
  return children;
}