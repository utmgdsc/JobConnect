import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const FileUploadInput = ({ updateRegisterInfo, registerInfo }) => { // Accept registerInfo as a prop
  const [resumeFile, setResumeFile] = useState(null); // State to store the file data

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const reader = new FileReader();

    reader.onload = (event) => {
      // When the file is loaded, set the file data in state
      const base64Data = event.target.result.split(',')[1]; // Get the base64 data excluding the data URL prefix
      setResumeFile(base64Data); // Set the base64 data in state
      // Update registerInfo with the base64 data
      updateRegisterInfo({ ...registerInfo, resume: base64Data });
    };

    reader.readAsDataURL(file); // Read the file as a data URL (binary data)
  };

  return (
    <Form.Control
      type="file"
      accept=".pdf"
      placeholder="Resume"
      onChange={handleFileChange} // Call handleFileChange when a file is selected
    />
  );
};

export default FileUploadInput;
