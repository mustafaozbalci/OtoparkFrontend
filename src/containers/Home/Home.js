import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (<div className="home-container">
        <h1 className="home-title">Parking Management System</h1>
        <p className="home-description">With this application you can:</p>
        <ul className="home-features">
            <li>View parking lots and see available parking spaces.</li>
            <li>Make parking lot and parking space reservations.</li>
            <li>Create a user account and log in.</li>
            <li>View and manage your current reservations.</li>
            <li>End your reservations and view past reservations.</li>
            <li>Manage the parking lots you own and add new ones.</li>
            <li>View and manage reservations for your parking lots.</li>
        </ul>
        <div className="home-buttons">
            <Link to="/register" className="btn btn-primary">Register</Link>
            <Link to="/login" className="btn btn-secondary">Log In</Link>
        </div>
    </div>);
};

export default Home;
