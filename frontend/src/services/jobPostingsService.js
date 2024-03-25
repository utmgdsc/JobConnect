import axios from "axios";

const API_URL = "http://localhost:8000/api/jobPostingRoutes"; // Base URL for job postings API

// Fetch all job postings
const getAllJobPostings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single job posting by ID
const getJobPostingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new job posting
const createJobPosting = async (jobPostingData) => {
  try {
    const response = await axios.post(API_URL, jobPostingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing job posting by ID
const updateJobPosting = async (id, jobPostingData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, jobPostingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a job posting by ID
const deleteJobPosting = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const jobPostingsService = {
  getAllJobPostings,
  getJobPostingById,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
};
export default jobPostingsService;
