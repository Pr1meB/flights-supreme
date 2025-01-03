import React, { useState } from 'react';
import './Navbar.css';
import { Menu as MenuIcon, Close as CloseIcon, Flight, Hotel, Explore, TravelExplore } from '@mui/icons-material';
import astroImg from '../assets/astro.jfif'; // Profile image

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { label: 'Travel', icon: <TravelExplore />, active: false },
        { label: 'Explore', icon: <Explore />, active: false },
        { label: 'Flights', icon: <Flight />, active: true },
        { label: 'Hotels and Vacation Rentals', icon: <Hotel />, active: false },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <MenuIcon className="menu-icon" onClick={toggleSidebar} />
                    <div className="nav-title">Google-C</div>
                </div>
                <ul className="navbar-links">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className={`nav-item ${item.active ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
                <img src={astroImg} alt="Profile" className="navbar-profile-pic" />
            </nav>

            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar}>
                    <div className="sidebar" onClick={(e) => e.stopPropagation()}>
                        <CloseIcon className="close-icon" onClick={closeSidebar} />
                        <ul>
                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`sidebar-item ${item.active ? 'sidebar-active' : ''}`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
