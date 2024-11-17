import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assests/imges/logo.png";
import { Collapse, Ripple, initMDB } from 'mdb-ui-kit'; // Ensure these are correctly imported

import axios from 'axios';

initMDB({ Collapse, Ripple });

function HeaderForUser() {
    const handleLogout = async () => {
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            try {
                await axios.post('/api/v1/auth/logout');
                window.location.href = '/Home';
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black' }}>
                {/* Container wrapper */}
                <div className="container-fluid">
                    {/* Navbar brand */}
                    <Link className="navbar-brand me-2" to="/user">
                        <img
                            src={Logo}
                            height="35"
                            alt="MDB Logo"
                            loading="lazy"
                            style={{ marginTop: '-1px' }}
                        />
                    </Link>

                    {/* Toggle button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/map">Map</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/offers">Offers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/review">Review</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/profile">My Profile</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">
                            
                            <button type="button" className="btn btn-warning me-3" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default HeaderForUser;
