// MainPage.js
import React, { useState } from "react";
import Card from "../Card/Card";
import WorkAddForm from "../WorkAddform/WorkAddForm";
import WorkList from "../WorkList/WorkList";
import refreshWorks from "../../workUtils";
import "./MainPage.css";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="header">
        <h1>Works</h1>
        <div className="add-work-form"></div>
        <button className="model-btn" onClick={openModal}>
          <img src="add-btn.png" alt="" />
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <WorkAddForm
                closeModal={closeModal}
                refreshWorks={refreshWorks}
              />
            </div>
          </div>
        )}
      </div>

      <div className="work-list">
        <WorkList />
      </div>
    </div>
  );
};

export default MainPage;
