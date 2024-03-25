import axios from "axios";

const API_URL = "http://localhost:8000/api/assetPostingRoutes";

const getAssets = async () => {
  const response = await axios.get(API_URL);
  console.log(response);
  return response.data;
};
const getAssetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateAsset = async (id, assetPostingData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, assetPostingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const AssetPostingsService = {
  getAssets,
  getAssetById,
  updateAsset
};

export default AssetPostingsService;
