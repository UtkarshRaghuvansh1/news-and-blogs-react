// Example: /api/weather.js (for Vercel/Netlify Functions)

import fetch from "node-fetch";

export default async (req, res) => {
  // Key is accessed securely from the hosting environment
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  // --- ADDED CHECK ---
  if (!OPENWEATHER_API_KEY) {
    return res
      .status(500)
      .json({ error: "Server misconfiguration: Weather API key missing." });
  }

  // Extract parameters (like 'q' for location) from the frontend request
  const { location, units = "Metric" } = req.query;

  if (!location) {
    return res
      .status(400)
      .json({ error: "Location query parameter is required" });
  }

  try {
    const externalURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${OPENWEATHER_API_KEY}`;

    // Server-side request to external API (No CORS issue here)
    const response = await fetch(externalURL);
    const data = await response.json();

    // The proxy can handle the 404 error logic from the original code
    if (data.cod === "404") {
      return res.status(404).json({ notFound: true, message: data.message });
    }

    // Send the final data back to the React frontend
    res.status(200).json(data);
    console.log("Proxy success:", data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
