import Calender from "./Calender";
import Weather from "./Weather";
import "./News.css";
import useImg from "../assets/images/user.jpeg";
import techImg from "../assets/images/tech.jpg";
import sportsImg from "../assets/images/sports.jpg";
import scienceImg from "../assets/images/science.jpg";
import worldImg from "../assets/images/world.jpg";
import healthImg from "../assets/images/health.jpg";
import nationImg from "../assets/images/nation.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function News() {
  // 1. State Declaration
  //State for storing Current value of headline data, Initially null
  const [headline, setHeadline] = useState(null);
  // State for storing value of current news data Initially []
  // This state will be use to store list of news article fetched from Gnews API so to store them in array
  const [news, setNews] = useState([]);

  // 2. Use effect for performing side effect (fetching data from api)
  // [] -> dependency telling react to run once after Intial render of component
  // In our case we need to fetch the data once when component Mounts
  useEffect(() => {
    // 3. Create a Asynchronous function to fetch the data from api
    const fetchNews = async () => {
      const gnewsURL =
        "https://gnews.io/api/v4/top-headlines?category=general&apikey=e44e09001f7655277af07cd5512bf391";

      // use thunderclient to test this url in VS code
      // It takes http req and reponse in JSON format
    };
  }, []);

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blog</h1>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="Search News..." />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        {/* Navbar Component  */}
        <div className="navbar">
          <div className="user">
            {/* To use image in react we need to import it */}
            <img src={useImg} alt={useImg} />
            <p>Utkarsh's Blog</p>
          </div>
          <div className="categories">
            <h1 className="nav-heading">Categories </h1>
            <div className="nav-links">
              <a href="" className="nav-link">
                General
              </a>
              <a href="#" className="nav-link">
                World
              </a>
              <a href="#" className="nav-link">
                Business
              </a>
              <a href="#" className="nav-link">
                Technology
              </a>
              <a href="#" className="nav-link">
                {" "}
                Entertainment
              </a>
              <a href="#" className="nav-link">
                Sports
              </a>
              <a href="#" className="nav-link">
                Science
              </a>
              <a href="#" className="nav-link">
                Health
              </a>
              <a href="#" className="nav-link">
                Nation
              </a>
              <a href="" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </div>
        </div>
        {/* News Component -> headline + news grid  */}
        <div className="news-section">
          <div className="headline">
            <img src={techImg} alt="Headline Image" />
            <h2 className="headline-title">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat,
              beatae? Lorem ipsum dolor sit amet.
              {/* Bookmark  */}
              <i className="fa-regular fa-bookmark bookmark"></i>
            </h2>
          </div>
          <div className="news-grid">
            <div className="news-grid-item">
              <img src={techImg} alt="Tech Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={sportsImg} alt="Sports Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={scienceImg} alt="Science Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={worldImg} alt="World Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={healthImg} alt="" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
            <div className="news-grid-item">
              <img src={nationImg} alt="Nation Image" />
              <h3>
                Lorem ipsum dolor sit amet.
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h3>
            </div>
          </div>
        </div>
        {/* My Blog section  */}
        <div className="my-blogs">My Blogs</div>

        {/* Weather and Calender Component  */}
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      {/* Footer  */}
      <div className="news-footer">Footer</div>
    </div>
  );
}
