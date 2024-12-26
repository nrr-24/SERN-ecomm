import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  // Replace this with actual user data from context or state management
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My Dashboard</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/categories/admin">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products/admin">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="container mt-5 text-center">
        <h1>Welcome, Admin !</h1>
        <p>This is your dashboard. Use the navigation bar to explore categories and products.</p>
      </div>
    </div>
  );
}

export default Dashboard;
