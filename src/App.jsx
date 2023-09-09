import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [posts, setPosts] = useState([]);

  const fetchInfo = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const d = await res.json();
    setPosts(d);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="container">
      {posts.length ? (
        <>
          {posts.map((value) => {
            return (
              <Card
                key={value.id}
                name={value.name}
                username={value.username}
                timestamp={value.timestamp}
                text={value.text}
                id={value.id}
                posts={posts}
                setPosts={setPosts}
              />
            );
          })}
        </>
      ) : (
        <div>Loading posts</div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
