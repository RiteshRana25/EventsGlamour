import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PortfolioDetail.css";

const PortfolioDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [overlayIndex, setOverlayIndex] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/images/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch item:", err);
      }
    };
    fetchItem();
  }, [id]);

  const openOverlay = (index) => setOverlayIndex(index);
  const closeOverlay = (e) => {
    e.stopPropagation();
    setOverlayIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  if (!item) return <p>Loading...</p>;

  // Combine cover and other images (cover first)
  const allImages = [{ url: item.cover, type: "image" }, ...item.images];

  return (
    <div className="portfolio-detail-container">
      <h2 className="portfolio-title">{item.name}</h2>
      {/* <h3 className="portfolio-gallery-title">Gallery</h3> */}

      <div className="portfolio-gallery">
        {allImages.map((media, index) => (
          <div
            className="portfolio-image-container"
            key={index}
            onClick={() => openOverlay(index)}
          >
            {media.type === "video" ? (
              <video
                controls
                className="portfolio-image"
                autoPlay
                muted
                playsInline
                loop
              >
                <source src={media.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={media.url}
                alt={`media-${index}`}
                className="portfolio-image"
              />
            )}
          </div>
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
            />
          ) : (
            <img
              className="overlay-image"
              src={allImages[overlayIndex].url}
              alt="Large View"
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
