import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO/SEO";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <SEO
        title="Page Not Found | Events Glamour"
        description="The page you requested could not be found. Return to Events Glamour to explore our luxury event portfolio in Dubai."
        path="/404"
        noindex
      />
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
