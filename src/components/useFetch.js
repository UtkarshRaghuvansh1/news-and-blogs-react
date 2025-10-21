import { useState, useEffect } from "react";

// Cache the data so that when user select previusly visited category data is persisted instead fetching new data
const apiCache = {};
/**
 * Custom hook to fetch data from a given API URL
 * Handles loading, success, and error states
 */
export default function useFetch(url) {
  // Define States
  // 1️⃣ Manage fetched data
  const [data, setData] = useState(null);
  // 2️⃣ Manage loading state
  const [loading, setLoading] = useState(true);
  // 3️⃣ Manage error state
  const [error, setError] = useState(null);
  // useEffect()-> It runs automatically when url changes — so each time a new city is searched, it triggers an API call.
  useEffect(() => {
    // 4️⃣ Skip API call if no URL is passed
    if (!url) return;

    // If data is present in the cache Use that data to set the data
    if (apiCache[url]) {
      console.log("Using Cached Data", apiCache[url]);
      setData(apiCache[url]);
      setLoading(false);
      return;
    }

    setLoading(true); // reset loading before each request
    setError(null); // reset error before each request

    const fetchData = async () => {
      try {
        console.log("Fetching New Data...");
        // 5️⃣ Fetch data using native fetch API
        const response = await fetch(url);
        // Handle HTTP errors
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "Oops! You’ve reached the daily limit for fetching news. Please try again tomorrow."
            );
          } else if (response.status === 429) {
            throw new Error(
              "Too many requests! Please wait a few moments before trying again."
            );
          } else if (response.status === 404) {
            throw new Error(
              "Sorry, we couldn’t find the news you’re looking for."
            );
          } else {
            throw new Error(`HTTP Error: ${response.status}`);
          }
        }
        // 7️⃣ Convert JSON response into JS object
        const res = await response.json();
        // Push the new data in the cache object
        apiCache[url] = res;
        setData(res);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message); // Display actual HTTP error
      } finally {
        // 8️⃣ Stop loading after response/error
        setLoading(false);
      }
    };

    // 9️⃣ Call the async function
    fetchData();
  }, [url]); // 10️⃣ Re-run whenever the URL changes

  // 11️⃣ Return all states to use in component
  return { data, loading, error };
}
