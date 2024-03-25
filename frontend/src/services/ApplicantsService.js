import axios from "axios";

const API_URL = "http://localhost:8000/api/jobPostingRoutes";

const getJob = async (id) => {
  const response = await axios.get(API_URL + `/${id}`);
  return response.data;
};


const deleteJob = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);
  return response.data;
};

const updateJob = async (id, newData) => {
  const response = await axios.put(API_URL + `/replace/${id}`, newData);
  return response.data;
};

const addJob = async (newData) => {
  const response = await axios.patch(API_URL + `/add/${newData}`);
  return response.data;
};

const JobsService = {
  getJob,
  updateJob,
  deleteJob,
};

export default JobsService;