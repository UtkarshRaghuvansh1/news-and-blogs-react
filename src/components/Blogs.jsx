import userImg from "../assets/images/user.jpeg";
import "./Blogs.css";
export default function Blogs() {
  return (
    <div className="blogs">
      <div className="blog-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blog-right">
        {/* <button className="post-btn">Create New Post</button> */}

        {/* Form Element  */}
        <div className="blog-right-form">
          <h1>New Post</h1>
          <form>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              {/* id attribute should match the html for attribute */}
              <input type="file" id="file-upload" />
            </div>
            <input
              type="text"
              placeholder="Add Title (Max 60 character)"
              className="title-input"
            />

            <textarea className="text-input" placeholder="Add Text"></textarea>
            <button type="submit" className="submit-btn">
              Submit Button
            </button>
          </form>
        </div>

        <button className="blog-close-btn">
          Back
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
