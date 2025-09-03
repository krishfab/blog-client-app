import React, { useState, useContext } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { UserContext } from "../context/UserContext";

const AddPost = () => {
  const { user, setUser, token, setToken, logout } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // ✅ Added image state
  const [loading, setLoading] = useState(false);

  const notyf = new Notyf();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ✅ get token from context OR fallback to localStorage
    const authToken = token || localStorage.getItem("token");
    console.log("Token being sent:", authToken);

    if (!authToken) {
      notyf.error("⚠️ You are not logged in. Please log in first.");
      setLoading(false);
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/addPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // ✅ use authToken here
      },
      body: JSON.stringify({ title, content, image }),
    });

    const data = await res.json();

    if (res.ok) {
      notyf.success("✅ Post added successfully!");
      setTitle("");
      setContent("");
      setImage("");
    } else {
      notyf.error(data.message || "❌ Failed to add post");
    }
  } catch (error) {
    console.error("Post error:", error);
    notyf.error("⚠️ Something went wrong!");
  } finally {
    setLoading(false);
  }
};

 return (
  <div className="addpost-container">
    <form onSubmit={handleSubmit} className="addpost-form">
      <h2 className="addpost-title">Add New Post</h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Image URL (optional)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <button type="submit" className="addpost-button">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  </div>
);
};

export default AddPost;