import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to MediBot</h1>
      <p>Your health ally</p>

      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
