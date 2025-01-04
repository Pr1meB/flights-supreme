import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Menu as MenuIcon, Close as CloseIcon, Flight, Hotel, Explore, TravelExplore } from '@mui/icons-material';
import astroImg from '../assets/astro.jfif'; // Profile image
import { fetchCountryData } from '../services/api'; // Import the API function

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarClass, setSidebarClass] = useState(''); // Sidebar animation class
    const [countryData, setCountryData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('US'); // Default country code
    const [countryDetails, setCountryDetails] = useState({});

    useEffect(() => {
        // Fetch country data when component loads
        const getCountryData = async () => {
            try {
                const data = await fetchCountryData();
                setCountryData(data);
                const defaultCountry = data.find((country) => country.countryCode === 'US');
                setCountryDetails(defaultCountry);
            } catch (error) {
                console.error('Failed to fetch country data:', error);
            }
        };

        getCountryData();
    }, []);

    const navItems = [
        { label: 'Travel', icon: <TravelExplore />, active: false },
        { label: 'Explore', icon: <Explore />, active: false },
        { label: 'Flights', icon: <Flight />, active: true },
        { label: 'Hotels and Vacation Rentals', icon: <Hotel />, active: false },
    ];

    const openSidebar = () => {
        setIsSidebarOpen(true);
        setTimeout(() => setSidebarClass('slide-in'), 10);
    };

    const closeSidebar = () => {
        setSidebarClass('slide-out');
        setTimeout(() => setIsSidebarOpen(false), 500);
    };

    const handleCountryChange = (countryCode) => {
        const selected = countryData.find((item) => item.countryCode === countryCode);
        setSelectedCountry(countryCode);
        setCountryDetails(selected);
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    <MenuIcon className="menu-icon" onClick={openSidebar} />
                    <div className="nav-title">Google-C</div>
                </div>
                <ul className="navbar-links">
                    {navItems.map((item, index) => (
                        <li key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
                <div className="country-dropdown">
                    <select
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e.target.value)}
                    >
                        {countryData.map((country) => (
                            <option key={country.countryCode} value={country.countryCode}>
                                {country.country}
                            </option>
                        ))}
                    </select>
                    <span className="country-code">{selectedCountry}</span>
                </div>
                <img src={astroImg} alt="Profile" className="navbar-profile-pic" />
            </nav>

            <div className={`sidebar-overlay ${isSidebarOpen ? '' : 'hidden'}`} onClick={closeSidebar}>
                <div className={`sidebar ${sidebarClass}`} onClick={(e) => e.stopPropagation()}>
                    <CloseIcon className="close-icon" onClick={closeSidebar} />
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className={`sidebar-item ${item.active ? 'sidebar-active' : ''}`}>
                                {item.icon}
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
