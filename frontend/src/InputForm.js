import React, { useState, useEffect } from 'react';
import './InputForm.css';

const InputForm = () => {
  const [text, setText] = useState('');
  const [sentimentResult, setSentimentResult] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSentimentResult(data.sentiment);
      fetchComments(); 
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to analyze sentiment');
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/comments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to fetch comments');
    }
  };

  useEffect(() => {
    fetchComments(); 
  }, []);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="input-form-container">
      <div className="analysis-container">
        <form onSubmit={handleAnalyze}>
          <textarea
            className="text-area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or social media content here"
          />
          <button type="submit">Analyze Sentiment</button>
        </form>
        {sentimentResult && <p className="result">Sentiment: {sentimentResult}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <button className="view-comments-button" onClick={handleToggleComments}>
        {showComments ? 'Hide Comments' : 'View Previous Comments'}
      </button>
      {showComments && (
        <ul className="comments-list">
          <h2>Sentiment Analysis Comments</h2>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>Text: {comment.text}</p>
              <p>Sentiment: {comment.sentiment}</p>
              <p>Score: {comment.score}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default InputForm;
