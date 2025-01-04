import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import MapSection from './components/MapSection';
import FlightResults from './components/FlightResults'; // Ensure this is created or imported
import Loader from './components/Loader'; // Ensure this is created or imported
// import { fetchFlights } from './services/api'; // Ensure this file and function exist
import './App.css';

const App = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // const handleSearch = async (params) => {
    //     setLoading(true);
    //     try {
    //         const data = await fetchFlights(params);
    //         setResults(data.flights || []);
    //     } catch (error) {
    //         alert('Failed to fetch flights. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div>
            <Navbar />
            <Header  />
            {/* Flight Results Section */}
            {/* {loading ? <Loader /> : <FlightResults results={results} />} */}
            <MapSection />
        </div>
    );
};

export default App;
