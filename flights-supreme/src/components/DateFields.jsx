
// DateFields.jsx
import React from 'react';
import { Grid, TextField } from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';

const DateFields = ({ departureDate, setDepartureDate, returnDate, setReturnDate }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Departure Date"
          InputLabelProps={{ shrink: true }}
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          InputProps={{ startAdornment: <CalendarIcon fontSize="small" sx={{ mr: 1 }} /> }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="date"
          label="Return Date"
          InputLabelProps={{ shrink: true }}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          InputProps={{ startAdornment: <CalendarIcon fontSize="small" sx={{ mr: 1 }} /> }}
        />
      </Grid>
    </>
  );
};

export default DateFields;