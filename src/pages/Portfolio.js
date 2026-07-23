import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';
import Reveal from '../components/Reveal/Reveal';
import SEO from '../components/SEO/SEO';
import { cldThumb } from '../utils/cloudinary';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  const PageNavigate = (id) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setTimeout(() => {
      navigate(`/portfolio/${id}`);
    }, 300); 
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('https://events-glamour-backend.vercel.app/api/images');

        const portfolioItems = res.data.filter((item) => item.type === 'Portfolio');

        setItems(portfolioItems);
        console.log('📥 Portfolio data from MongoDB:', portfolioItems);
      } catch (err) {
        console.error('❌ Failed to fetch data:', err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="portfolio-container">
      <SEO
        title="Event Portfolio | Events Glamour Dubai"
        description="Browse Events Glamour's portfolio of weddings, corporate events, and luxury celebrations designed and delivered across Dubai."
        path="/portfolio"
      />
      <h2 className='portfolio-title'>Our Work Speaks for Itself</h2>
      <p>
        From glamorous weddings to corporate events and private parties, our gallery showcases creativity, precision, and unforgettable designs.
      </p>

      <div className="portfolio-grid">
        {items.map((item) => (
          <Reveal key={item.id} offset={10}>
            <div
              className="portfolio-card"
              onClick={() => PageNavigate(item.id)} 
            >
              <img
                src={cldThumb(item.cover)}
                alt={item.name}
                loading="lazy"
                decoding="async"
              />
              <p>{item.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
