import { useState, useEffect } from "react";
import userImg from "../assets/images/user.jpeg";
import noImg from "../assets/images/no-img.png";
import "./Blogs.css";
export default function Blogs({ onBack, onCreateBlog, editPost, isEditing }) {
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

  // State to Handle submission of blog post
  const [submitted, setSubmitted] = useState(false);

  //State variables for Form Validation
  const [validTitle, setValidTitle] = useState(true);
  const [validText, setValidText] = useState(true);

  // Going to use the useEffect hook to pre-fill the form fields when editing a blog post
  // This useEffect will run whenever isEditing or editPost changes
  useEffect(() => {
    if (isEditing && editPost) {
      // If editing, pre-fill the form with existing blog data
      setImage(editPost.image);
      setBlogTitle(editPost.blogTitle);
      setContent(editPost.content);
      setShowForm(true); // Show the form when editing
    } else {
      // If not editing, clear the form
      setImage(null);
      setBlogTitle("");
      setContent("");
      setShowForm(false);
    }
  }, [isEditing, editPost]);

  // This function handles the image upload process
  const handleImageChange = (evt) => {
    // This condition checks if there are any file selected by user
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      console.log("Uploaded Image properties", file);
      console.log("Uploaded Image size", file.size);
      console.log("Uploaded Image name", file.name);

      // If file size exceed 1 MP alert it
      const maxSize = 1 * 1024 * 1024;
      const errorMessage =
        "Image size exceeds the 1 MB limit. Please select a smaller file.";
      if (file.size > maxSize) {
        alert(errorMessage);
        return;
      }
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
      reader.readAsDataURL(file);
    }
  };

  // Functions to perform Form Validation
  // This function perform validation for form title
  const handleTitleChange = (evt) => {
    if (evt.target.value.length <= 60) {
      setBlogTitle(evt.target.value);
      setValidTitle(true);
    }
  };
  // This function perform validation for form textarea
  const handleContentChange = (evt) => {
    setContent(evt.target.value);
    setValidText(true);
  };

  // This function handles the user submission of form
  // When user create new blog post it will gather all the input
  // and return new blog post object and update state
  const handleSubmit = (evt) => {
    //prevent default behaviour - page realod on submission of form
    evt.preventDefault();
    // Form validation
    // CORE FIX: Validate fields based on current state values
    const titleValid =
      blogTitle.trim().length > 0 && blogTitle.trim().length <= 60;
    const contentValid = content.trim().length > 0;

    // Update validation states for visual feedback (e.g., highlighting borders)
    setValidTitle(titleValid);
    setValidText(contentValid);

    // If validation fails, stop the submission process immediately
    if (!titleValid || !contentValid) {
      console.log("Validation failed. Please fill out all required fields.");
      return;
    }

    const newBlog = {
      image: image || noImg,
      blogTitle,
      content,
    };
    // Call the onCreateBlog prop function to add the new blog or update existing one
    onCreateBlog(newBlog, isEditing); // state updated in App content

    // clear the form fields
    setImage(null);
    setBlogTitle("");
    setContent("");

    // Hide the form after submission
    setShowForm(false);
    // Once form submitted set submitted to true
    setSubmitted(true);

    //Display Submission messaage for 2 sec then display the news component
    setTimeout(() => {
      setSubmitted(false);
      onBack();
    }, 2100);
  };

  return (
    <div className="blogs">
      <div className="blog-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blog-right">
        {/* ********************************** New Form Submission Logic ************  */}
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {/* Form Submission Message */}
        {submitted && (
          <div className="success-msg">Post Created Successfully!</div>
        )}
        {/* Form Element  */}
        <div className={`blog-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
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
              className={`title-input ${!validTitle ? "invalid" : "valid"}`}
              value={blogTitle}
              onChange={handleTitleChange}
            />

            <textarea
              className={`text-input ${!validText ? "invalid" : "valid"}`}
              placeholder="Add Text"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button type="submit" className="submit-btn">
              {isEditing ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>

        <button className="blog-close-btn" onClick={onBack}>
          Back
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
