import demoImg from "../assets/images/demo.jpg";
import "./NewsModal.css";
import { useState, useEffect } from "react";
// import axios from "axios";

const NewsModal = ({ show, article, onClose }) => {
  // AI Summary states
  const [summary, setSummary] = useState("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  // Reset summary state when article changes or modal closes
  useEffect(() => {
    // Reset state when modal is closed
    if (!show) {
      setSummary("");
      setIsLoadingSummary(false);
      setSummaryError("");
      setShowSummary(false);
    }
  }, [show]);

  // Reset summary state when article changes
  useEffect(() => {
    if (article) {
      setSummary("");
      setIsLoadingSummary(false);
      setSummaryError("");
      setShowSummary(false);
    }
  }, [article?.id, article?.title]); // Reset when article ID or title changes

  // 1. Control rendering of the modal component
  if (!show) return null;

  // console.log("Article Modal", article);
  // console.log("Available article fields:", article ? Object.keys(article) : "No article");

  // AI Summarization function
  const generateSummary = async () => {
    if (!article) {
      setSummaryError("No article content available for summarization");
      return;
    }

    setIsLoadingSummary(true);
    setSummaryError("");

    try {
      // Simulate AI processing delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Combine multiple fields for better summarization
      const title = article.title || "";
      const description = article.description || "";
      const content = article.content || "";

      // console.log("Summarization content:", {
      //   title: title.substring(0, 100) + "...",
      //   description: description.substring(0, 100) + "...",
      //   content: content.substring(0, 500) + "...",
      //   hasContent: !!content,
      //   hasDescription: !!description,
      // });

      // Create comprehensive text by combining available fields
      let fullText = "";
      if (title) fullText += title + ". ";
      if (description) fullText += description + " ";
      if (content && content !== description) fullText += content + " ";

      console.log("Full text length:", fullText.length);
      console.log("Full text preview:", fullText);

      // If no content available, show error
      if (!fullText.trim()) {
        setSummaryError("No article content available for summarization");
        return;
      }

      const sentences = fullText
        .split(/[.!?]+/)
        .filter((sentence) => sentence.trim().length > 20);

      console.log("Extracted sentences for summarization:", sentences);
      console.log(
        "Extracted sentences for summarization:",
        sentences[0].length
      );

      if (sentences.length <= 2) {
        setSummary([fullText]);
        setShowSummary(true);
      } else {
        // Advanced summarization algorithm
        const wordCount = fullText.split(" ").length;
        const targetLength = Math.max(50, Math.min(150, wordCount * 0.3)); // 30% of original length

        // Score sentences by importance (length, position, keywords)
        const scoredSentences = sentences.map((sentence, index) => {
          const words = sentence.trim().split(" ");
          const lengthScore = words.length;
          const positionScore = index === 0 ? 2 : index < 3 ? 1.5 : 1; // First sentences are more important
          const keywordScore = [
            "important",
            "significant",
            "major",
            "key",
            "main",
            "primary",
            "essential",
          ].reduce(
            (score, keyword) =>
              score + (sentence.toLowerCase().includes(keyword) ? 2 : 0),
            0
          );

          return {
            sentence: sentence.trim(),
            score: lengthScore * positionScore + keywordScore,
            index,
          };
        });

        // Sort by score and select top sentences
        const selectedSentences = scoredSentences
          .sort((a, b) => b.score - a.score)
          .slice(0, Math.min(3, Math.ceil(sentences.length / 2)));

        // Reorder to maintain logical flow
        const orderedSentences = selectedSentences
          .sort((a, b) => a.index - b.index)
          .map((s) => s.sentence);

        // Convert to bullet points format
        const bulletPoints = orderedSentences
          .map((sentence) => sentence.trim())
          .filter((s) => s.length > 0);
        setSummary(bulletPoints);
        setShowSummary(true);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummaryError("Failed to generate summary. Please try again.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

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

            {/* Summarize Button */}
            {!showSummary && (
              <div className="summarize-section">
                <button
                  className="summarize-btn"
                  onClick={generateSummary}
                  disabled={isLoadingSummary}
                >
                  {isLoadingSummary ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>{" "}
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-robot"></i> Summarize
                    </>
                  )}
                </button>
              </div>
            )}

            {/* AI Summary Section */}
            {showSummary && (
              <div className="ai-summary-section">
                <h3 className="summary-title">
                  <i className="fa-solid fa-robot"></i> Summary
                </h3>

                {summaryError && (
                  <div className="summary-error">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    {summaryError}
                  </div>
                )}

                {summary && Array.isArray(summary) && (
                  <div className="summary-content">
                    <ul className="summary-bullets">
                      {summary.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="modal-buttons">
              {showSummary && (
                <button
                  className="back-btn"
                  onClick={() => setShowSummary(false)}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>
              )}

              <a
                href={article.url}
                className="read-more-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
