
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; 
import Home from './Home'; 
import Login from './Login'; 
import SentimentAnalysis from './SentimentAnalysis'; 
import AboutUs from './AboutUs'; 
import ContactUs from './ContactUs'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header /> {}
        <div className="content"> {}
          <Routes>
            <Route path="/" element={<Home />} /> {}
            <Route path="/login" element={<Login />} /> {}
            <Route path="/sentiment-analysis" element={<SentimentAnalysis />} /> {}
            <Route path="/about" element={<AboutUs />} /> {}
            <Route path="/contact" element={<ContactUs />} /> {}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
