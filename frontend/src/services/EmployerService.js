import axios from "axios";

const API_URL = "http://localhost:8000/api/employerRoutes";

const createEmployer = async (userInfo) => {
  const response = await axios.post(API_URL, userInfo);
  return response.data;
};

const getEmployer = async (id) => {
  const response = await axios.get(API_URL + `/${id}`);

  return response.data;
};

const deleteEmployer = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);
  return response.data;
};

const updateEmployer = async (id, newData) => {
  const response = await axios.put(API_URL + `/replace/${id}`, newData);
  return response.data;
};

const addEmployerInfo = async (id, newData) => {
  const response = await axios.patch(API_URL + `/add/${id}`, newData);
  return response.data;
};

const EmployerService = {
  createEmployer,
  deleteEmployer,
  getEmployer,
  updateEmployer,
  addEmployerInfo,
};

export default EmployerService;
