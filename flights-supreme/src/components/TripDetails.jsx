// TripDetails.jsx
import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';

const TripDetails = ({ tripType, setTripType, passengers, setPassengers, travelClass, setTravelClass }) => {
  const handlePassengerChange = (type, delta) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <>
      {/* Trip Type */}
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Trip Type</InputLabel>
          <Select value={tripType} onChange={(e) => setTripType(e.target.value)} label="Trip Type">
            <MenuItem value="One Way">One Way</MenuItem>
            <MenuItem value="Round Trip">Round Trip</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Passengers */}
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Passengers</InputLabel>
          <Select
            value={totalPassengers}
            label="Passangers"
            onChange={() => {}}
            renderValue={() => (
              <Box display="flex" alignItems="center">
                <PeopleIcon fontSize="small" sx={{ mr: 1 }} />
                {totalPassengers}
              </Box>
            )}
          >
            <Box p={3}>
              {['adults', 'children', 'infants'].map((type) => (
                <Box key={type} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography textTransform="capitalize">{type}</Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handlePassengerChange(type, -1)}>
                      -
                    </IconButton>
                    <Typography component="span" sx={{ mx: 1 }}>
                      {passengers[type]}
                    </Typography>
                    <IconButton size="small" onClick={() => handlePassengerChange(type, 1)}>
                      +
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Select>
        </FormControl>
      </Grid>

      {/* Travel Class */}
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Class</InputLabel>
          <Select value={travelClass} onChange={(e) => setTravelClass(e.target.value)} label="Class">
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Premium Economy">Premium Economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="First">First</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default TripDetails;