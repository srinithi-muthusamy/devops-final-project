// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Sentiment = require('sentiment'); 

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret'; 


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/sentimentDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));


const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', UserSchema);


const FeedbackSchema = new mongoose.Schema({
  email: String,
  feedback: String,
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);

const SentimentSchema = new mongoose.Schema({
  text: String,
  sentiment: String,
  score: Number,
  date: { type: Date, default: Date.now }
});
const SentimentComment = mongoose.model('SentimentComment', SentimentSchema);

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.post('/api/analyze', (req, res) => {
  const { text } = req.body;
  const sentiment = new Sentiment();
  
  try {
    const analysis = sentiment.analyze(text);
    const sentimentResult = analysis.score > 0 ? 'Positive' : analysis.score < 0 ? 'Negative' : 'Neutral';
    
    const newSentiment = new SentimentComment({ text, sentiment: sentimentResult, score: analysis.score });
    newSentiment.save()
      .then(() => res.json({ sentiment: sentimentResult }))
      .catch((error) => {
        console.error('Failed to save sentiment analysis result:', error);
        res.status(500).json({ error: 'Failed to save sentiment analysis result' });
      });
  } catch (error) {
    console.error('Failed to analyze sentiment:', error);
    res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

// Feedback Route
app.post('/api/feedback', (req, res) => {
  const { email, feedback } = req.body;
  const newFeedback = new Feedback({ email, feedback });

  newFeedback.save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => {
      console.error('Failed to save feedback:', error);
      res.status(500).json({ success: false, error: 'Failed to save feedback' });
    });
});

// Get All Sentiment Analysis Comments Route
app.get('/api/comments', (req, res) => {
  SentimentComment.find()
    .then((comments) => res.json(comments))
    .catch((error) => {
      console.error('Failed to fetch sentiment analysis comments:', error);
      res.status(500).json({ error: 'Failed to fetch sentiment analysis comments' });
    });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
