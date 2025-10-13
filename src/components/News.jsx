import Calender from "./Calender";
import Weather from "./Weather";
import NewsModal from "./NewsModal";
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

  // 8. Adding Search functionality to the application
  // 8.1 create state to hold user input information from the search bar
  const [searchInput, setSearchInput] = useState("");
  // 8.2 create state to hold the serach query
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Use effect for performing side effect (fetching data from api)
  // [] -> dependency telling react to run once after Intial render of component
  // In our case we need to fetch the data once when component Mounts
  useEffect(() => {
    // 3. Create a Asynchronous function to fetch the data from api
    const fetchNews = async () => {
      try {
        // use thunderclient to test this url in VS code
        // It takes http req and reponse in JSON format
        const API_KEY = "e44e09001f7655277af07cd5512bf391";
        let gnewsURL = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${API_KEY}`;
        //8.3 If there is search query then change the URL
        if (searchQuery) {
          gnewsURL = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${API_KEY}`;
        }
        // 4. Taking response from API
        // await keyword is used to pause the execution of async function until the promise returned by axios.get is resolved
        //axios.get() -> Get request to url to get data from API
        const response = await axios.get(gnewsURL);
        // console.log(response);
        const fetchedNews = response.data.articles;

        //9. if API is returning empty data handle empty search
        // 🧠 If no results, show a message instead of blank UI
        if (fetchedNews.length === 0) {
          setHeadline(null);
          setNews([]);
          return; // Stop further processing
        }
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
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching news:", error);
        }
      }
    };
    fetchNews();
    //7.3 as soon as selected category, fetch news func will be called. React will re-render
    //8.4 Serachquery will be also in dependencies array
  }, [selectedCategory, searchQuery]);
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

  // 8.5 Create a form submission function to handle our serach
  const handleSearch = (evt) => {
    // By default when form is submitted page get refreshed
    // But since this is SPA so we need to prevent this behaviour
    evt.preventDefault();
    //to update the serach query
    // searchInput --> text which user has typed in text box
    setSearchQuery(searchInput);
    // Once user serahced using seacrh query, empty the input box
    setSearchInput("");
  };
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blog</h1>
        <div className="search-bar">
          {/* 8.6 handle form submission */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              // 8.7 Bind input value to search input
              value={searchInput}
              //8.8 When user type in search box setSearchInput() will be called
              // Which will set searchInput value
              onChange={(evt) => setSearchInput(evt.target.value)}
            />
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
          {headline ? (
            // Headline Section
            <div className="headline">
              <img
                src={headline.image || noImg}
                alt={headline.title}
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = noImg; // set fallback image
                }}
              />
              <h2 className="headline-title">
                {headline.title}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          ) : (
            // 9.2 Show message if no results found
            <p className="no-results">No articles found for this search.</p>
          )}
          {/* News Grid Section  */}
          {news.length > 0 ? (
            <>
              <div className="news-grid">
                {news.map((article, index) => {
                  // Key prop -> To uniquely identify each element which helps in efficient rendering of list
                  return (
                    <div key={index} className="news-grid-item">
                      <img
                        src={article.image || noImg}
                        alt={article.title}
                        onError={(e) => {
                          e.target.onerror = null; // prevent infinite loop
                          e.target.src = noImg; // set fallback image
                        }}
                      />
                      <h3>
                        {article.title}
                        <i className="fa-regular fa-bookmark bookmark"></i>
                      </h3>
                    </div>
                  );
                })}
              </div>
              <NewsModal />
            </>
          ) : (
            // 9.4 If no headline (and hence, no news at all)
            <p className="no-results"></p>
          )}
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
