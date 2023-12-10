import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./WorkList.css";

const WorkList = () => {
  const [works, setWorks] = useState([]);

  const fetchWorks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/works");
      setWorks(response.data);
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };
  const handleDelete = async (deletedWorkId) => {
    try {
      setWorks((prevWorks) =>
        prevWorks.filter((work) => work._id !== deletedWorkId)
      );
    } catch (error) {
      console.error("Error updating works after deletion:", error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [works]);

  return (
    <div className="work-list-container">
      <div className="card-container">
        {Array.isArray(works) ? (
          works.map((work) => (
            <Card key={work._id} work={work} ondDelete={handleDelete} />
          ))
        ) : (
          <p>No works available</p>
        )}
      </div>
    </div>
  );
};

export default WorkList;
