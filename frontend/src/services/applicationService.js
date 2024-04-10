import axios from "axios";

const API_URL = "http://localhost:8000/api/applicationRoutes";

const getApplication = async (id) => {
    const response = await axios.get(API_URL);
    return response.data;
};

const deleteApplication = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`);
    return response.data;
};

const updateApplication = async (id, newData) => {
    const response = await axios.put(API_URL + `/replace/${id}`, newData);
    return response.data;
};

const addApplication = async (newData) => {
    const response = await axios.post(API_URL, newData);
    return response.data;
};

const ApplicationsService = {
    getApplication,
    updateApplication,
    deleteApplication,
    addApplication,
};

export default ApplicationsService;
