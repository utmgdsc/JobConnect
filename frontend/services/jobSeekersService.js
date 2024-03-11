import axios from "axios"

const API_URL = "/api/jobSeekers"

const createJobSeeker = async(userInfo) => {
    const response = await axios.post(API_URL, userInfo)

    return response.data
}

const getJobSeeker = async(id) => {
    const response = await axios.get(API_URL + `/${id}`)

    return response.data
}

const deleteJobSeeker = async(id) => {
    const resonse = await axios.delete(API_URL + `/${id}`)
    return response.data
}

const addInfo = async(newData) => {
    const response = await axios.patch(API_URL + `/add/${id}` )
    return response.data
}