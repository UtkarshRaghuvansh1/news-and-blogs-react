import { useState, useEffect } from "react";

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
  console.log("useFecth1 working..1");
  // useEffect()-> It runs automatically when url changes — so each time a new city is searched, it triggers an API call.
  useEffect(() => {
    // 4️⃣ Skip API call if no URL is passed
    if (!url) return;
    setLoading(true); // reset loading before each request
    setError(null); // reset error before each request
    console.log("useFecth1 working..2");
    const fetchData = async () => {
      try {
        // 5️⃣ Fetch data using native fetch API
        console.log("useFecth1 working..3");
        const response = await fetch(url);
        console.log("useFecth -->", response);
        // 6️⃣ Handle HTTP errors manually
        if (!response.ok) {
          if (response.status === 404) {
            setData({ notFound: true });
          } else {
            throw new Error(`HTTP Error: ${response.status}`);
          }
        } else {
          // 7️⃣ Convert JSON response into JS object
          const res = await response.json();
          // Here data is straight forword
          setData(res);
        }
      } catch (error) {
        setError(error);
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
