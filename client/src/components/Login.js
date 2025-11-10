import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // import your api helper
import '../App.css';

function Login({ setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     const data = await loginUser(email, password); // use API helper
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify(data.user));

  //     navigate("/dashboard"); // navigate after storing token
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const data = await loginUser(email, password);

     setToken(data.token);
      setUser(data.user);
    // ✅ Wait for storage operations
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Add a small delay so React Router and storage sync properly
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}  autoComplete="off">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
