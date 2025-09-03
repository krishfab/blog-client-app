import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin
        ? `${process.env.REACT_APP_API_URL}/users/login`
        : `${process.env.REACT_APP_API_URL}/users/register`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (isLogin) {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        const profileRes = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${data.token}` },
        });

        if (!profileRes.ok) throw new Error("Failed to fetch profile");

        const profileData = await profileRes.json();
        setUser(profileData);

        navigate("/");
      } else {
        alert("Registration successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{isLogin ? "Login" : "Register"}</h2>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="login-input"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="login-input"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="login-toggle">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Login;
