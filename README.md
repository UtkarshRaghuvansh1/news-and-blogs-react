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

### Errors For News Components

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

### Errors For Weather Components

## Blog Section

### Functionality

1. CRUD

- Create Blog - Form Component
- Read Blog -> Modal Box
- Update Blog -> Edit button
- Delete Blog -> Delete button

2. HTML for BLOG creation

```jsx
import userImg from "../assets/images/user.jpeg";
export default function Blogs() {
  return (
    <div className="blogs">
      <div className="blog-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blog-right">
        <button className="post-btn">Create New Post</button>
        <button className="blog-close-btn">
          Back
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
```

3. Adding form to blog component

```jsx
import userImg from "../assets/images/user.jpeg";
import "./Blogs.css";
export default function Blogs() {
  return (
    <div className="blogs">
      <div className="blog-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blog-right">
        {/* <button className="post-btn">Create New Post</button> */}

        {/* Form Element  */}
        <div className="blog-right-form">
          <h1>New Post</h1>
          <form>
            <div className="img-upload">
              <label htmlFor="file-upload" className=".file-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              {/* id attribute should match the html for attribute */}
              <input type="file" id="file-upload" />
            </div>
            <input
              type="text"
              placeholder="Add Title (Max 60 character)"
              className="title-input"
            />

            <textarea className="text-input" placeholder="Add Text"></textarea>
            <button type="submit" className="submit-btn"></button>
          </form>
        </div>

        <button className="blog-close-btn">
          Back
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
```

4. Styling Blog Component

```css
.blogs {
  width: 100%;
  height: 100%;
  display: flex;
}
.blog-left {
  width: 50%;
  height: 100%;
  background: linear-gradient(
      rgba(184, 142, 252, 0.3),
      rgba(104, 119, 244, 0.2)
    ), url("../assets/images/bg.jpg");
  background-size: cover;

  border-radius: 1rem 0 0 1rem;
  position: relative;
}
.blog-left img {
  width: 15rem;
  aspect-ratio: 1;
  object-fit: conver;
  border-radius: 50%;
  border: 0.3rem solid #6877f4;
  position: absolute;
  top: 50%;
  right: -7.5%;
  transform: translateY(-50%);
}

.blog-right {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}
.blog-close-btn {
  position: absolute;
  top: 3rem;
  right: 2.5rem;
  background: transparent;
  border: none;
  font-family: "Bebus Neue", sans-serif;
  font-size: 3rem;
  color: #ddd;
  /* Aligment of icon  */
  display: flex;
  align-items: center;
  cursor: pointer;
}
.blog-close-btn i {
  font-size: 3.5rem;
}
.post-btn {
  width: clamp(15rem, 16cqi, 30rem);
  aspect-ratio: 4/1;
  background: linear-gradient(to right, #b88efc, #6877f4);
  border: none;
  border-radius: 5rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.post-btn:active {
  transform: translateY(0.2rem);
}

/* Styling form in blog  */
.blog-right-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5rem;
}

.blog-right-form h1 {
  font-family: "Comfortaa", sans-serif;
  font-size: clamp(2rem, 5cqi, 6rem);
  text-transform: uppercase;
  background: linear-gradient(to right, #b88efc, #6877f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blog-right-form form {
  display: flex;
  flex-direction: column;
  row-gap: 4rem;
}
.file-upload {
  display: flex;
  align-items: center;
  column-gap: 2rem;
  font-size: 2rem;
  color: #bbb;
  cursor: pointer;
}
.file-upload i {
  font-size: 4rem;
  color: #b88efc;
}
.blog-right-form input[type="file"] {
  display: none;
}

.title-input,
.text-input {
  width: clamp(15rem, 25cqi, 45rem);
  background: transparent;
  border: none;
  border-bottom: 0.1rem solid #b88efc;
  padding: 2rem 0;
  color: #ddd;
}
.title-input {
  font-size: 1.8rem;
}
.text-input {
  aspect-ratio: 5/3;
  resize: none;
}
.title-input::placeholder,
.text-input::placeholder {
  font-family: "Comfortaa", sans-serif;
  font-size: 1.3rem;
  color: #b88efc;
  opacity: 0.5;
}
.title-input::placeholder {
  font-size: 1.6rem;
}
.title-input:focus::placeholder,
.text-input:focus::placeholder {
  color: transparent;
}

.submit-btn {
  height: 5rem;
  background: linear-gradient(to left, #b88efc, #6877f4);
  border: none;
  border-radius: 5rem;
  font-size: 1.8rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.submit-btn:active {
  transform: translateY(0.2rem);
}
```

5. Handle Navigation between News and Blog component

- create states and function to show visiblity of news and blog component in App.jsx file

```jsx
const [showNews, setShowNews] = useState(true);
const [showBlogs, setShowBlogs] = useState(false);

// Function to handle show blogs component
const handleShowBlogs = () => {
  setShowNews(false);
  setShowBlogs(true);
};
// Function to handle show news component
const handleBackToNews = () => {
  setShowBlogs(false);
  setShowNews(true);
};
return (
  <div className="container">
    <div className="news-and-blog">
      {showNews && <News onShowBlogs={handleShowBlogs} />}
      {showBlogs && <Blogs onBack={handleBackToNews} />}
    </div>
  </div>
);
```

