import React, { useEffect, useState } from "react";
import "./About.css";
import Reveal from "../components/Reveal/Reveal";
import SEO from "../components/SEO/SEO";
import Marquee from "../components/Marquee/Marquee";
import axios from "axios";
import { cldHero, cldThumb } from "../utils/cloudinary";
import API_URL from "../config";

const About = () => {
  const [about1, setAbout1] = useState([]);
  const [about2, setAbout2] = useState([]);

  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/images`
        );

        const data = res.data.filter(
          (item) => item.type?.toLowerCase() === "about"
        );

        const about1Data = data.find(
          (item) => item.name.toLowerCase() === "about1"
        );
        const about2Data = data.find(
          (item) => item.name.toLowerCase() === "about2"
        );

        if (about1Data) {
          setAbout1([
            about1Data.cover,
            ...about1Data.images.map((img) => img.url),
          ]);
        }

        if (about2Data) {
          setAbout2([
            about2Data.cover,
            ...about2Data.images.map((img) => img.url),
          ]);
        }

        console.log("📥 About1:", about1Data);
        console.log("📥 About2:", about2Data);
      } catch (err) {
        console.error("❌ Failed to fetch About images:", err);
      }
    };

    fetchAboutImages();
  }, []);

  const headerImages = [
    {
      src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764154523/IMG_0848_v6egib.jpg",
      position: "50% 70%",
    },
    {
      src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764402017/IMG_1047_ietvkw.jpg",
      position: "50% 60%",
    },
    {
      src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764402017/IMG_1046_ftipkx.jpg",
      position: "20% 55%",
    },
    {
      src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764154476/IMG_0841_bdtujk.jpg",
      position: "50% 70%",
    },
    {
      src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764154513/IMG_0844_zcszbb.png",
      position: "50% 25%",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1440);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === headerImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1440);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="about-container">
      <SEO
        title="About Us | Events Glamour Dubai"
        description="Meet Events Glamour — Dubai event planners crafting weddings, corporate functions, and luxury celebrations with creativity and precision."
        path="/about"
      />
      <div className="about-image slider-wrapper">
        {headerImages.map((img, index) => {
          const isActive = index === current;
          const isNearby =
            index === current ||
            index === (current + 1) % headerImages.length ||
            index === (current - 1 + headerImages.length) % headerImages.length;

          if (!isNearby) return null;

          return (
            <img
              key={index}
              src={cldHero(img.src)}
              alt={`Events Glamour about us event photography ${index + 1}`}
              className={isActive ? "fade-image active" : "fade-image"}
              style={{
                objectPosition: isSmallScreen ? img.position : undefined,
              }}
              fetchPriority={isActive && current === 0 ? "high" : "low"}
              decoding={isActive ? "sync" : "async"}
            />
          );
        })}
      </div>

      <div className="about-text">
        <Reveal>
          <div className="about-heading">
            <h1>Who We Are</h1>
            <p>
              At Events Glamour, we believe every event should be unique,
              memorable, and stress-free. With years of expertise and a
              passionate team of planners, designers, and coordinators, we bring
              your ideas to life with flawless execution.
            </p>
          </div>
        </Reveal>
      </div>

      <Marquee
        images={about1.map((url) => cldThumb(url))}
        label="Events Glamour gallery"
      />

      <Reveal>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="our-promise-section">
            <div className="our-promise-text">
              <h2>About Us</h2>
              <p>
                Founded in Dubai in 2022 by Gaurav Arora, Events Glamour is a
                luxury event design and management company creating
                sophisticated, unforgettable experiences.
              </p>
              <p>
                From elegant celebrations to high-profile corporate events, we
                blend vision, creativity, refined design, and flawless
                execution to transform every occasion into an extraordinary
                experience.
              </p>
              <p>Events Glamour — Where Every Detail Defines Luxury.</p>
            </div>

            <div className="our-promise-image">
              <img
                src="/owner-image.jpeg"
                alt="Gaurav Arora, founder of Events Glamour"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="tagline">
            <em>"Where Dreams Meet Perfection."</em>
          </div>
        </div>
      </Reveal>

      <Marquee
        images={about2.map((url) => cldThumb(url))}
        label="Events Glamour celebrations"
      />
    </div>
  );
};

export default About;
