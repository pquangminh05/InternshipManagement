import Navbar from "../common/Navbar";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar />
      <main style={{ padding: "24px" }}>
        {children}
      </main>
    </div>
  );
}
