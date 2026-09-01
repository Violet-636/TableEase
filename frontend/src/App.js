import { useState } from 'react';
import './App.css';

const timeOptions = [];

for (let hour = 11; hour <= 20; hour++) {
  for (let minute = 0; minute < 60; minute += 5) {
    if (hour === 20 && minute > 0) {
      break;
    }

    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    timeOptions.push(`${formattedHour}:${formattedMinute}`);
  }
}

function App() {
  const today = new Date().toISOString().split('T')[0];

  const [page, setPage] = useState('home');

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: '',
    specialRequests: ''
  });

  const [error, setError] = useState('');
  const [reservation, setReservation] = useState(null);

  const formatDate = (date) => {
    if (!date) {
      return '';
    }

    const [year, month, day] = date.split('-');

    return `${day} / ${month} / ${year}`;
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      reservationDate: '',
      reservationTime: '',
      numberOfGuests: '',
      specialRequests: ''
    });

    setError('');
    setReservation(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === 'phoneNumber') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    // Check name
    const namePattern = /^[\p{L}\s'-]+$/u;

    if (!namePattern.test(formData.fullName)) {
      setError('Please enter a valid name.');
      return;
    }

    // Check Australian phone number
    const phonePattern = /^0\d{9}$/;

    if (!phonePattern.test(formData.phoneNumber)) {
      setError(
        'Please enter a valid 10-digit Australian phone number.'
      );
      return;
    }

    try {
      const response = await fetch(
        '/api/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setReservation(data.reservation);
    } catch (error) {
      setError('Unable to connect to the server.');
    }
  };

  // =========================
  // HOME PAGE
  // =========================

  if (page === 'home') {
    return (
      <div className="app">
        <div className="home-page">
          <h1 className="home-brand">
            TableEase
          </h1>

          <p className="home-subtitle">
            Restaurant Table Reservation
          </p>

          <div className="home-section">
            <h3>Customer</h3>

            <button
              className="primary-button"
              onClick={() => {
                resetForm();
                setPage('reservation');
              }}
            >
              Make a Reservation
            </button>

            <button
              className="secondary-button"
              disabled
            >
              Manage Reservation
            </button>
          </div>

          <div className="home-divider"></div>

          <div className="home-section">
            <h3>Staff</h3>

            <p className="staff-description">
              Manage restaurant reservations
            </p>

            <button
              className="staff-button"
              disabled
            >
              Staff Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // CONFIRMATION PAGE
  // =========================

  if (reservation) {
    return (
      <div className="app">
        <div className="reservation-page confirmation-page">
          <h2 className="brand-name">
            TableEase
          </h2>

          <div className="success-icon">
            ✓
          </div>

          <h1 className="confirmation-title">
            Reservation Confirmed
          </h1>

          <p className="confirmation-text">
            Your reservation has been created successfully.
          </p>

          <div className="reservation-card">
            <h3>
              Reservation Details
            </h3>

            <div className="detail-row">
              <span>
                Reservation ID
              </span>

              <strong>
                {reservation.reservationId}
              </strong>
            </div>

            <div className="detail-row">
              <span>
                Customer
              </span>

              <strong>
                {reservation.fullName}
              </strong>
            </div>

            <div className="detail-row">
              <span>
                Date
              </span>

              <strong>
                {formatDate(
                  reservation.reservationDate
                )}
              </strong>
            </div>

            <div className="detail-row">
              <span>
                Time
              </span>

              <strong>
                {reservation.reservationTime}
              </strong>
            </div>

            <div className="detail-row">
              <span>
                Guests
              </span>

              <strong>
                {reservation.numberOfGuests}
              </strong>
            </div>
          </div>

          <button
            className="primary-button"
          >
            View Reservation
          </button>

          <button
            className="secondary-button"
            onClick={() => {
              resetForm();
              setPage('home');
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // MAKE A RESERVATION PAGE
  // =========================

  return (
    <div className="app">
      <div className="reservation-page">
        <button
          className="back-button"
          onClick={() => {
            setError('');
            setPage('home');
          }}
        >
          ← Back
        </button>

        <div className="page-header">
          <h1>
            Make a Reservation
          </h1>

          <p>
            Enter your booking details
          </p>
        </div>

        <form
          className="reservation-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              inputMode="numeric"
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Reservation Date
            </label>

            <input
              type="date"
              name="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              min={today}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Reservation Time
            </label>

            <select
              name="reservationTime"
              value={formData.reservationTime}
              onChange={handleChange}
              required
            >
              <option value="">
                Select a time
              </option>

              {timeOptions.map((time) => (
                <option
                  key={time}
                  value={time}
                >
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Number of Guests
            </label>

            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              placeholder="Enter number of guests"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Special Requests (Optional)
            </label>

            <input
              type="text"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Add a note for the restaurant"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
          >
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;