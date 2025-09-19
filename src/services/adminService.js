import api from "./apiClient";
const MOCK = true; // bật mock

const mockUsers = [
  { id: 1, fullName: "Admin", email: "admin@company.com", role: "ADMIN" },
  { id: 2, fullName: "HR One", email: "hr1@company.com", role: "HR" },
  { id: 3, fullName: "Mentor", email: "mentor1@company.com", role: "MENTOR" },
  { id: 4, fullName: "Intern", email: "intern1@company.com", role: "INTERN" },
];

export async function getUsers({ q = "", role = "" } = {}) {
  if (MOCK) {
    const f = mockUsers.filter(
      (u) =>
        (!q ||
          u.fullName.toLowerCase().includes(q.toLowerCase()) ||
          u.email.includes(q)) &&
        (!role || u.role === role)
    );
    return { content: f, total: f.length };
  }
  const { data } = await api.get("/admin/users", { params: { q, role } });
  return data;
}

export async function updateUserRole(userId, role) {
  if (MOCK) {
    const i = mockUsers.findIndex((x) => x.id === userId);
    if (i >= 0) {
      mockUsers[i].role = role;
      return { success: true };
    } else {
      return { success: false };
    }
  }
  const { data } = await api.patch(`/admin/users/${userId}`, { role });
  return data;
}
