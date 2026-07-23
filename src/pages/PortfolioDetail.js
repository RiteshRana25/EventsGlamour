import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./PortfolioDetail.css";
import NotFound from "./NotFound";
import Reveal from "../components/Reveal/Reveal";
import SEO from "../components/SEO/SEO";
import { cldThumb, cldLarge } from "../utils/cloudinary";

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
      <SEO
        title={`${item.name} | Events Glamour Portfolio`}
        description={`View ${item.name} — a luxury event showcase by Events Glamour, Dubai's event management specialists.`}
        path={`/portfolio/${id}`}
        image={item.cover || undefined}
      />
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
                  src={cldThumb(media.url)}
                  alt={`${item.name} gallery image ${index + 1}`}
                  className="portfolio-image"
                  loading="lazy"
                  decoding="async"
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
              src={cldLarge(allImages[overlayIndex].url)}
              alt={`${item.name} — enlarged gallery view`}
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
