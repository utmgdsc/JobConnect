import axios from "axios";

const API_URL = "http://localhost:8000/api/eventsRoutes";

const getAllEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single asset posting by ID
const getEvent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new asset posting
const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing asset posting by ID
const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a asset posting by ID
const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};