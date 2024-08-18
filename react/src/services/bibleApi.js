// src/services/bibleApi.js
import axios from 'axios';

const API_BASE_URL = '/bible'; // Use the proxy base URL
const URL_RANDOM = '/bible/?random=verse'; // Use the proxy path

export const fetchVerses = async (type, queryParams = '') => {
  try {
    let endpoint = '';

    // Build endpoint based on type
    switch (type) {
      case 'random':
        endpoint = URL_RANDOM;
        break;
      case 'single':
      case 'abbreviated':
      case 'range':
      case 'multiple':
      case 'translation':
      case 'verse_numbers':
      case 'jsonp':
        endpoint = `${API_BASE_URL}/${queryParams}`;
        break;
      default:
        throw new Error('Invalid query type');
    }

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching verses:', error.message);
    throw error;
  }
};
