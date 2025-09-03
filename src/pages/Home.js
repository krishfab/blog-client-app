import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedPosts from "../components/FeaturedPost";
import { FaUserCircle } from "react-icons/fa"; 

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div >
      {/* ===== Header Section ===== */}
      <div className="text-center mb-12">
        <h1 className="home-header">
          Exploring New Articles
        </h1>
        <h3 className="text-lg md:text-xl text-gray-600">
          Ideas, trends, and inspiration for a brighter future
        </h3>
      </div>
      <FeaturedPosts />
      </div>

      
      );
};

export default Home;


