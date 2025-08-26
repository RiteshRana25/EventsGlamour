import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./WeddingDetail.css";

const WeddingDetail = () => {
  const { weddingId } = useParams();

  // Create 15 images
  const images = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/detail${i}/400/300`,
    large: `https://picsum.photos/seed/detail${i}/1200/800`,
  }));

  const [overlayIndex, setOverlayIndex] = useState(null);

  const openOverlay = (index) => setOverlayIndex(index);
  const closeOverlay = (e) => {
    e.stopPropagation();
    setOverlayIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setOverlayIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="wedding-detail-container">
      <h1>{weddingId}</h1>

      <div className="wedding-gallery">
        {images.map((img, index) => (
          <div
            className="wedding-image-container"
            key={img.id}
            onClick={() => openOverlay(index)}
          >
            <img src={img.src} alt={`Wedding ${index + 1}`} />
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
          <img
            className="overlay-image"
            src={images[overlayIndex].large}
            alt="Large View"
          />
          <button className="arrow right" onClick={nextImage}>
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default WeddingDetail;
