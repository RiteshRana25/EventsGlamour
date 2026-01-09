import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ServicesView.css";
import Reveal from "../components/Reveal/Reveal";

const ServiceView = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [overlayIndex, setOverlayIndex] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `https://events-glamour-backend.vercel.app/api/images/${serviceName}`
        );

        setService(res.data);
        console.log("📥 Service data:", res.data);
      } catch (err) {
        console.error("❌ Failed to fetch service:", err);
      }
    };
    fetchService();
  }, [serviceName]);

  if (!service) return <p>Loading service...</p>;

  const galleryImages = [
    service.cover,
    ...service.images.filter((img) => img.url !== service.cover).map(img => img.url),
  ];

  const openOverlay = (index) => setOverlayIndex(index);
  const closeOverlay = () => setOverlayIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) =>
      prev > 0 ? prev - 1 : galleryImages.length - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) =>
      prev < galleryImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="service-view-container">
      <button className="back-navigate" onClick={() => navigate("/services")}>
        ← Back
      </button>

      <h2>{service.name}</h2>

      <div className="service-image-grid">
        {galleryImages.length === 0 ? (
          <p>No images available</p>
        ) : (
          galleryImages.map((imgUrl, idx) => (
            <Reveal key={idx}>
              <img
                src={imgUrl}
                alt={`${service.name} ${idx + 1}`}
                className="service-grid-image"
                loading="lazy"
                onClick={() => openOverlay(idx)}
              />
            </Reveal>
          ))
        )}
      </div>

      {overlayIndex !== null && (
        <div className="overlay" onClick={closeOverlay}>
          <button className="close-btn" onClick={closeOverlay}>
            &times;
          </button>

          <button className="arrow left" onClick={prevImage}>
            &#60;
          </button>

          <img
            src={galleryImages[overlayIndex]}
            alt="Large View"
            className="overlay-image"
          />

          <button className="arrow right" onClick={nextImage}>
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceView;
