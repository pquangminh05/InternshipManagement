import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/adminService";

const ROLES = ["ADMIN", "HR", "MENTOR", "INTERN"];
const STATUSES = ["ACTIVE", "PENDING", "DISABLED"];

export default function Users() {
  const [q, setQ] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const { content, total } = await getUsers({
        q,
        role: filterRole,
        status: filterStatus,
      });
      setItems(content || []);
      setTotal(total || 0);
    } catch (e) {
      setErr(
        e?.response?.data?.message || "Không tải được danh sách người dùng."
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load(); /* eslint-disable-next-line */
  }, [q, filterRole, filterStatus]);

  async function onInlineChange(u, field, value) {
    setSavingId(u.id);
    try {
      await updateUser({
        id: u.id,
        fullName: field === "fullName" ? value : u.fullName,
        role: field === "role" ? value : u.role,
        status: field === "status" ? value : u.status,
      });
      setItems((prev) =>
        prev.map((x) => (x.id === u.id ? { ...x, [field]: value } : x))
      );
    } catch (e) {
      alert(e?.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setSavingId(null);
    }
  }

  async function onCreate(data) {
    try {
      await createUser(data);
      setShowCreate(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || "Tạo tài khoản thất bại");
    }
  }

  async function onDelete(id) {
    if (!confirm("Xoá người dùng này?")) return;
    await deleteUser(id);
    await load();
  }

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
        Quản lý người dùng
      </h1>

      {/* Filters + Actions */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}
      >
        <input
          placeholder="Tìm theo họ tên / email…"
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
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <option value="">Tất cả trạng thái</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div style={{ marginLeft: "auto" }} />
        <button
          onClick={() => setShowCreate(true)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: 0,
            background: "#111",
            color: "#fff",
          }}
        >
          + Tạo tài khoản
        </button>
        <div style={{ fontSize: 13, color: "#666", alignSelf: "center" }}>
          Tổng: {total}
        </div>
      </div>

      {/* Table */}
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
              <Th>Trạng thái</Th>
              <Th style={{ width: 120 }}>Thao tác</Th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} style={{ padding: 12 }}>
                  Đang tải…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 12, color: "#666" }}>
                  Không có dữ liệu.
                </td>
              </tr>
            )}
            {items.map((u) => (
              <tr key={u.id} style={{ borderTop: "1px solid #eee" }}>
                <Td>
                  <InlineEdit
                    text={u.fullName}
                    onSave={(v) => onInlineChange(u, "fullName", v)}
                    disabled={savingId === u.id}
                  />
                </Td>
                <Td>{u.email}</Td>
                <Td>
                  <select
                    defaultValue={u.role}
                    onChange={(e) => onInlineChange(u, "role", e.target.value)}
                    disabled={savingId === u.id}
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
                  <select
                    defaultValue={u.status}
                    onChange={(e) =>
                      onInlineChange(u, "status", e.target.value)
                    }
                    disabled={savingId === u.id}
                    style={{
                      padding: "6px 10px",
                      border: "1px solid #ddd",
                      borderRadius: 8,
                    }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Td>
                <Td>
                  <button onClick={() => onDelete(u.id)} style={btnDanger}>
                    Xoá
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {err && <div style={{ marginTop: 10, color: "#c53030" }}>{err}</div>}

      {showCreate && (
        <CreateUserDialog
          onClose={() => setShowCreate(false)}
          onCreate={onCreate}
        />
      )}
    </div>
  );
}

/* Components nhỏ */

function InlineEdit({ text, onSave, disabled }) {
  const [val, setVal] = useState(text);
  const [editing, setEditing] = useState(false);
  return editing ? (
    <span>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        style={{
          padding: "6px 8px",
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      />
      <button
        disabled={disabled}
        onClick={() => {
          onSave(val);
          setEditing(false);
        }}
        style={btnSmall}
      >
        Lưu
      </button>
      <button
        onClick={() => {
          setVal(text);
          setEditing(false);
        }}
        style={btnSmallLight}
      >
        Huỷ
      </button>
    </span>
  ) : (
    <span onDoubleClick={() => setEditing(true)}>{text}</span>
  );
}

function CreateUserDialog({ onClose, onCreate }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("INTERN");
  const [status, setStatus] = useState("PENDING");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  function validate() {
    if (!fullName.trim()) return "Vui lòng nhập họ tên";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Email không hợp lệ";
    return "";
  }

  async function submit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }
    setSubmitting(true);
    setErr("");
    try {
      await onCreate({ fullName, email, role, status });
    } catch (_) {
      // onCreate đã hiển thị alert
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={modalWrap}>
      <div style={modalCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <h3 style={{ margin: 0 }}>Tạo tài khoản</h3>
          <button onClick={onClose} style={btnSmallLight}>
            Đóng
          </button>
        </div>
        <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
          <label>Họ tên</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={input}
          />

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            type="email"
            placeholder="user@company.com"
          />

          <label>Vai trò</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={input}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <label>Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={input}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {err && <div style={{ color: "#c53030", fontSize: 12 }}>{err}</div>}

          <button
            type="submit"
            disabled={submitting}
            style={{ ...btnPrimary, marginTop: 8 }}
          >
            {submitting ? "Đang tạo..." : "Tạo tài khoản"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* UI helpers */
const Th = ({ children }) => <th style={{ padding: 12 }}>{children}</th>;
const Td = ({ children }) => <td style={{ padding: 12 }}>{children}</td>;
const input = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  borderRadius: 8,
};
const btnPrimary = {
  padding: "8px 12px",
  borderRadius: 8,
  border: 0,
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};
const btnDanger = {
  padding: "6px 10px",
  borderRadius: 8,
  border: 0,
  background: "#fff",
  color: "#c53030",
  borderColor: "#f0b3b3",
  borderStyle: "solid",
  borderWidth: 1,
  cursor: "pointer",
};
const btnSmall = {
  padding: "4px 8px",
  marginLeft: 6,
  borderRadius: 6,
  border: 0,
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};
const btnSmallLight = {
  padding: "4px 8px",
  marginLeft: 6,
  borderRadius: 6,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  cursor: "pointer",
};
const modalWrap = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.25)",
  display: "grid",
  placeItems: "center",
  zIndex: 50,
};
const modalCard = {
  width: 420,
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
};
