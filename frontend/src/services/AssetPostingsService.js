import axios from "axios";

const API_URL = "http://localhost:8000/api/assetPostingRoutes";

const getAllAssetPostings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single asset posting by ID
const getAssetPostingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new asset posting
const createAssetPosting = async (assetPostingData) => {
  try {
    const response = await axios.post(API_URL, assetPostingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing asset posting by ID
const updateAssetPosting = async (id, assetPostingData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, assetPostingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a asset posting by ID
const deleteAssetPosting = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllAssetPostings,
  getAssetPostingById,
  createAssetPosting,
  updateAsset: updateAssetPosting,
  deleteAssetPosting,
};