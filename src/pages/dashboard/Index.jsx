export default function Dashboard() {
  return (
    <div>
      <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600", marginBottom: "24px" }}>Dashboard</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "1px solid #e5e5e5"
        }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#007bff" }}>Tổng số thực tập</h3>
          <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>24</p>
        </div>
        
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "1px solid #e5e5e5"
        }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#28a745" }}>Đang thực tập</h3>
          <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>18</p>
        </div>
        
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "1px solid #e5e5e5"
        }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#ffc107" }}>Sinh viên</h3>
          <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>156</p>
        </div>
        
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "1px solid #e5e5e5"
        }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#dc3545" }}>Công ty</h3>
          <p style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>42</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "1px solid #e5e5e5"
        }}>
          <h3 style={{ margin: "0 0 16px 0" }}>Thực tập gần đây</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "12px", background: "#f8f9fa", borderRadius: "4px" }}>
              <strong>Frontend Developer</strong> - Tech Corp
              <br />
              <small style={{ color: "#666" }}>Nguyễn Văn A • Bắt đầu: 15/01/2024</small>
            </div>
            <div style={{ padding: "12px", background: "#f8f9fa", borderRadius: "4px" }}>
              <strong>Backend Developer</strong> - Software Solutions
              <br />
              <small style={{ color: "#666" }}>Trần Thị B • Bắt đầu: 10/01/2024</small>
            </div>
          </div>
        </div>
        
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "1px solid #e5e5e5"
        }}>
          <h3 style={{ margin: "0 0 16px 0" }}>Hoạt động</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "14px", color: "#666" }}>
              • Sinh viên mới đăng ký thực tập
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              • Công ty cập nhật thông tin
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              • Báo cáo thực tập được nộp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
