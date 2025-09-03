import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import FeaturedPosts from "./components/FeaturedPost";
import BlogList from "./components/BlogList";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";      
import ProfilePage from "./pages/Profile";
import AddPost from "./pages/AddPost";
import { UserProvider } from "./context/UserContext"; 
import MyBlogs from "./pages/MyBlogs";
import AdminPanel from "./pages/AdminPanel";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<FeaturedPosts />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-post" element={<AddPost/>} />
          <Route path="/my-blogs" element={<MyBlogs/>} />
          <Route path="/admin" element={<AdminPanel/>} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

