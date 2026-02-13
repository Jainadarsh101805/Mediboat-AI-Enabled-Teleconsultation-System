import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <aside style={sidebar}>
        <h2>MediBot</h2>
        <Link to="/dashboard/chatbot">Chatbot</Link>
        <Link to="/dashboard/appointments">Appointments</Link>
        <Link to="/dashboard/records">Records</Link>
      </aside>

      <main style={{ flex: 1, padding: "40px" }}>
        <Outlet />
      </main>
    </div>
  );
}

const sidebar = {
  width: "220px",
  background: "#2D6CDF",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};
