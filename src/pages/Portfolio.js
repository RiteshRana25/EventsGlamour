import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';
import Reveal from '../components/Reveal/Reveal';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Corrected function: receives item ID
  const PageNavigate = (id) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setTimeout(() => {
      navigate(`/portfolio/${id}`);
    }, 300); // slight delay for smooth scrolling
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('https://events-glamour-backend.vercel.app/api/images');

        // Filter only portfolio items
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
      <h2 className='portfolio-title'>Our Work Speaks for Itself</h2>
      <p>
        From glamorous weddings to corporate events and private parties, our gallery showcases creativity, precision, and unforgettable designs.
      </p>

      <div className="portfolio-grid">
        {items.map((item) => (
          <Reveal key={item.id} offset={10}>
            <div
              className="portfolio-card"
              onClick={() => PageNavigate(item.id)}  // Pass ID here
            >
              <img src={item.cover} alt={item.name} />
              <p>{item.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
