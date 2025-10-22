import News from "./components/News";
import Blogs from "./components/Blogs";
import { useEffect, useState } from "react";
function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  // State to manage and store  blogs that user creates
  const [blogs, setBlogs] = useState([]);

  // Function to handle show blogs component
  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };
  // Function to handle show news component
  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
  };

  // We want to load any previously saved blog posts from the local storage.
  // This ensures that our application has access to any data that was stored during previous sessions.
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    // update the state of blogs
    setBlogs(savedBlogs);
  }, []);
  // This function handles to add a new blog to the blogs state
  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs, newBlog];
      // save the blogs to local storage
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  return (
    <div className="container">
      <div className="news-and-blog">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && (
          <Blogs onBack={handleBackToNews} onCreateBlog={handleCreateBlog} />
        )}
      </div>
    </div>
  );
}

export default App;
