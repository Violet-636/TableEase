const Reservation = require('../models/Reservation');

console.log('Reservation model:', Reservation.modelName, typeof Reservation.countDocuments);

const createReservation = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      reservationDate,
      reservationTime,
      numberOfGuests,
      specialRequests
    } = req.body;

    // Check required fields
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !reservationDate ||
      !reservationTime ||
      !numberOfGuests
    ) {
      return res.status(400).json({
        message: 'Please complete all required fields.'
      });
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email.'
      });
    }

    // Check reservation date
    const selectedDate = new Date(reservationDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message: 'Reservation date cannot be in the past.'
      });
    }

    // Check number of guests
    if (numberOfGuests < 1) {
      return res.status(400).json({
        message: 'Number of guests must be at least 1.'
      });
    }

    // Generate reservation ID
    const reservationCount = await Reservation.countDocuments();

    const reservationId =
      'TE' + String(reservationCount + 1).padStart(3, '0');

    // Save reservation
    const reservation = new Reservation({
      reservationId,
      fullName,
      phoneNumber,
      email,
      reservationDate,
      reservationTime,
      numberOfGuests,
      specialRequests
    });

    const savedReservation = await reservation.save();

    res.status(201).json({
      message: 'Reservation created successfully.',
      reservation: savedReservation
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Unable to create reservation.'
    });
  }
};

module.exports = {
  createReservation
};