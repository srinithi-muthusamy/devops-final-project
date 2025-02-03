import React from 'react';
import './Home.css'; // Ensure you have the corresponding CSS file for styles

const Home = () => {
  return (
    <div className="home-container">
      
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Sentiment Analysis Checker!</h1>
          <p className="hero-subtitle">Use sentiment analysis to quickly detect feelings.</p>
          <a href="/sentiment-analysis" className="cta-button">Get Started</a>
        </div>
      </section>

      {/* Features Section with Container */}
      <section className="features-container">
        <h2 className="feature-title">How can sentiment analysis help you</h2>
        <div className="features">
          <div className="feature-item">
            <span className="checkmark">✔</span> Learn the topics your clients are most happy or unhappy about.
          </div>
          <div className="feature-item">
            <span className="checkmark">✔</span> Identify pain-points and detect patterns in client needs and behavior.
          </div>
          <div className="feature-item">
            <span className="checkmark">✔</span> Quickly detect negative feedback and take action instantly.
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Sentimojo. All rights reserved.</p>
        <div className="social-media-links">
          {/* Add social media links here */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
