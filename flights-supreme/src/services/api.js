import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchCountryData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/getConfig`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
            },
        });
        return response.data.data; // Returns the list of country data
    } catch (error) {
        console.error('Error fetching country data:', error);
        throw error;
    }
};
;

// Fetch user's location and nearby airports
export const getNearbyAirports = async () => {
  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = position.coords;

    const options = {
      method: 'GET',
      url: `${BASE_URL}/api/v1/flights/getNearByAirports`,
      params: { lat: latitude, lng: longitude, locale: 'en-US' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching nearby airports:', error);
    throw error;
  }
};

// Search airports by query
export const searchAirports = async (query) => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/api/v1/flights/searchAirport`,
      params: { query, locale: 'en-US' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error searching airports:', error);
    throw error;
  }
};

export const fetchFlightData = async (params) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/api/v2/flights/searchFlightsWebComplete`,
    params,
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};