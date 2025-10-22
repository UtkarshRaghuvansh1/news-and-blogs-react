import { useState } from "react";
import userImg from "../assets/images/user.jpeg";
import noImg from "../assets/images/no-img.png";
import "./Blogs.css";
export default function Blogs({ onBack, onCreateBlog }) {
  // State to manage form visibility
  // on clicking create new post form should be visible
  const [showForm, setShowForm] = useState(false);

  // State to hold data of image when user create a new blog post
  const [image, setImage] = useState(null);

  // State to handle Image name to show what Image uploaded
  const [imgName, setImgName] = useState("");

  // State to hold title of blog post which user create
  const [blogTitle, setBlogTitle] = useState("");

  // State to hold content of blog post which user create
  const [content, setContent] = useState("");

  // This function handles the image upload process
  const handleImageChange = (evt) => {
    const file = evt.target.files[0];
    // This condition checks if there are any file selected by user
    if (evt.target.files && evt.target.files[0]) {
      setImgName(file.name);
      // FileReader - The file reader object allows us to read the contents of files stored on the user's computer.
      // It provides methods to read file data in various formats, such as text or base64 encoded strings.
      const reader = new FileReader();
      reader.onloadend = () => {
        // The reader.result property contains the base64 encoded data of the selected image file.
        setImage(reader.result);
      };
      // The readAsDataURL method reads the contents of the file and converts it into a base64 encoded string.
      // Converting the file into a base64 encoded string allows us to use the image data directly in our HTML
      // as a data URL.
      reader.readAsDataURL(evt.target.files[0]);
    }
  };

  // This function handles the user submission of form
  // When user create new blog post it will gather all the input
  // and return new blog post object and update state
  const handleSubmit = (evt) => {
    //prevent default behaviour - page realod on submission of form
    evt.preventDefault();
    const newBlog = {
      image: image || noImg,
      blogTitle,
      content,
    };
    onCreateBlog(newBlog); // state updated in App content

    // clear the form fields
    setImage(null);
    setBlogTitle("");
    setContent("");

    // Hide the form after submission
    setShowForm(false);
  };

  return (
    <div className="blogs">
      <div className="blog-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blog-right">
        {showForm ? (
          // {/* Form Element  */}
          <div className="blog-right-form">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i>Upload Image
                </label>
                {/* id attribute should match the html for attribute */}
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleImageChange}
                />

                {/* ✅ Show uploaded image name only */}
                {imgName && (
                  <p className="image-name">Uploaded image : {imgName}</p>
                )}
              </div>

              <input
                type="text"
                placeholder="Add Title (Max 60 character)"
                className="title-input"
                value={blogTitle}
                onChange={(evt) => setBlogTitle(evt.target.value)}
              />

              <textarea
                className="text-input"
                placeholder="Add Text"
                value={content}
                onChange={(evt) => setContent(evt.target.value)}
              ></textarea>
              <button type="submit" className="submit-btn">
                Submit Button
              </button>
            </form>
          </div>
        ) : (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}

        <button className="blog-close-btn" onClick={onBack}>
          Back
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
