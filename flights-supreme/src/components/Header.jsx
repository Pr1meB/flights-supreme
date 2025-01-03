import React from 'react';
import SearchForm from './SearchForm';
import './Header.css';

const Header = ({ onSearch }) => {
    return (
        <div>
        <div className="flights-bg">
            <div className="content-wrapper">
                <h1>Flights Supreme</h1>
            </div>
        </div>
        <div className='flights'>
            <div>
                <SearchForm onSearch={onSearch} /> 
            </div>
          
        </div>
                    
        </div>

    );
};

export default Header;
