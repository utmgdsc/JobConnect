import axios from "axios"

const API_URL = "http://localhost:8000/api/jobSeekersRoutes"

const createJobSeeker = async(userInfo) => {
    const response = await axios.post(API_URL, userInfo)

    return response.data
}

const getJobSeeker = async(id) => {
    const response = await axios.get(API_URL + `/${id}`)

    return response.data
}

const deleteJobSeeker = async(id) => {
    const response = await axios.delete(API_URL + `/${id}`)
    return response.data
}

const updateJobSeeker = async (id, updatedUserInfo) => {
    const response = await axios.put(API_URL + `/${id}`, updatedUserInfo);
    return response.data;
}


const addInfo = async(id, newData) => {
    const response = await axios.patch(API_URL + `/add/${id}`, newData)
    return response.data
}

const jobSeekersService = {
    createJobSeeker,
    deleteJobSeeker,
    getJobSeeker,
    addInfo,
    updateJobSeeker
}

export default jobSeekersService