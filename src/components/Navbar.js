import React, { useState, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(UserContext); 

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white px-3">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <img 
          src="/images/logo.png"
          alt="FabBlog Logo"
          style={{ height: "50px" }}
        />
      </Link>

      {/* Toggle button - hidden on desktop, visible on mobile */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Collapsible Menu */}
      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
        <ul className="navbar-nav mx-auto text-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blogs">Blogs</Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/my-blogs">My Blogs</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>

              {/* 👈 Admin Panel Link (only for admins) */}
              {user.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Panel</Link>
                </li>
              )}

              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

