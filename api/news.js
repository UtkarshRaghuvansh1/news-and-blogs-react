// Example: /api/news.js (for Vercel/Netlify Functions)

import fetch from "node-fetch";

export default async (req, res) => {
  //   const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
  const GNEWS_API_KEY = process.env.NEWS_API_KEY; // CORRECTED
  const { category, searchQuery } = req.query;

  let externalURL = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${GNEWS_API_KEY}`;

  if (searchQuery) {
    externalURL = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${GNEWS_API_KEY}`;
  }

  try {
    const response = await fetch(externalURL);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
