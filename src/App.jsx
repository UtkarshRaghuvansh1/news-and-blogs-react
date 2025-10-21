import News from "./components/News";
import Blogs from "./components/Blogs";
function App() {
  return (
    <div className="container">
      <div className="news-and-blog">
        {/* <News /> */}
        <Blogs />
      </div>
    </div>
  );
}

export default App;
