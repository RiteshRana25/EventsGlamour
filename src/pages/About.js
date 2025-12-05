import React, { useEffect, useState } from "react";
import "./About.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Reveal from "../components/Reveal/Reveal";
import axios from "axios";

const About = () => {
  const [about1, setAbout1] = useState([]);
  const [about2, setAbout2] = useState([]);

  // 1️⃣ Fetch DB data
  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const res = await axios.get(
          "https://events-glamour-backend.vercel.app/api/images"
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

  // 2️⃣ Header slider (your static part)
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2, slidesToSlide: 1 },
  };

  return (
    <div className="about-container">
      {/* TOP SLIDER */}
      <div className="about-image slider-wrapper">
        {headerImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Slide ${index}`}
            className={index === current ? "fade-image active" : "fade-image"}
            style={{
              objectPosition: isSmallScreen ? img.position : undefined,
            }}
          />
        ))}
      </div>

      {/* WHO WE ARE */}
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

      {/* ⭐ FIRST CAROUSEL = About1 */}
      <Reveal>
        <div className="carousel-wrapper">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={0}
            transitionDuration={5000}
            arrows={false}
            customTransition="transform 5s linear"
          >
            {about1.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`About1 ${index}`}
                loading="lazy"
              />
            ))}
          </Carousel>
        </div>
      </Reveal>

      {/* ⭐ MIDDLE CONTENT */}
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
              <h2>Our Promise</h2>
              <ul>
                <li>Tailor-made event concepts</li>
                <li>Professional coordination & execution</li>
                <li>Premium vendor network</li>
                <li>Attention to every detail</li>
              </ul>
            </div>

            <div className="our-promise-image">
              <img
                src="https://res.cloudinary.com/dfdhunrxn/image/upload/v1764179913/IMG_0258_c0adj7.jpg"
                alt="Our Promise"
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

      {/* ⭐ SECOND CAROUSEL = About2 */}
      <Reveal>
        <div className="carousel-wrapper">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={0}
            transitionDuration={5000}
            arrows={false}
            customTransition="transform 5s linear"
          >
            {about2.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`About2 ${index}`}
                loading="lazy"
              />
            ))}
          </Carousel>
        </div>
      </Reveal>
    </div>
  );
};

export default About;
