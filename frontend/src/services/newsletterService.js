import axios from 'axios';

const API_URL = 'http://localhost:8000/api/subscribe'; // Update with your actual API endpoint

const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(API_URL, { email });
    return response.data;
  } catch (error) {
    // Handle or throw the error as needed
    console.error("There was an error subscribing to the newsletter:", error.response);
    throw error.response.data; // This will contain any error messages from the server.
  }
};

const newsletterService = {
  subscribeToNewsletter,
};

export default newsletterService;
