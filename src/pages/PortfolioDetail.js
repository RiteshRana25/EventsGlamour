import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./PortfolioDetail.css";
import NotFound from "./NotFound";
import Reveal from "../components/Reveal/Reveal";


const PortfolioDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [overlayIndex, setOverlayIndex] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `https://events-glamour-backend.vercel.app/api/images/${id}`
        );
        if (!res.data) {
          setNotFound(true);
          return;
        }
        setItem(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch item:", err);
        setNotFound(true);
      }
    };
    fetchItem();
  }, [id]);

  if (notFound) return <NotFound />;
  if (!item) return <p>Loading...</p>;

const allImages = [
  { url: item.cover, type: "image" },
  ...item.images.filter(img => img.url !== item.cover)
];

  const openOverlay = (index) => setOverlayIndex(index);
  const closeOverlay = (e) => {
    e.stopPropagation();
    setOverlayIndex(null);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) =>
      prev > 0 ? prev - 1 : allImages.length - 1
    );
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) =>
      prev < allImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="portfolio-detail-container">
      <button
        className="back-navigate"
        onClick={() => navigate("/portfolio")}
      >
        ← Back
      </button>

      <h2 className="portfolio-title">{item.name}</h2>

      <div className="portfolio-gallery">
        {allImages.map((media, index) => (
          <Reveal key={index} offset={10}>
            <div
              className="portfolio-image-container"
              onClick={() => openOverlay(index)}
            >
              {media.type === "video" ? (
                <video
                  className="portfolio-image"
                  src={media.url}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={media.url}
                  alt={`media-${index}`}
                  className="portfolio-image"
                  loading="lazy"
                />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {overlayIndex !== null && (
        <div className="overlay" onClick={closeOverlay}>
          <button className="close-btn" onClick={closeOverlay}>
            &times;
          </button>
          <button className="arrow left" onClick={prevImage}>
            &#60;
          </button>
          {allImages[overlayIndex].type === "video" ? (
            <video
              className="overlay-image"
              src={allImages[overlayIndex].url}
              autoPlay
              muted
              playsInline
              controls
            />
          ) : (
            <img
              className="overlay-image"
              src={allImages[overlayIndex].url}
              alt="Large View"
              loading="lazy"
            />
          )}
          <button className="arrow right" onClick={nextImage}>
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetail;
