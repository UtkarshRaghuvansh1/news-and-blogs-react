import News from "./components/News";
import Blogs from "./components/Blogs";
import { useState } from "react";
function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);

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
  return (
    <div className="container">
      <div className="news-and-blog">
        {showNews && <News onShowBlogs={handleShowBlogs} />}
        {showBlogs && <Blogs onBack={handleBackToNews} />}
      </div>
    </div>
  );
}

export default App;
