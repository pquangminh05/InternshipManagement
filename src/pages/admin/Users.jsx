import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "../../services/adminService";
const ROLES = ["ADMIN", "HR", "MENTOR", "INTERN"];
export default function Users() {
  const [q, setQ] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [err, setErr] = useState("");
  async function load() {
    setLoading(true);
    setErr("");
    try {
      const { content, total } = await getUsers({ q, role: filterRole });
      setItems(content || []);
      setTotal(total || 0);
    } catch (e) {
      setErr(e?.response?.data?.message || "Không tải được danh sách.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, [q, filterRole]);
  async function onSaveRole(id, role) {
    setSavingId(id);
    try {
      await updateUserRole(id, role);
      setItems((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (e) {
      alert(e?.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setSavingId(null);
    }
  }
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
        Quản lý vai trò
      </h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Tìm họ tên/email…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            width: 280,
          }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <option value="">Tất cả vai trò</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <div style={{ marginLeft: "auto", fontSize: 13, color: "#666" }}>
          Tổng: {total}
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          overflowX: "auto",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
          <thead>
            <tr style={{ background: "#f6f6f6", textAlign: "left" }}>
              <Th>Họ tên</Th>
              <Th>Email</Th>
              <Th>Vai trò</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} style={{ padding: 12 }}>
                  Đang tải…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 12, color: "#666" }}>
                  Không có dữ liệu.
                </td>
              </tr>
            )}
            {items.map((u) => (
              <tr key={u.id} style={{ borderTop: "1px solid #eee" }}>
                <Td>{u.fullName}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <select
                    defaultValue={u.role}
                    disabled={savingId === u.id}
                    onChange={(e) => onSaveRole(u.id, e.target.value)}
                    style={{
                      padding: "6px 10px",
                      border: "1px solid #ddd",
                      borderRadius: 8,
                    }}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Td>
                <Td>
                  {savingId === u.id ? (
                    <span style={{ fontSize: 12, color: "#666" }}>
                      Đang lưu…
                    </span>
                  ) : (
                    "—"
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const Th = ({ children }) => <th style={{ padding: 12 }}>{children}</th>;
const Td = ({ children }) => <td style={{ padding: 12 }}>{children}</td>;
