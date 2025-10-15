import demoImg from "../assets/images/demo.jpg";
import "./NewsModal.css";
const NewsModal = ({ show, article, onClose }) => {
  // 1. Control rendering of the modal component
  if (!show) return null;

  console.log("Article Modal", article);

  // 4.1 Function to format date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A"; // Handle missing dates

    const date = new Date(isoString);

    // Format options for date and time
    const options = {
      weekday: "short",
      year: "numeric", //2025
      month: "short", // jan, feb
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 2. Handle onclose function from Parent Component  */}
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>

        {/* <img className="modal-image" src={demoImg} alt="Modal Image" /> */}
        {/* 3. Updating Article content(title, image, source, description) of modal box */}
        {/* 3.1 Apply Conditional rendering  */}
        {article && (
          <>
            <img
              className="modal-image"
              src={article.image}
              alt={article.title}
            />

            {/* <h2 className="modal-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          adipisci.
        </h2> */}
            <h2 className="modal-title">{article.title}</h2>

            <p className="modal-source">Source : {article.source.name}</p>
            {/* 4. Date formating function  */}
            <p className="modal-date">
              Date : {formatDate(article.publishedAt)}
            </p>

            <p className="modal-content-text">{article.description}</p>
            {/* Read More button  */}
            {/* 5. Updating read more button  */}
            <a
              href={article.url}
              className="read-more-link"
              target="_blank" //. open link in new tab
              rel="noopener noreferrer" // As for the rel with these values, it is a security feature that prevents the new page from accessing
              // the Window.open property and ensures that the new page runs in a separate process.
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
