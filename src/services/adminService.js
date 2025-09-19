import api from "./apiClient";
import { requestActivation } from "./authService"; // 👈 dùng lại service kích hoạt

// BẬT tạm để chạy không cần backend
const MOCK = true;

// Mock DB nhỏ
let mockUsers = [
  {
    id: 1,
    fullName: "Admin",
    email: "admin@company.com",
    role: "ADMIN",
    status: "ACTIVE",
  },
  {
    id: 2,
    fullName: "HR One",
    email: "hr1@company.com",
    role: "HR",
    status: "ACTIVE",
  },
  {
    id: 3,
    fullName: "Mentor",
    email: "mentor1@company.com",
    role: "MENTOR",
    status: "ACTIVE",
  },
  {
    id: 4,
    fullName: "Intern",
    email: "intern1@company.com",
    role: "INTERN",
    status: "PENDING",
  },
];

// LIST
export async function getUsers({ q = "", role = "", status = "" } = {}) {
  if (MOCK) {
    const f = mockUsers.filter(
      (u) =>
        (!q ||
          u.fullName.toLowerCase().includes(q.toLowerCase()) ||
          u.email.includes(q)) &&
        (!role || u.role === role) &&
        (!status || u.status === status)
    );
    return { content: f, total: f.length };
  }
  const { data } = await api.get("/admin/users", {
    params: { q, role, status },
  });
  return data;
}

// CREATE
export async function createUser({
  fullName,
  email,
  role,
  status = "PENDING",
}) {
  if (MOCK) {
    if (mockUsers.some((u) => u.email === email)) {
      const e = new Error("Email đã tồn tại");
      e.response = { data: { message: "Email đã tồn tại" } };
      throw e;
    }
    const id = Math.max(0, ...mockUsers.map((u) => u.id)) + 1;
    const user = { id, fullName, email, role, status };
    mockUsers.push(user);
    return user; // 👈 trả user để FE quyết định có gửi mail ngay không
  }
  const { data } = await api.post("/admin/users", {
    fullName,
    email,
    role,
    status,
  });
  return data;
}

// GỬI EMAIL KÍCH HOẠT (theo email)
export async function sendActivation(email) {
  if (MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return { message: "Activation email sent (mock)" };
  }
  return requestActivation(email); // POST /auth/activation-request { email }
}

// UPDATE
export async function updateUser({ id, fullName, role, status }) {
  if (MOCK) {
    mockUsers = mockUsers.map((u) =>
      u.id === id ? { ...u, fullName, role, status } : u
    );
    return { success: true };
  }
  const { data } = await api.patch(`/admin/users/${id}`, {
    fullName,
    role,
    status,
  });
  return data;
}

// DELETE
export async function deleteUser(id) {
  if (MOCK) {
    mockUsers = mockUsers.filter((u) => u.id !== id);
    return { success: true };
  }
  const { data } = await api.delete(`/admin/users/${id}`);
  return data;
}
