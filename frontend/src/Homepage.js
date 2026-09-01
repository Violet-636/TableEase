function HomePage({ onMakeReservation }) {
  return (
    <div className="home-page">
      <div className="home-card">
        <h1>TableEase</h1>
        <p className="home-subtitle">Restaurant Table Reservation</p>

        <div className="home-section">
          <h3>Customer</h3>

          <button
            className="primary-button"
            onClick={onMakeReservation}
          >
            Make a Reservation
          </button>

          <button className="secondary-button" disabled>
            Manage Reservation
          </button>
        </div>

        <hr />

        <div className="home-section">
          <h3>Staff</h3>
          <p>Manage restaurant reservations</p>

          <button className="disabled-button" disabled>
            Staff Management
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;