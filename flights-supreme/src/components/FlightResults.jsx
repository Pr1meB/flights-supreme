import React from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import { FlightTakeoff, FlightLand, AccessTime, AttachMoney } from '@mui/icons-material';
import FlightIcon from '@mui/icons-material/Flight';

const FlightResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <Typography variant="h6" textAlign="center">No flight results found.</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      {results.map((flight, index) => {
        const leg = flight.legs[0];
        const carrier = leg.carriers.marketing[0];
        const bookingUrl = flight.pricingOptions[0].items[0].url;

        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                borderRadius: "2em",
                transition: 'transform 0.5s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
              onClick={() => window.open(bookingUrl, '_blank')}
            >
              <CardContent>
              <Typography variant="h4" color="#006400" sx={{ display: 'flex', alignItems: 'center' }}>
                  {flight.price.formatted}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Box display="flex" alignItems="center">
                    <img src={carrier.logoUrl} alt="Airline" style={{ height: '40px', marginRight: '10px' }} />
                    <Typography variant="h6">{carrier.name}</Typography>
                  </Box>
                  <FlightIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <Box display="flex" alignItems="center">
                    <FlightTakeoff sx={{ marginRight: 1 }} />
                    {leg.origin.name} ({leg.origin.displayCode}) - {new Date(leg.departure).toLocaleString()}
                  </Box>
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <Box display="flex" alignItems="center">
                    <FlightLand sx={{ marginRight: 1 }} />
                    {leg.destination.name} ({leg.destination.displayCode}) - {new Date(leg.arrival).toLocaleString()}
                  </Box>
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <Box display="flex" alignItems="center">
                    <AccessTime sx={{ marginRight: 1 }} />
                    Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m
                  </Box>
                </Typography>


              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FlightResults;
