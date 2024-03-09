import axios from "axios"

const API_URL = "http://localhost:8000/api/jobSeekers"


const getJobSeeker = async(id) => {
    const response = await axios.get(API_URL + `/${id}`)
    console.log("hello")

    return response.data
}

const jobSeekersService = {
    createJobSeeker,
    deleteJobSeeker,
    getJobSeeker,
    addInfo
}

export default jobSeekersService