import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const featured = posts.slice(0, 9);

  return (
    <section className="py-5 px-3">
      <div className="container">
        <h2 className="text-center mb-4">Featured Posts</h2>
        <div className="row">
          {featured.map((post) => (
            <div key={post._id} className="col-4 mb-4">
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
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/blogs")}
            className="btn btn-dark px-4 py-2"
          >
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
