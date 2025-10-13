import "./Weather.css";

export default function Weather() {
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">Banglore </div>
        </div>
        <div className="search-location">
          <input type="text" placeholder="Enter Location" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="weather-data">
          {/* Use library to show icon - box icon */}
          <i className="bx  bxs-sun"></i>
          <div className="weather-type">Clear</div>
          <div className="temp">28</div>
        </div>
      </div>
    </div>
  );
}
