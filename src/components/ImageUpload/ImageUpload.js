// ImageUploadForm.js
import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css";

const ImageUploadForm = ({ onUpload, onUploadSuccess, title }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("title", title);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      try {
        const response = await axios.post(
          "http://localhost:3001/works/upload",
          formData
        );
        console.log("Upload response:", response);
        onUpload(response.data.imageNames);
        onUploadSuccess();
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        multiple // Allow multiple file selection
      />
      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploadForm;
