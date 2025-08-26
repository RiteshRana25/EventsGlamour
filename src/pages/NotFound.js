import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-overlay">
        <h1>Oops! The celebration you're looking for isn't happening here.</h1>
        <p>But don’t worry, the party's still going on elsewhere 🎉</p>
        <div className="notfound-buttons">
          <button onClick={() => navigate("/")}>Go Back Home</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
