// workUtils.js
import axios from 'axios';

const refreshWorks = async () => {
  try {
    const response = await axios.get('http://localhost:3001/works');
    console.log('Refreshed works:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error refreshing works:', error);
    throw error;
  }
};

export default refreshWorks;