- In News.jsx take this prop

```jsx
export default function News({ onShowBlogs }) {
  //.....Content
}
```

- When user click on the User div/section then trigger the onShowBlogs, this will show the blog section

```html
<div className="user" onClick="{onShowBlogs}">
  {/* To use image in react we need to import it */}
  <img src="{useImg}" alt="{useImg}" />
  <p>Utkarsh's Blog</p>
</div>
```

- In Blog.jsx file take the prop

```jsx
export default function Blogs({ onBack }) {
  // .....Content
}
```

- When User Click on the Back Navigate back to News Component

```html
<button className="blog-close-btn" onClick="{onBack}">
  Back
  <i className="bx bx-chevron-right"></i>
</button>
```

6. Handle Visibility of form in Blog Component

- Create state for managing the visibility of blog component

```jsx
// State to manage form visibility
// on clicking create new post form should be visible
const [showForm, setShowForm] = useState(false);
```

- Based on state variable add conditional rendering to show and hide the form

```jsx
{
  showForm ? (
    // {/* Form Element  */}
    <div className="blog-right-form">
      <h1>New Post</h1>
      <form>
        <div className="img-upload">
          <label htmlFor="file-upload" className="file-upload">
            <i className="bx bx-upload"></i>Upload Image
          </label>
          {/* id attribute should match the html for attribute */}
          <input type="file" id="file-upload" />
        </div>
        <input
          type="text"
          placeholder="Add Title (Max 60 character)"
          className="title-input"
        />

        <textarea className="text-input" placeholder="Add Text"></textarea>
        <button type="submit" className="submit-btn">
          Submit Button
        </button>
      </form>
    </div>
  ) : (
    <button className="post-btn" onClick={() => setShowForm(true)}>
      Create New Post
    </button>
  );
}
```

7. Layout and Styling of My Blog section in News Component

- Structure of MyBlog section

```html
{/* My Blog section */}
<div className="my-blogs">
  <h1 className="my-blogs-heading">My Blogs</h1>
  <div className="blog-posts">
    <div className="blog-post">
      <img src="{blogImg1}" alt="Post Image" />
      <h3>Lorem ipsum dolor sit.</h3>
      {/* Edit and Delete Button */}
      <div className="post-buttons">
        <button className="edit-post">
          <i className="bx bxs-edit"></i>
        </button>
        <button className="edit-post">
          <i className="bx bxs-x-circle"></i>
        </button>
      </div>
    </div>
    <div className="blog-post">
      <img src="{blogImg2}" alt="Post Image" />
      <h3>Lorem ipsum dolor sit.</h3>
      {/* Edit and Delete Button */}
      <div className="post-buttons">
        <button className="edit-post">
          <i className="bx bxs-edit"></i>
        </button>
        <button className="edit-post">
          <i className="bx bxs-x-circle"></i>
        </button>
      </div>
    </div>
    <div className="blog-post">
      <img src="{blogImg3}" alt="Post Image" />
      <h3>Lorem ipsum dolor sit.</h3>
      {/* Edit and Delete Button */}
      <div className="post-buttons">
        <button className="edit-post">
          <i className="bx bxs-edit"></i>
        </button>
        <button className="edit-post">
          <i className="bx bxs-x-circle"></i>
        </button>
      </div>
    </div>
  </div>
</div>
```

- Styling of My Blog section

```css
/* ************************************ My Blog Section ********************************************* */
/* Styling My Blog section */
.my-blogs {
  width: clamp(20rem, 27cqi, 28%);
  height: 100%;
  background-color: #111214;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  padding-bottom: 2rem;
}
.my-blogs-heading {
  font-family: "Bebus Neue", sans-serif;
  font-size: 3rem;
  color: #ddd;
  letter-spacing: 0.1rem;
  padding: 2rem;
}
.blog-post {
  flex: 0 1 calc(50% - 0.6rem);
  border-radius: 1rem;
  position: relative;
}
.blog-posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.2rem;
}

.blog-posts img {
  width: 100%;
  height: 100%;
  object-fit: conver;
  border-radius: 1rem;
  opacity: 0.5;
}
.blog-post h3 {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0 0 1rem 1rem;
  font-size: 1.6rem;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 1.6rem;
  color: #fff;
  /* Long word will break to new line  */
  overflow-wrap: break-word;
}

.post-buttons {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  column-gap: 2rem;

  /* Hide the button Initially, Show them once user hover  */
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}
/* Hide the button Initially, Show them once user hover  */
.blog-post:hover .post-buttons {
  opacity: 1;
  visibility: visible;
}

.post-buttons button {
  background-color: transparent;
  border: none;
  font-size: 2.5rem;
  color: #fff;
  cursor: pointer;
}
```
