require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const fetchAndSaveData = require('./fetchcrypto.js');
const CryptoCurrent = require('./models/cryptocurrent');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

app.get('/api/coins', async (req, res) => {
  try {
    const currentData = await CryptoCurrent.find({}).sort({ market_cap_rank: 1 });
    res.json(currentData);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ message: 'Failed to fetch data from the database.' });
  }
});

app.post('/api/history', async (req, res) => {
  console.log('data refresh..');
  await fetchAndSaveData();
  res.status(201).json({ message: 'Database updated.' });
});

app.get('/', (req, res) => {
  res.send('crypto server is running ');
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });

  cron.schedule('0 * * * *', () => {
    console.log("Running scheduled job to fetch and save data.");
    fetchAndSaveData(); 
  });
  console.log('Server started');
  fetchAndSaveData();
});
