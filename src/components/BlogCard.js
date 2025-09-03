import React from "react";

const BlogCard = ({ title, image, author, date }) => {
  return (
    <div className="card h-100 shadow-sm">
      {image && (
        <img
          src={image}
          alt={title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="text-muted small mb-2">By {author} • {date}</p>
        {/* Push button to bottom if needed */}
        <button className="btn btn-primary mt-auto">Read More</button>
      </div>
    </div>
  );
};

export default BlogCard;

