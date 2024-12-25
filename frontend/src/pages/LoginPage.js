import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3001/auth/login", {
        email,
        password,
      });
      // Assume JWT token is stored in localStorage
      localStorage.setItem("token", response.data.token);
      navigate("/"); // Redirect to a dashboard or home page
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors([error.response.data.error]);
      } else {
        setErrors(["An unknown error occurred"]);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <a href="/register">Create a new account?</a>
    </div>
  );
}

export default LoginPage;
