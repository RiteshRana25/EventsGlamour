import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Fullscreen Image */}
      <div className="about-image">
        <img
          src={`https://picsum.photos/1920/1080?random=${Math.floor(
            Math.random() * 1000
          )}`}
          alt="Random"
        />
      </div>

      {/* Heading + Paragraph */}
      <div className="about-text">
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias vitae facere recusandae blanditiis iusto, voluptatibus voluptas aut ad odit illum ab minus, aperiam accusantium, sit magni tempora id nobis nulla dicta aspernatur quisquam! Recusandae voluptate aut minus animi, veritatis culpa non ducimus eos sed labore provident eligendi dignissimos magnam, inventore accusamus saepe in. Culpa facere vel unde magni. Veniam, rem?
        </p>
      </div>

      {/* 3 Cards */}
      <div className="about-cards">
        {[1, 2, 3].map((card) => (
          <div key={card} className="about-card">
            <h3>Card {card}</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores quidem in repudiandae hic officia voluptatibus vero iusto esse aperiam illum autem accusamus a similique consectetur culpa fuga, ipsam quisquam temporibus veritatis? Veritatis ad dolores velit nulla enim reiciendis distinctio possimus?
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
