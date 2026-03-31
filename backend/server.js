require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

const corsOptions = {
  origin: true, // Mirror the request origin
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedback_system')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
