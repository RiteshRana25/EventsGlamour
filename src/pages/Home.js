import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Reveal from "../components/Reveal/Reveal";
import SEO from "../components/SEO/SEO";
import reviews from "../data/reviews";
import { cldHero, cldThumb } from "../utils/cloudinary";
import "./Home.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2, slidesToSlide: 1 },
};

const reviewResponsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
};

const topImages = [
  {
    src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764402017/IMG_1049_sehxxs.jpg",
    position: "30% 40%",
  },
  {
    src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764154487/IMG_0842_rnpdtn.jpg",
    position: "20% 65%",
  },
  {
    src: "https://res.cloudinary.com/dfdhunrxn/image/upload/v1764154502/IMG_0843_ogs82x.png",
    position: "20% 60%",
  },
];

const Home = () => {
  const [homeImages, setHomeImages] = useState({});
  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1440);

  useEffect(() => {
    const fetchHomeImages = async () => {
      try {
        const res = await axios.get(
          "https://events-glamour-backend.vercel.app/api/images"
        );

        const grouped = res.data.reduce((acc, item) => {
          if (item.name.toLowerCase().startsWith("home")) {
            const imagesArray = [
              item.cover,
              ...item.images.map((img) => img.url),
            ];
            acc[item.name.toLowerCase()] = imagesArray;
          }
          return acc;
        }, {});

        setHomeImages(grouped);
        console.log("📥 Home images:", grouped);
      } catch (err) {
        console.error("❌ Failed to fetch home images:", err);
      }
    };

    fetchHomeImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopIndex((prevIndex) => (prevIndex + 1) % topImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1440);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { name: "home1", title: "Weddings & Engagements" },
    { name: "home2", title: "Corporate Events & Launches" },
    { name: "home3", title: "Proposal, Parties & Anniversaries" },
    { name: "home4", title: "Lighting Ceiling Decor & Furniture" },
    { name: "home5", title: "Entertainment & Production Services" },
  ];

  return (
    <div className="home">
      <SEO
        title="Events Glamour | Luxury Event Management Company in Dubai"
        description="Luxury event management in Dubai — weddings, corporate events, parties, catering & production by Events Glamour."
        path="/"
      />

      <div className="full-screen-image">
        {topImages.map((img, index) => {
          const isActive = index === currentTopIndex;
          const isNearby =
            index === currentTopIndex ||
            index === (currentTopIndex + 1) % topImages.length ||
            index ===
              (currentTopIndex - 1 + topImages.length) % topImages.length;

          if (!isNearby) return null;

          return (
            <img
              key={index}
              src={cldHero(img.src)}
              alt={`Events Glamour luxury event showcase ${index + 1} in Dubai`}
              className={`image-full ${isActive ? "active" : ""}`}
              style={{
                objectPosition: isSmallScreen ? img.position : undefined,
              }}
              fetchPriority={isActive && currentTopIndex === 0 ? "high" : "low"}
              decoding={isActive ? "sync" : "async"}
            />
          );
        })}
      </div>

      <Reveal>
        <div className="section">
          <h2>Celebrations Redefined with Events Glamour</h2>
          <p>
            We are a full-service event management company in Dubai specializing
            in weddings, corporate functions, social celebrations, exhibitions,
            and luxury events. From décor to catering, entertainment to
            production—we handle it all with style and precision.
          </p>
        </div>
      </Reveal>

      {sections.map((sec, index) => (
        <Reveal key={index}>
          <div className="section">
            <h2>{sec.title}</h2>
          </div>

          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={0}
            transitionDuration={5000}
            arrows={false}
            showDots={false}
            customTransition="transform 5s linear"
            containerClass="carousel-container"
            itemClass="carousel-item"
          >
            {(homeImages[sec.name] || []).map((url, idx) => (
              <img
                key={idx}
                src={cldThumb(url)}
                alt={`${sec.title} ${idx + 1}`}
                className="carousel-item"
                loading="lazy"
                decoding="async"
              />
            ))}
          </Carousel>
        </Reveal>
      ))}

      <Reveal>
        <div className="section reviews-section">
          <h2>What Our Clients Say</h2>
          <p>Real experiences from celebrations planned with Events Glamour.</p>
        </div>
      </Reveal>

      <div className="reviews-carousel-wrap">
        <Carousel
          responsive={reviewResponsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
          arrows={false}
          showDots
          swipeable
          draggable
          keyBoardControl
          partialVisible={false}
          centerMode={false}
          containerClass="reviews-carousel"
          itemClass="review-slide"
        >
          {reviews.map((item) => (
            <div key={item.id} className="review-card">
              <p className="review-text">“{item.review}”</p>
              <p className="review-name">— {item.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
