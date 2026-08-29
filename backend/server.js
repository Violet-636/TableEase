const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

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