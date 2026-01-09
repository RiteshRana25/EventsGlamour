import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Services.css";
import Reveal from "../components/Reveal/Reveal";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://events-glamour-backend.vercel.app/api/images');

        const serviceItems = res.data.filter(item => item.type === "Service");
        setServices(serviceItems);

        console.log("📥 Services from MongoDB:", serviceItems);
      } catch (err) {
        console.error("❌ Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  const handleCardClick = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      navigate(`/services/${id}`);
    }, 300);
  };

  return (
    <div className="services-container">
      <h2>Comprehensive Event Services – Under One Roof</h2>

      <div className="services-grid">
        {services.map((service) => (
          <Reveal key={service.id}>
            <div
              className="service-card"
              onClick={() => handleCardClick(service.id)}
            >
              <img
                src={service.cover}
                alt={service.name}
                loading="lazy"
              />
              <h3>{service.name}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Services;
