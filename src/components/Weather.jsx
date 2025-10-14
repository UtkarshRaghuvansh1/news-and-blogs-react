import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
const API_KEY = "0857bdfbf9822bcb5f4d0f481d5e160a";
export default function Weather() {
  // 1. using open weather map api
  // 1.1 Purpose to this state to store the weather data fetched from Open Weather Map API
  const [data, setData] = useState({});
  // 2 Creating state to manage dynamic location
  // User type the location, will be stored in location
  const [location, setLocation] = useState("");

  // 3 Dynamically display weather data fetched from open weather api
  // 6 when no data found then display the messages

  // 5. Default location that will render when application loads
  // for this I will use use effect hook
  // dependecies will be empty -> run the side effects only once when page loads
  useEffect(() => {
    const fetchDefaultLocation = async () => {
      // 5.1 set default location
      const defautLocation = "Bengaluru";
      // 5.2 Modify Url
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${defautLocation}&units=Metric&appid=${API_KEY}`;

      // 5.3 http request to fecth the information
      const defaultResponse = await axios.get(URL);
      // 5.4 Update state of data for location
      setData(defaultResponse.data);
    };
    // 5.5 Call the function
    fetchDefaultLocation();
  }, []);

  // 1.2 Serach function -> resposible of fetching weather data from API
  const search = async () => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${API_KEY}`;

      // 1.3 http get request using axios
      const response = await axios.get(URL);
      // console.log("response", response);
      // 6.2 When API response is not success
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        // 1.4 update the data/state after fetching the response
        setData(response.data);
        // 2.4 set user location to '' once user already serched the location
        // this will help user to enter new location
        // Enchance UI by providing immediate Visual feedback and search was succesfull
        setLocation("");
        console.log("data", data);
      }
    } catch (error) {
      // 6.3 Set data based on error
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  // 2.2 function to update the location whatever user types
  // This function will be called every time user types in the input field
  const handleInputChange = (evt) => {
    console.log("Click works");
    evt.preventDefault();
    setLocation(evt.target.value);
  };

  //4. Function which will handle which icon to be displayed
  const getWeatherIcon = (weatherType) => {
    console.log("Weather Type", weatherType);
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-thunderstorm"></i>;
      case "Haze":
        return <i className="bx bxs-cloud"></i>;
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-sun"></i>;
    }
  };
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          {/* 3.1 dynamically updating city based on data fetched  */}
          <div className="location">{data.name} </div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            // 2.3 set value for input entered and handle event change
            value={location}
            // Input field value will be controlled by react state
            onChange={handleInputChange}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
        {/* Weather Data  */}

        {data.notFound ? (
          <div className="not-found">Not Found ☹️</div>
        ) : (
          <div className="weather-data">
            {/* Use library to show icon - box icon */}
            {/* 4.2 dynamically call the function to display the icon  */}
            {data.weather &&
              data.weather[0] &&
              getWeatherIcon(data.weather[0].main)}
            {/* 3.2 Dynamically update the type section 
          Added conditional rendering if data.weather exist then show else null 
          if data not available the display null*/}
            <div className="weather-type">
              {data.weather ? data.weather[0].main : null}
            </div>
            {/*3.3 Dynamically update the temprature data if it is present   */}
            <div className="temp">
              {data.main ? `${Math.floor(data.main.temp)} °C` : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
