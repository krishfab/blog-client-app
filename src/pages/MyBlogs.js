import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const MyBlogs = () => {
  const { token, user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [loading, setLoading] = useState(false);

  const notyf = new Notyf();

  useEffect(() => {
    if (!token || !user) return;

    fetch(`${process.env.REACT_APP_API_URL}/posts/user/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [token, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingPostId
      ? `${process.env.REACT_APP_API_URL}/posts/updatePost/${editingPostId}`
      : `${process.env.REACT_APP_API_URL}/posts/addPost`;

    const method = editingPostId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, image }),
    })
      .then((res) => res.json())
      .then((post) => {
        if (editingPostId) {
          setPosts(posts.map((p) => (p._id === post._id ? post : p)));
          setEditingPostId(null);
        } else {
          setPosts([...posts, post]);
        }
        setTitle("");
        setContent("");
        setImage("");
        notyf.success(`✅ Post ${editingPostId ? "updated" : "added"} successfully!`);
      })
      .catch((err) => {
        console.error(err);
        notyf.error("❌ Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setImage(post.image || "");
  };

  const handleDelete = (postId) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/deletePost/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setPosts(posts.filter((p) => p._id !== postId)))
      .catch((err) => console.error("Error deleting post:", err));
  };

  return (
    <div className="addpost-container">
      <div className="addpost-form">
        <h2 className="addpost-title">{editingPostId ? "Edit Post" : "Add New Post"}</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="addpost-button" disabled={loading}>
            {loading ? "Submitting..." : editingPostId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div style={{ width: "100%", maxWidth: "600px", marginTop: "40px", padding: 20,
       }}>
        <h2 className="addpost-title">My Blogs</h2>
        {posts.length === 0 ? (
          <p style={{ color: "#444", textAlign: "center" }}>No blogs yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontWeight: "600", marginBottom: "8px" }}>{post.title}</h3>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "12px",
                  }}
                />
              )}
              <p style={{ color: "#444", lineHeight: "1.5" }}>{post.content}</p>
              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{
                    padding: "8px 12px",
                    background: "#f59e0b",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{
                    padding: "8px 12px",
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlogs;


