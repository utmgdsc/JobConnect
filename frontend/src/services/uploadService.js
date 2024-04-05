import axios from 'axios';


const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(file)
  const response = await axios.post(
    "http://localhost:8000/upload-files",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response.data);
  return response.data;
}

const uploadService = {
  uploadResume,
};

export default uploadService;