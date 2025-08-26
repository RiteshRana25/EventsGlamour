import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Services.css";

const servicesData = [
  "Wedding",
  "Corporate",
  "Anniversaries",
  "Birthday Parties",
  "Romantic Date",
  "Baby Showers",
  "Proposals",
  "Furniture",
  "AV LIGHT & SOUND",
  "FLOWER ARRANGEMENTS",
];

const Services = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCardClick = (serviceName) => {
    // Navigate to the service-view page, dynamically changing the route based on the service name
    navigate(`/services/${serviceName}`);
  };

  return (
    <div className="services-container">
      <h2>SERVICES</h2>
      <div className="services-grid">
        {servicesData.map((title, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => handleCardClick(title)} // Pass the service name to the click handler
          >
            <img
              src={`https://picsum.photos/seed/${Math.random()}/800/600`}
              alt={title}
            />
            <h3>{title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
