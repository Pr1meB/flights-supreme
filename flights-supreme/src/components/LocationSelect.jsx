import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Grid } from '@mui/material';
import { getNearbyAirports, searchAirports } from '../services/api';

const LocationSelect = ({
  origin,
  originId,
  setOrigin,
  setOriginId,
  destination,
  destinationId,
  setDestination,
  setDestinationId,
}) => {
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  useEffect(() => {
    const fetchNearbyAirports = async () => {
      try {
        const data = await searchAirports('new');
        const formattedOptions = data.map((airport) => ({
          value: String(airport.navigation.relevantFlightParams.skyId),
          entity: String(airport.navigation.relevantFlightParams.entityId),
          label: `${airport.presentation.title}`,
        }));
        setOriginOptions(formattedOptions);
      } catch (error) {
        console.error('Failed to fetch nearby airports:', error);
      }
    };

    fetchNearbyAirports();
  }, []);

  // useEffect(() => {
  //   const fetchNearbyAirports = async () => {
  //     try {
  //       const data = await getNearbyAirports();
  //       const formattedOptions = data.nearby.map((airport) => ({
  //         value: String(airport.navigation.relevantFlightParams.skyId),
  //         entity: String(airport.navigation.relevantFlightParams.entityId),
  //         label: `${airport.presentation.title} (${airport.navigation.relevantFlightParams.skyId})`,
  //       }));
  //       setOriginOptions(formattedOptions);
  //     } catch (error) {
  //       console.error('Failed to fetch nearby airports:', error);
  //     }
  //   };

  //   fetchNearbyAirports();
  // }, []);
  useEffect(() => {
    const handleSearchDestination = async () => {
      try {
        const data = await searchAirports('mia');
        const formattedOptions = data.map((airport) => ({
          value: String(airport.navigation.relevantFlightParams.skyId),
          entity: String(airport.navigation.relevantFlightParams.entityId),
          label: `${airport.presentation.title}`,
        }));
        setDestinationOptions(formattedOptions);
      } catch (error) {
        console.error('Failed to search airports:', error);
      }
    };

    handleSearchDestination();
  }, []);

  const handleSelectChange = (selected, setSkyId, setEntityId) => {
    if (selected) {
      setSkyId(selected.value);
      setEntityId(selected.entity);
    } else {
      setSkyId('');
      setEntityId('');
    }
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <Select
          options={originOptions}
          value={
            originOptions.find((option) => option.value === String(origin)) || null
          }
          onChange={(selected) => handleSelectChange(selected, setOrigin, setOriginId)}
          placeholder="Select Origin"
          isClearable
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Select
          options={destinationOptions}
          value={
            destinationOptions.find((option) => option.value === String(destination)) || null
          }
          onChange={(selected) => handleSelectChange(selected, setDestination, setDestinationId)}
          placeholder="Select Destination"
          isClearable
        />
      </Grid>
    </>
  );
};

export default LocationSelect;
