import axios from "axios";
import isAuth from "../lib/isAuth";
import apiList from "../lib/apiList";
const API_URL = "http://localhost:8000/api/jobSeekersRoutes";

const createJobSeeker = async (userInfo) => {
  const response = await axios.post(API_URL, userInfo);

  return response.data;
};

const getJobSeeker = async (id) => {
  
  try {
    const response = await axios.get(API_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteJobSeeker = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);
  return response.data;
};

const updateJobSeeker = async (id, updatedUserInfo) => {
  const response = await axios.put(API_URL + `/replace/${id}`, updatedUserInfo);
  return response.data;
};

const addInfo = async (id, newData) => {
  const response = await axios.patch(API_URL + `/add/${id}`, newData);
  return response.data;
};

const fetchCurrentUser = async () => {
  try {
    const token = isAuth();
    if (!token) {
      throw new Error('User is not authenticated');
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(apiList.user, config);
    // console.log("this is the user", response)
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

const getJobSeekerNotifications = async (id) => {
  try {
    const jobSeekerData = await getJobSeeker(id);
    return jobSeekerData.notifications; // Assuming 'notifications' are stored in the job seeker document
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};


const jobSeekersService = {
  createJobSeeker,
  deleteJobSeeker,
  getJobSeeker,
  addInfo,
  updateJobSeeker,
  fetchCurrentUser,
  getJobSeekerNotifications
};

export default jobSeekersService;