import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user, setUser, token, logout } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setUser(data.user);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user)
    return <p className="profile-message">Please log in to view profile.</p>;

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="profile-title">My Profile</h2>

        {message && <p className="profile-message">{message}</p>}

        <form onSubmit={handleUpdate}>
          <input
            className="profile-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            className="profile-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            className="profile-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            className="profile-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            className="profile-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
          />

          <button type="submit" className="profile-button">
            Update Profile
          </button>
        </form>

        <button
          onClick={logout}
          className="profile-button profile-logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;



