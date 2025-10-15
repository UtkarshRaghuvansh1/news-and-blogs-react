import demoImg from "../assets/images/demo.jpg";
import "./NewsModal.css";
const NewsModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark"></i>
        </span>

        <img className="modal-image" src={demoImg} alt="Modal Image" />

        <h2 className="modal-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          adipisci.
        </h2>

        <p className="modal-source">Source : Hello World</p>

        <p className="modal-date">Jun 24</p>

        <p className="modal-content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          facere repudiandae fugit nulla molestias, nesciunt recusandae totam
          doloremque quidem, magnam quos. Itaque fugit autem vero quod impedit,
          nisi aliquam tempora?
        </p>

        {/* Read More button  */}
        <a href="#" className="read-more-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsModal;
