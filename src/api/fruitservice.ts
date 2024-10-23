import axios from 'axios';

const BASE_URL = 'https://www.fruityvice.com/api/fruit/all';

export const fetchFruits = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching fruits:', error);
    throw error;
  }
};
