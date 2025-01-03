import axios from 'axios';

const API_KEY = 'your_rapidapi_key'; // Replace with your RapidAPI key
const BASE_URL = 'https://sky-scrapper.p.rapidapi.com';

export const fetchFlights = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/flights`, {
            params,
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
};

// export const fetchFlights = async (params) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 flights: [
//                     { id: 1, origin: "New York", destination: "London", price: "$500" },
//                     { id: 2, origin: "Los Angeles", destination: "Tokyo", price: "$700" },
//                     { id: 3, origin: "Paris", destination: "Dubai", price: "$650" },
//                 ],
//             });
//         }, 2000);
//     });
// };
