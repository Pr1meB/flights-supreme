import React, { useState } from 'react';
import { Grid, Card, Button, Box, CircularProgress } from '@mui/material';
import { Flight as FlightIcon } from '@mui/icons-material';
import TripDetails from './TripDetails';
import LocationSelect from './LocationSelect';
import DateFields from './DateFields';
import axios from 'axios';
import FlightResults from './FlightResults';
import { fetchFlightData } from '../services/api'; // Import the API function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const SearchForm = () => {
  const [tripType, setTripType] = useState('One Way');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState('Economy');
  const [origin, setOrigin] = useState('');
  const [originId, setOriginId] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const validateForm = () => {
    let valid = true;

    if (!origin) {
      toast.error('Origin is required.');
      valid = false;
    }
    if (!destination) {
      toast.error('Destination is required.');
      valid = false;
    }
    if (!departureDate) {
      toast.error('Departure date is required.');
      valid = false;
    }
    if (tripType === 'Round Trip' && !returnDate) {
      toast.error('Return date is required for round trip.');
      valid = false;
    }

    return valid;
  };

  const handleSearch = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const params = {
        originSkyId: origin,
        destinationSkyId: destination,
        originEntityId: originId,
        destinationEntityId: destinationId,
        date: departureDate,
        returnDate: tripType === 'Round Trip' ? returnDate : undefined,
        cabinClass: travelClass.toLowerCase(),
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        sortBy: 'best',
        limit: '30',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
    };

    try {
        const response = await fetchFlightData(params);
        console.log('API response:', response);

        if (response.itineraries) {
            const itineraries = response.itineraries;
            console.log('Itineraries:', itineraries);

            // Extract relevant details (e.g., flights, agents)
            const relevantData = itineraries || []; // Adjust based on actual data structure
            setResults(relevantData);
            console.log(results)
            toast.success('Flights fetched successfully!');
        } else {
            toast.error('No flight data available.');
        }
    } catch (error) {
        toast.error('Error fetching flight data. Please try again.');
        console.error('Error fetching flight data:', error);
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Card
          elevation={3}
          sx={{
            p: 3,
            borderRadius: "2em",
            width: '80%',
            maxWidth: '80%',
            minWidth: '80%',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <TripDetails
              tripType={tripType}
              setTripType={setTripType}
              passengers={passengers}
              setPassengers={setPassengers}
              travelClass={travelClass}
              setTravelClass={setTravelClass}
            />

            <LocationSelect
              origin={origin}
              originId={originId}
              setOrigin={setOrigin}
              setOriginId={setOriginId}
              destination={destination}
              destinationId={destinationId}
              setDestination={setDestination}
              setDestinationId={setDestinationId}
            />

            <DateFields
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
            />

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: '50px', paddingLeft: '2rem', paddingRight: '2rem' }}
                startIcon={<FlightIcon />}
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Explore'}
              </Button>
            </Grid>

            {results.length > 0 && (
              <Grid item xs={12}>
                <FlightResults results={results} />
              </Grid>
            )}
          </Grid>
        </Card>
      </Box>

      <ToastContainer />
    </>
  );
};

export default SearchForm;
