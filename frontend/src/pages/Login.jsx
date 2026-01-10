import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email) return alert("Email required");

    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email });

      if (res.data.success) {
        localStorage.setItem("sg_user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Login error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <button
          className="primary"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
