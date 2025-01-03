import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const FlightResults = ({ results }) => {
    return (
        <Grid container spacing={3}>
            {results.map((flight, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{flight.airline}</Typography>
                            <Typography>From: {flight.origin}</Typography>
                            <Typography>To: {flight.destination}</Typography>
                            <Typography>Price: {flight.price}</Typography>
                            <Typography>Date: {flight.date}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default FlightResults;
