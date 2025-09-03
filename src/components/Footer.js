import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12">
      <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;