import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const PostDetails = () => {
  const { id } = useParams();
  const { token, user } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const notyf = new Notyf();

  // Fetch post and comments
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/getpost/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));

    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [id]);

  // Add comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!token) {
      notyf.error("⚠️ You must be logged in to comment.");
      return;
    }

    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: commentText }),
    })
      .then((res) => res.json())
      .then((newComment) => {
        setComments([...comments, newComment]);
        setCommentText("");
        notyf.success("✅ Comment added!");
      })
      .catch((err) => {
        console.error("Error adding comment:", err);
        notyf.error("❌ Could not add comment.");
      })
      .finally(() => setLoading(false));
  };

  if (!post) return <p className="loading">Loading...</p>;

  return (
    <div className="post-details-container">
      {/* Post Image */}
      {post.image && <img src={post.image} alt={post.title} className="post-image" />}

      <h1 className="post-title">{post.title}</h1>

      {/* Author Info */}
      <div className="author-info">
        {post.author?.userImage ? (
          <img src={post.author.userImage} alt="User" className="author-avatar" />
        ) : (
          <FaUserCircle className="author-avatar-icon" />
        )}
        <span className="author-name">
          {post.author
            ? `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim() ||
              post.author.email
            : "Anonymous"}
        </span>
      </div>

      <p className="post-content">{post.content}</p>

      {/* Comments */}
      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                {comment.author?.userImage ? (
                  <img src={comment.author.userImage} alt="User" className="comment-avatar" />
                ) : (
                  <FaUserCircle className="comment-avatar-icon" />
                )}
                <span className="comment-author">
                  {comment.author
                    ? `${comment.author.firstName || ""} ${comment.author.lastName || ""}`.trim() ||
                      comment.author.email
                    : "Anonymous"}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}

        {/* Add Comment Form */}
        {user && (
          <form onSubmit={handleAddComment} style={{ marginTop: "20px" }}>
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "8px",
                fontSize: "1rem",
              }}
              rows="3"
              required
            />
            <button
              type="submit"
              style={{
                padding: "10px 16px",
                background: "#000",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Comment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
