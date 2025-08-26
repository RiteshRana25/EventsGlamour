import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/images');
        setItems(res.data);

        // ✅ Log the data received from backend
        console.log('📥 Data from MongoDB:', res.data);
      } catch (err) {
        console.error('❌ Failed to fetch data:', err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="portfolio-container">
      <h2 className='portfolio-title'>Portfolio</h2>
      <div className="portfolio-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="portfolio-card"
            onClick={() => navigate(`/portfolio/${item.id}`)}
          >
            <img src={item.cover} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
