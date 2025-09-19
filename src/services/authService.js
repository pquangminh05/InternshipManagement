import api from "./apiClient";

// Spring Boot: POST /api/auth/login  -> body { email, password }
// response: { token, user: { id, email, fullName, role } }
export async function loginApi(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

// Gửi link kích hoạt/đặt mật khẩu đến email đã được Admin tạo sẵn
export async function requestActivation(email) {
  const { data } = await api.post("/auth/activation-request", { email });
  return data;
}
