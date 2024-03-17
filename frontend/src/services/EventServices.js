import axios from "axios";

const API_URL = "http://localhost:8000/api/eventsRoutes";

const getEvents = async () => {
  const response = await axios.get(API_URL);
  console.log(response);
  return response.data;
};

const EventPostingsService = {
  getEvents,
};

export default EventPostingsService;
