import { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  // 1. using open weather map api
  // 1.1 Purpose to this state to store the weather data fetched from Open Weather Map API
  const [data, setData] = useState({});
  // 1.2 Serach function -> resposible of fetching weather data from API
  const search = async () => {
    try {
      const API_KEY = "0857bdfbf9822bcb5f4d0f481d5e160a";
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=Varanasi&units=Metric&appid=${API_KEY}`;

      // 1.3 http get request using axios
      const response = await axios.get(URL);
      console.log("response", response);

      // 1.4 update the data/state after fetching the response
      setData(response.data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

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
