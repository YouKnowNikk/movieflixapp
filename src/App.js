import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import "./App.css";
import logoImage from "./Images/download.png";

function App() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page" style={{}}>
      {showImage ? (
        <div
          className="welcome-image"
          style={{
            position:'absolute',top:'50%',left:'50%',transform:"translate(-50%, -50%)"
          }}
        >
          <img src={logoImage} alt="Welcome" />
        </div>
      ) : (
        <div>
          <MovieList />
          <footer>
            <p style={{ textAlign: "center" }}>
              &copy; 2023 Movie List App. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;


