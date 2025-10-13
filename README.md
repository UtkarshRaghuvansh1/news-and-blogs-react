# News and Blogs

## Overview

- The News & Blogs Website is a modern, full-featured web application built with React that combines real-time global news updates with personal blogging capabilities. The platform provides users with an engaging space to read, explore, and create content — all within a sleek, responsive, and dark-themed interface.

- The home page presents a visually rich dashboard featuring:

  - Latest News Section: A dynamic feed displaying top headlines and category-based articles fetched from live APIs.

  - Featured Article: A large, prominent story designed to capture user attention.

  - Category Sidebar: Easy navigation across topics like Business, Technology, Sports, Health, and more.

  - My Blogs Section: Personalized space where users can create, edit, and view their own blog posts.

  - Weather & Calendar Widgets: Real-time weather updates and an interactive calendar for improved user engagement.

- Users can also search for news, bookmark favorite articles, and filter content based on interest — ensuring a personalized reading experience.

- Designed with a focus on usability, interactivity, and aesthetics, the News & Blogs platform offers a seamless blend of news consumption and content creation, making it both informative and social.

## Design and Layout for the website

![alt text](image.png)

## System Components

- NewsFeed: Displays list/grid of articles.
- CategorySidebar: List of categories (General, World, Tech, etc.).
- NewsCard: Individual article card (image, title, short desc, bookmark icon).
- SearchBar: For searching specific news titles.
- WeatherWidget: Shows current weather (e.g., Tbilisi - 30°C Clear).
- CalendarWidget: Displays date and highlights current day.
- MyBlogsSection: Displays personal blog posts (user-created content).

## Core Objective

- The News section should:
  - Fetch and display categorized news articles.
  - Allow users to search, filter by category, and bookmark.
  - Show trending or recent articles prominently.
  - Support dynamic updates (new articles, weather, date, etc.).

Features & API Usage

- HTTP Client: Using Axios to make HTTP requests from React components.

- Promise-based, simple syntax, and handles errors easily.

- Installed via:

```shell
npm install axios
```

- News API: Using GNews API to fetch latest news articles.

- Provides global news headlines and articles.

- Requires an API key (free plan available).

- Official website: https://gnews.io

### Errors

1. Uncaught Error: Objects are not valid as a React child (found: object with keys {id, title, description, content, url, image, publishedAt, lang, source}). If you meant to render a collection of children, use an array instead.

- Conditional Rendering
- While fetching data from api and display the headline
- Fix :
  - You only render when headline exists (headline && ... avoids null errors).
  - You show proper fields like image, title, and description.

```js
{
  headline && (
    <div className="headline">
      <img src={headline.image} alt={headline.title} />
      <h2 className="headline-title">
        {headline.title}
        <i className="fa-regular fa-bookmark bookmark"></i>
      </h2>
      <p>{headline.description}</p>
    </div>
  );
}
```

2. Even after on clicking category it was not updating so update the api url to handle dynamic selectedCategory

```js
const gnewsURL = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=e44e09001f7655277af07cd5512bf391`;
```

3. Handling Missing or Broken Images and Empty News Results

- To make the news feed UI more robust, I implemented several checks and fallbacks for cases where the GNews API returns incomplete or invalid data.

- Problem :

  - The GNews API sometimes returns:
    - Articles without images (image: null)
    - Invalid/broken image URLs
    - Empty results for a given category or search query

- Solution :

  - 1. Fallback Image Handling

    - Used a local placeholder image noImg whenever an article had no valid image field.
    - Added an onError handler to <img> tags to replace broken or invalid URLs dynamically:

    ```js
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = noImg;
    }}

    ```

    - This ensures that every article always displays a valid image, even if the original URL fails.

  - 2.  Default Image Assignment in API Response

        - After fetching data, each article’s image field is checked.
        - If missing, replaced immediately with noImg before setting state:

        ```js
        const cleanedNews = fetchedNews.map((article) => ({
          ...article,
          image: article.image || noImg,
        }));
        ```

  - 3. Graceful Handling for Empty Results

    - If the API returns zero articles:
      - Headline is set to null.
      - News grid is cleared.
      - A message "No articles found for this search." is displayed to the user.

  - 4. Conditional rendering used for:

    - Showing the headline only if it exists.
    - Showing the news grid only when news.length > 0.
    - Displaying a fallback message otherwise.

  - 5.  Improved User Experience

    - Prevents layout breaks or console errors caused by undefined values.
    - Guarantees a consistent design, even with incomplete API responses.

      ```js
      <img
        src={article.image || noImg}
        alt={article.title || "No title"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = noImg;
        }}
      />
      ```

4. Handling GNews API Limits and Errors

- To ensure a smooth user experience even when the API fails or limits are reached, I added detailed error handling:

  - 403 Error (Forbidden) →

    - → Shown message: “⚠️ Daily API request limit reached or invalid API key. Please try again later.”

  - 429 Error (Too Many Requests) →

    - → Shown message: “🚫 Too many requests! Please wait a moment before trying again.”

  - Network Failure →

    - → Shown message: “⚠️ Network error. Please check your connection.”

  - Empty Results →
    - → Shown message: “No articles found for this search.”
