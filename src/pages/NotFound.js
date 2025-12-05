import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-overlay">
        <h1>The event you’re searching for isn’t in our portfolio.</h1>
        <p>
          But we’ve hosted many unforgettable moments. Return to the homepage to
          check them out.
        </p>
        <div className="notfound-buttons">
          <button onClick={() => navigate("/")}>Go Back Home</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
