import React from 'react';
import './Home.css'; // Import the CSS file

// Helper function to generate random Picsum image URLs
const getRandomImageUrl = () => {
  return `https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}`;
};

const Home = () => {
  return (
    <div className="home">
      {/* Full Screen Image at the top */}
      <div className="full-screen-image">
        <img src={getRandomImageUrl()} alt="random" className="image-full" />
      </div>

      {/* Section with a Title and Description */}
      <div className="section">
        <h1>Heading1</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta laboriosam neque inventore error quas aperiam doloremque nihil non voluptate necessitatibus aspernatur voluptatem quidem, fugit veritatis provident ex nisi? Nemo dolore hic fugiat natus cum ducimus rem placeat quaerat quo beatae explicabo accusantium eius repellat, modi sapiente numquam, eveniet culpa vero maiores non aliquid asperiores atque ipsam veniam. Magni quam, recusandae iure magnam veritatis dolore molestias nostrum officiis repellat quasi libero voluptates ad illum minus perspiciatis saepe, numquam, ea quod nesciunt.</p>
      </div>
      {/* Second Image Row with 5 Images */}
      <div className="image-row">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={getRandomImageUrl()} alt={`random ${index}`} className="image" />
        ))}
      </div>

      {/* Another Section with Title */}
      <div className="section">
        <h2>Heading2</h2>
      </div>
      {/* 3 Cards with Title on Top and Lorem Text */}
      <div className="card-container">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="card">
            <h3>Card Title {index + 1}</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, voluptates? Labore qui beatae iste rerum neque ab est ex eum unde adipisci, excepturi maxime delectus quos laborum ea quasi repudiandae minus placeat! Consequuntur voluptatem blanditiis aliquam totam fugiat illum unde!</p>
          </div>
        ))}
      </div>



      {/* Third Image Row with 5 Images */}
      <div className="image-row">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={getRandomImageUrl()} alt={`random ${index}`} className="image" />
        ))}
      </div>

      {/* Another Section with Title */}
      <div className="section">
        <h2>Heading3</h2>
      </div>

      {/* Fourth Image Row with 5 Images */}
      <div className="image-row">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={getRandomImageUrl()} alt={`random ${index}`} className="image" />
        ))}
      </div>
    </div>
  );
};

export default Home;
