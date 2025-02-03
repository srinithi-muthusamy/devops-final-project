import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div>
      <div className="about-us-container">
        <h2>About Us</h2>
        <p>We are a passionate team dedicated to delivering top-notch sentiment analysis tools. Our mission is to provide actionable insights from your text data, empowering you to make informed decisions and understand trends.</p>
      </div>
      
      <div className="mission-vision-container">
        <div className="mission-container">
          <h3>Our Mission</h3>
          <p>To create innovative and reliable sentiment analysis solutions that help businesses and individuals understand and leverage their data effectively.</p>
        </div>

        <div className="vision-container">
          <h3>Our Vision</h3>
          <p>To be a leading provider of advanced text analysis tools, fostering a deeper understanding of sentiment and emotions in diverse industries worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
