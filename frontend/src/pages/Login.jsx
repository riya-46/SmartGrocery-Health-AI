import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (!email) {
      alert("Email required");
      return;
    }

    setLoading(true);

    // write storage FIRST
    localStorage.setItem(
      "sg_user",
      JSON.stringify({ email })
    );
    localStorage.setItem("sg_token", "dummy-token");

    // FORCE hard reload with cache-buster
    window.location.replace("/dashboard?from=login");
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
