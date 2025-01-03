import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchForm = ({ onSearch }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = () => {
        if (origin && destination && date) {
            onSearch({ origin, destination, date });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <TextField
                    label="Origin"
                    variant="outlined"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Destination"
                    variant="outlined"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={handleSearch}>
                    Explore
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchForm;
