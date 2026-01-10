import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email });

      if (res.data.success) {
        localStorage.setItem(
          "sg_user",
          JSON.stringify(res.data.user)
        );
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2>Login</h2>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br /><br />

          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
