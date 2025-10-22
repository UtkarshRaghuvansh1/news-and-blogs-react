import demoImg from "../assets/images/demo.jpg";
import "./BlogsModal.css";

const BlogsModal = ({ show, blog, onClose }) => {
  if (!show) {
    return null;
  }

  console.log(blog.title);
  console.log(blog.content);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.blogTitle}
            className="blogs-modal-image"
          />
        )}

        <h2 className="blogs-modal-title">{blog.blogTitle}</h2>
        <p className="blog-post-content">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsModal;
