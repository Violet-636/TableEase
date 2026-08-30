const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  reservationDate: {
    type: String,
    required: true
  },
  reservationTime: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  specialRequests: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Confirmed'
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);