import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <section className="py-5 px-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center mb-4">Blog Posts</h2>
          <button
            className="btn btn-dark px-4 py-2"
            onClick={() => navigate("/add-post")}
          >
            + Add Post
          </button>
        </div>

        <div className="row">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={post.image || "/default.jpg"}
                    alt={post.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {post.content.length > 100
                        ? post.content.slice(0, 100) + "..."
                        : post.content}
                    </p>
                    <p className="text-muted small mb-2">
                      By:{" "}
                      {post.author
                        ? `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim() ||
                          post.author.email
                        : "Anonymous"}
                    </p>
                    <button
                      className="btn mt-auto"
                      style={{
                        backgroundColor: "#f5f5f5",
                        color: "#000",
                        textAlign: "left",
                        width: "85%",
                      }}
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No posts available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
