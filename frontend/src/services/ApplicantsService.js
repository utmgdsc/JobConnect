import axios from "axios";


const API_URL = "http://localhost:8000/api/jobPostingsRoutes";

const getJob = async (id) => {
  const response = await axios.get(API_URL + `/${id}`);
  return response.data;
};

const JobsService = {
  getJob,
};

export default JobsService;
