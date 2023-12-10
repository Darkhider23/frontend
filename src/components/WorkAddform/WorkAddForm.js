// WorkAddForm.js
import React, { useState } from "react";
import axios from "axios";
import refreshWorks from "../../workUtils";
import "./WorkAddForm.css"; // Import your CSS file for styling
import ImageUploadForm from "../ImageUpload/ImageUpload";

const WorkAddForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    customerLink: "",
  });

  const [isUploadSuccess, setUploadSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/works", formData);
      closeModal(); // Close the modal when the work is added
      setTimeout(async () => {
        const refreshedWorks = await refreshWorks();
      
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error adding work:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      customerLink: "",
    });
    closeModal(); 
  };

  const handleImageUpload = (imagePath) => {
    setFormData({ ...formData, image: imagePath });
  };

  const handleUploadSuccess = () => {
    setUploadSuccess(true);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/* Form fields */}
      <div className="form-row">
        <div className="input-data">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <div className="underline"></div>
          <label>Title</label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className="underline"></div>
          <label>Description</label>
        </div>
      </div>
      <div className="form-row">
        <div className="input-data">
          <input
            type="text"
            name="customerLink"
            value={formData.customerLink}
            onChange={handleChange}
            required
          />
          <div className="underline"></div>
          <label>Customer Link</label>
        </div>
      </div>
      <div className="buttons-container">
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="Submit"  />
          </div>
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <div className="inner"></div>
            <input type="submit" value="Close" onClick={handleCancel} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkAddForm;
