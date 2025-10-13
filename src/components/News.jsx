import Calender from "./Calender";
import Weather from "./Weather";
import "./News.css";
import useImg from "../assets/images/user.jpeg";
// import techImg from "../assets/images/tech.jpg";
// import sportsImg from "../assets/images/sports.jpg";
// import scienceImg from "../assets/images/science.jpg";
// import worldImg from "../assets/images/world.jpg";
// import healthImg from "../assets/images/health.jpg";
// import nationImg from "../assets/images/nation.jpg";
import noImg from "../assets/images/no-img.png";
import axios from "axios";
import { useEffect, useState } from "react";

// 7. Fetching news by categories
const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];
export default function News() {
  // 1. State Declaration
  //State for storing Current value of headline data, Initially null
  const [headline, setHeadline] = useState(null);
  // State for storing value of current news data Initially []
  // This state will be use to store list of news article fetched from Gnews API so to store them in array
  const [news, setNews] = useState([]);

  // 7.2 New state to store/keep track of selected categories
  const [selectedCategory, setSelectedCategory] = useState("general");

  // 2. Use effect for performing side effect (fetching data from api)
  // [] -> dependency telling react to run once after Intial render of component
  // In our case we need to fetch the data once when component Mounts
  useEffect(() => {
    // 3. Create a Asynchronous function to fetch the data from api
    const fetchNews = async () => {
      // use thunderclient to test this url in VS code
      // It takes http req and reponse in JSON format
      const gnewsURL = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=e44e09001f7655277af07cd5512bf391`;

      // 4. Taking response from API
      // await keyword is used to pause the execution of async function until the promise returned by axios.get is resolved
      //axios.get() -> Get request to url to get data from API
      const response = await axios.get(gnewsURL);
      // console.log(response);
      const fetchedNews = response.data.articles;
      // console.log(fetchedNews);
      // 6. If there is no image in article.image so replace with default no image
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      // 5. Update the headline news
      setHeadline(fetchedNews[0]);
      const slicedNews = fetchedNews.slice(1, 7);
      // console.log("Fetched 6 articles:", slicedNews);
      setNews(slicedNews);
    };
    fetchNews();
  }, [selectedCategory]); //7.3 as soon as selected category, fetch news func will be called. React will re-render

  // 7.4 Function to update the category
  // evt -> event object which is automatically passed when even occures
  // category -> Category on which user cliked on
  const handleCategoryClick = (evt, category) => {
    // Normally when we click on a link, default behaviour of the browser is to navigate to the URL specified
    // in href attribute, Since our category link are not meant to navigate to new page but instead update the content dynamically
    // That is why evt.preventDefault --> to prevent this default behaviour

    evt.preventDefault();
    // this will trigger re-render of the component
    // Also refetch the article based on selected category
    setSelectedCategory(category);
  };
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
              {/* 7.5 onclick event to handle the category selection  */}
              {categories.map((category) => {
                return (
                  <a
                    href=""
                    className="nav-link"
                    // identify each element uniquely
                    key={category}
                    onClick={(evt) => handleCategoryClick(evt, category)}
                  >
                    {/* Display category name dynamically */}
                    {category}
                  </a>
                );
              })}

              <a href="" className="nav-link">
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </div>
        </div>
        {/* News Component -> headline + news grid  */}
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => {
              // Key prop -> To uniquely identify each element which helps in efficient rendering of list
              return (
                <div key={index} className="news-grid-item">
                  <img src={article.image || noImg} alt={article.title} />
                  <h3>
                    {article.title}
                    <i className="fa-regular fa-bookmark bookmark"></i>
                  </h3>
                </div>
              );
            })}
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
