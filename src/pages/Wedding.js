import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Wedding.css";

const Wedding = () => {
  const navigate = useNavigate();

  const events = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    img: `https://picsum.photos/seed/wedding${i}/400/300`,
    title: `Wedding ${i + 1}`,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt egestas.",
  }));

  const getRows = (data, size) => {
    const rows = [];
    for (let i = 0; i < data.length; i += size) {
      rows.push(data.slice(i, i + size));
    }
    return rows;
  };

  const rows = getRows(events, 3);
  const [activeIds, setActiveIds] = useState(rows.map((row) => row[0].id));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleHover = (rowIndex, itemId) => {
    const updated = [...activeIds];
    updated[rowIndex] = itemId;
    setActiveIds(updated);
  };

  const handleClick = (title) => {
    navigate(`/wedding/${title.replace(/\s+/g, "").toLowerCase()}`);
    // e.g. Wedding 1 -> /wedding1
  };

  // Handle window resizing for mobile check
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  return (
    <div className="wedding-container">
      <h1 className="wedding-title">WEDDINGS</h1>
      
      {/* Desktop View */}
      <div className="wedding-div">
        {rows.map((row, rowIndex) => {
          const renderedRow = [];
          const activeItemInRow = row.find((item) => item.id === activeIds[rowIndex]) || row[0];

          row.forEach((item) => {
            renderedRow.push(
              <div
                key={item.id}
                className="wedding-img"
                onMouseEnter={() => handleHover(rowIndex, item.id)}
                onClick={() => handleClick(item.title)} // ✅ Click to navigate
                style={{ cursor: "pointer" }}
              >
                <img src={item.img} alt={item.title} />
              </div>
            );

            if (item.id === activeItemInRow.id) {
              renderedRow.push(
                <div key={`content-${item.id}`} className="wedding-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            }
          });

          return (
            <div className="wedding-row" key={`row-${rowIndex}`}>
              {renderedRow}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      {isMobile && (
        <div className="wedding-mobile">
          {events.map((item, index) => (
            <div className="wedding-mobile-item" key={item.id}
            onClick={() => handleClick(item.title)} // ✅ Click to navigate
                style={{ cursor: "pointer" }}>
              <img src={item.img} alt={item.title} />
              <div className="wedding-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wedding;
