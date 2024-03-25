import axios from "axios";

const API_URL = "http://localhost:8000/api/eventsRoutes";

const getEvents = async () => {
  const response = await axios.get(API_URL);
  console.log(response);
  return response.data;
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }

};
const updateEvents = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const EventPostingsService = {
  getEvents,
  updateEvents,
  getEventById
};

export default EventPostingsService;
