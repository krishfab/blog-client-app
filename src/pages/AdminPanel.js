import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const AdminPanel = () => {
  const { token, user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [message, setMessage] = useState("");

  // Fetch all posts on mount
  useEffect(() => {
    if (!user || !user.isAdmin) return;

    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, [token, user]);

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setComments(prev => ({ ...prev, [postId]: data }));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/admin/deletePost/${postId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setMessage(data.message);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete comment
  const deleteComment = async (commentId, postId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/admin/deleteComment/${commentId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setMessage(data.message);
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(c => c._id !== commentId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || !user.isAdmin) {
    return <p className="text-center mt-8">Access Denied: Admins only</p>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Admin Panel</h2>
      {message && <p className="text-center text-success">{message}</p>}

      <section>
        <h3>Posts</h3>
        {posts.length === 0 && <p>No posts found</p>}
        <ul>
          {posts.map(post => (
            <li key={post._id} className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span>{post.title}</span>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => fetchComments(post._id)}
                  >
                    View Comments
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete Post
                  </button>
                </div>
              </div>

              {/* Comments for this post */}
              {comments[post._id] ? (
                comments[post._id].length > 0 ? (
                  <ul className="mt-2 ms-4">
                    {comments[post._id].map(comment => (
                      <li
                        key={comment._id}
                        className="d-flex justify-content-between align-items-center my-1"
                      >
                        <span>
                          {comment.text} -{" "}
                          <small>
                            {comment.author?.firstName || "Anonymous"}
                          </small>
                        </span>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteComment(comment._id, post._id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ms-4 mt-2 text-muted">No comments</p>
                )
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;

