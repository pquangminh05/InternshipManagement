import { useState } from "react";
import { requestActivation } from "../../services/authService";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(""); // success message
  const [err, setErr] = useState(""); // error message

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    // Validate tối giản
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErr("Vui lòng nhập email hợp lệ.");
      return;
    }

    setSubmitting(true);
    try {
      await requestActivation(email);
      setMsg("Đã gửi email kích hoạt/đặt mật khẩu. Vui lòng kiểm tra hộp thư.");
      setEmail("");
    } catch (error) {
      const m =
        error?.response?.data?.message || "Không thể gửi email. Thử lại sau.";
      setErr(m);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f7f7f7",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          width: 380,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 6 }}>Đăng ký kích hoạt</h1>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>
          Nhập <b>email</b> đã được Admin cấp để nhận liên kết kích hoạt/đặt mật
          khẩu.
        </p>

        <label
          htmlFor="email"
          style={{ display: "block", fontSize: 12, marginBottom: 4 }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        {err && (
          <div
            role="alert"
            style={{ color: "#c53030", fontSize: 12, marginBottom: 8 }}
          >
            {err}
          </div>
        )}
        {msg && (
          <div
            role="status"
            style={{ color: "#1a7f37", fontSize: 12, marginBottom: 8 }}
          >
            {msg}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: 0,
            borderRadius: 10,
            background: "#111",
            color: "#fff",
          }}
        >
          {submitting ? "Đang gửi..." : "Gửi liên kết kích hoạt"}
        </button>

        <div style={{ marginTop: 12, fontSize: 12 }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}
