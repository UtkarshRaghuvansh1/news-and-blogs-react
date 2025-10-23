import News from "./components/News";
import Blogs from "./components/Blogs";
import { useEffect, useState } from "react";
function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  // State to manage and store  blogs that user creates
  const [blogs, setBlogs] = useState([]);

  // State variables to handle editing and deleting of Blog Post
  // Blog post selected for editing
  const [selectedPost, setSelectedPost] = useState(null);
  // Whether the user is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle show blogs component
  const handleShowBlogs = () => {
    console.log("User Clicked, Navigating to Blogs Component");
    setShowNews(false);
    setShowBlogs(true);
  };
  // Function to handle show news component
  const handleBackToNews = () => {
    console.log("Back to News Clicked, Navigating to News Component");
    setShowBlogs(false);
    setShowNews(true);

    // Once user editted or created a new blog post we want to reset the selectedPost and isEditing state
    setSelectedPost(null); // No blog is selected
    setIsEditing(false); // Exit editing mode
  };

  // We want to load any previously saved blog posts from the local storage.
  // This ensures that our application has access to any data that was stored during previous sessions.
  useEffect(() => {
    console.log("Loading blogs from local storage");
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    // update the state of blogs
    setBlogs(savedBlogs);
  }, []);

  // This function handles to add a new blog to the blogs state
  // this function is also responsible for editing the blog post
  const handleCreateBlog = (newBlog, isEdit) => {
    console.log("Creating/Editing Blog Post:", newBlog);
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit
        ? prevBlogs.map((blog) => {
            if (blog === selectedPost) {
              return newBlog; // Replace with the updated blog
            }
            return blog; // No change
          })
        : [...prevBlogs, newBlog];
      // save the blogs to local storage
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    // After handling blog creation or editing, reset selectedPost and isEditing state
    // Exit the editting mode
    setSelectedPost(null); // No blog is selected
    setIsEditing(false); // Exit editing mode
  };

  // This function will be designed to handle the editing of selected blog posts.
  const handleEditBlog = (blog) => {
    console.log("Editing Clicked:");
    console.log("Blog going to be editted", blog.blogTitle);
    setSelectedPost(blog); // Set the selected blog post for editing
    setIsEditing(true); // Enter editing mode
    setShowBlogs(true); // Ensure Blogs component is visible
    setShowNews(false); // Hide News component
  };

  // This function will handle the deletion of a blog post
  const handleDeleteBlog = (blogToDelete) => {
    console.log("Delete Clicked:");
    console.log("Blog going to be deleted", blogToDelete.blogTitle);
    // Update the blogs state by filtering out the deleted blog
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete);
      // Update local storage
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  return (
    <div className="container">
      <div className="news-and-blog">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs} // this function will be called when user clicks on blogs button
            blogs={blogs} // passing the blogs state to News component
            onEditBlog={handleEditBlog} // this function will be called when user wants to edit a blog post
            onDeleteBlog={handleDeleteBlog} // this function will be called when user wants to delete a blog post
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            onCreateBlog={handleCreateBlog}
            editPost={selectedPost} // Pass the selected post for editing
            isEditing={isEditing} // Pass the editing mode status
          />
        )}
      </div>
    </div>
  );
}

export default App;
