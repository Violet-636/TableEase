const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('TableEase API is running');
});

const PORT = process.env.PORT || 5000;

if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('MongoDB is not configured yet');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});