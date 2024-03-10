import axios from "axios"

const API_URL = "http://localhost:8000/api/employer"

const createEmployer = async (userInfo) => {
    console.log(userInfo)
    console.log(API_URL)

    const response = await axios.post(API_URL, userInfo)
    console.log(response)
    return response.data
}

const getEmployer = async (id) => {
    const response = await axios.get(API_URL + `/${id}`)

    return response.data
}

const deleteEmployer = async (id) => {
    const response = await axios.delete(API_URL + `/${id}`)
    return response.data
}

const addInfo = async (newData) => {
    const response = await axios.patch(API_URL + `/add/${newData}`)
    return response.data
}

const EmployerService = {
    createEmployer,
    deleteEmployer,
    getEmployer,
    addInfo
}

export default EmployerService