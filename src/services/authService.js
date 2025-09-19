import api from "./apiClient";

// Spring Boot: POST /api/auth/login  -> { token, user: { id, email, fullName, role } }
export async function loginApi(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}
// Gửi link kích hoạt/đặt mật khẩu đến email đã được Admin tạo sẵn
export async function requestActivation(email) {
  const { data } = await api.post("/auth/activation-request", { email });
  // backend trả: { message: 'Activation email sent' } (gợi ý)
  return data;
}
// Lấy thông tin hồ sơ cá nhân của thực tập sinh
export async function getMyProfile() {
  const { data } = await api.get("/intern/me/profile");
  // ví dụ data: { fullName, email, university, major, startDate, endDate, mentorName }
  return data;
}

// Lấy danh sách tài liệu đã nộp
export async function getMyDocuments() {
  const { data } = await api.get("/intern/me/documents");
  // ví dụ data: [{ id, type: 'CV'|'APPLICATION'|'CONTRACT', fileName, uploadedAt, status: 'PENDING'|'APPROVED'|'REJECTED', note }]
  return data;
}
