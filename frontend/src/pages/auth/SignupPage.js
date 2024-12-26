import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3001/auth/register", formData);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors([error.response.data.error]);
      } else {
        setErrors(["An unknown error occurred"]);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Register</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <a href="/login">Already have an account?</a>
    </div>
  );
}

export default SignupPage;
