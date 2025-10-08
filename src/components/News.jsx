import Calender from "./Calender";
import Weather from "./Weather";
import "./News.css";
export default function News() {
  return (
    <div className="news">
      <header className="news-header">News Header</header>
      <div className="news-content">
        {/* Navbar Component  */}
        <div className="navbar">
          <div className="user">User</div>
          <div className="categories">Categories</div>
        </div>
        {/* News Component -> headline + news grid  */}
        <div className="news-section">
          <div className="headline">Headline</div>
          <div className="news-grid">News Grid</div>
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
