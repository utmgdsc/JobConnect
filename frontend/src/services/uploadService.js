import axios from 'axios';


const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(file)
  const response = await axios.post(
    "http://localhost:8000/api/upload-files",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

const getFiles = async () => {
  const response = await axios.get("http://localhost:8000/api/get-files");
  return response.data;
}

const getFileById = async (id) => {
  const response = await axios.get(`http://localhost:8000/api/get-file/${id}`);
  return response.data;
}

const uploadService = {
  uploadResume,
  getFiles,
  getFileById,
};

export default uploadService;