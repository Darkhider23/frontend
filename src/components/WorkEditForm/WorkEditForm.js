import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkEditForm = ({ workId, refreshWorks }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    customerLink: '',
    hidden: false,
  });

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/works/${workId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching work details:', error);
      }
    };

    fetchWork();
  }, [workId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/works/${workId}`, formData);
      refreshWorks();
    } catch (error) {
      console.error('Error modifying work:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      {/* Add other form fields for description, image, customerLink, and hidden here */}
      <button type="submit">Modify Work</button>
    </form>
  );
};

export default WorkEditForm;
