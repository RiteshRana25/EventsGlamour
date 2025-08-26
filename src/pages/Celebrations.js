import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Celebrations.css";

const Celebrations = () => {
  const navigate = useNavigate();
  const events = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    img: `https://picsum.photos/seed/wedding${i}/400/300`,
    title: `celebration ${i + 1}`,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt egestas.",
  }));

  const getRows = (data, size) => {
    const rows = [];
    for (let i = 0; i < data.length; i += size) {
      rows.push(data.slice(i, i + size));
    }
    return rows;
  };

  const rows = getRows(events, 3); // 3 images per row

  // 🔸 Create independent state for each row (default: first image in each row)
  const [activeIds, setActiveIds] = useState(
    rows.map((row) => row[0].id) // default: 0, 3, 6
  );
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleHover = (rowIndex, itemId) => {
    const updated = [...activeIds];
    updated[rowIndex] = itemId;
    setActiveIds(updated);
  };

  const handleClick = (title) => {
    navigate(`/celebrations/${title.replace(/\s+/g, "").toLowerCase()}`);
    // e.g. Wedding 1 -> /wedding1
  };
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);
  return (
    <div className="celebration-container">
      <h1 className="celebration-title">CELEBRATIONS</h1>
      <div className="celebration-div">
        {rows.map((row, rowIndex) => {
          const renderedRow = [];

          const activeItemInRow =
            row.find((item) => item.id === activeIds[rowIndex]) || row[0];

          row.forEach((item) => {
            renderedRow.push(
              <div
                key={item.id}
                className="celebration-img"
                onMouseEnter={() => handleHover(rowIndex, item.id)}
                onClick={()=>handleClick(item.title)}
              >
                <img src={item.img} alt={item.title} />
              </div>
            );

            if (item.id === activeItemInRow.id) {
              renderedRow.push(
                <div key={`content-${item.id}`} className="celebration-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            }
          });

          return (
            <div className="celebration-row" key={`row-${rowIndex}`}>
              {renderedRow}
            </div>
          );
        })}
      </div>

            {isMobile && (
        <div className="celebration-mobile">
          {events.map((item, index) => (
            <div className="celebration-mobile-item" key={item.id}
            onClick={() => handleClick(item.title)} // ✅ Click to navigate
                style={{ cursor: "pointer" }}>
              <img src={item.img} alt={item.title} />
              <div className="celebration-content">
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

export default Celebrations;
