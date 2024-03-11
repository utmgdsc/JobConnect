import axios from "axios"

const API_URL = "http://localhost:8000/api/assetPostingRoutes"


const getAssets = async() => {
    const response = await axios.get(API_URL)
    console.log(response)
    return response.data
}

const AssetPostingsService = {
    getAssets
}

export default AssetPostingsService