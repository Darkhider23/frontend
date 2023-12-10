// Card.js
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import ImageUploadForm from "../ImageUpload/ImageUpload";
import refreshWorks from "../../workUtils";
import "./Card.css";

const Card = ({ work, onDelete }) => {
  const { _id, title, description, images, customerLink, hidden } = work;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedLink, setEditedLink] = useState(customerLink);

  const [isHidden, setIsHidden] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const handleHideClick = () => {
    if (isHidden) setIsHidden(false);
    else setIsHidden(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditMode(false);
  };

  const handleImageUpload = (imagePaths) => {
    console.log("Images uploaded. Paths:", imagePaths);
  };

  const handleImageDelete = async (imageName) => {
    try {
      await axios.delete(
        `http://localhost:3001/works/${_id}/images/${imageName}`
      );
      await refreshWorks();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleEditClick = () => {
    setEditMode(true);
    openModal();
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/works/${_id}`);
      refreshWorks();
      onDelete();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Perform the save operation using axios or your preferred method
      await axios.put(`http://localhost:3001/works/${_id}`, {
        title: editedTitle,
        description: editedDescription,
        customerLink: editedLink,
      });
      // Refresh the works after saving changes
      await refreshWorks();
      closeModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const modalStyles = {
    overlay: {
      margin: "auto",
      width: "100%",
      background: "linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)",
    },
    content: {
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "none",
      background: "transparent",
      overflow: "hidden",
    },
  };

  return (
    <div className={`card ${isHidden ? "hidden" : ""}`}>
      <div>
        <div className="title">
          <h2>{title}</h2>
          <button className="delete-btn" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 30 30"
            >
              <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
            </svg>
          </button>
        </div>
        <div className="middle">
          <p>{description}</p>
          <a href={customerLink} target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 72 72"
            >
              <path d="M 43 12 C 40.791 12 39 13.791 39 16 C 39 18.209 40.791 20 43 20 L 46.34375 20 L 35.171875 31.171875 C 33.609875 32.733875 33.609875 35.266125 35.171875 36.828125 C 35.951875 37.608125 36.977 38 38 38 C 39.023 38 40.048125 37.608125 40.828125 36.828125 L 52 25.65625 L 52 29 C 52 31.209 53.791 33 56 33 C 58.209 33 60 31.209 60 29 L 60 16 C 60 13.791 58.209 12 56 12 L 43 12 z M 23 14 C 18.037 14 14 18.038 14 23 L 14 49 C 14 53.962 18.037 58 23 58 L 49 58 C 53.963 58 58 53.962 58 49 L 58 41 C 58 38.791 56.209 37 54 37 C 51.791 37 50 38.791 50 41 L 50 49 C 50 49.551 49.552 50 49 50 L 23 50 C 22.448 50 22 49.551 22 49 L 22 23 C 22 22.449 22.448 22 23 22 L 31 22 C 33.209 22 35 20.209 35 18 C 35 15.791 33.209 14 31 14 L 23 14 z"></path>
            </svg>
          </a>
        </div>

        <button className="gallery-btn" onClick={openModal}>
          Open Gallery
        </button>
        <button className="hide-btn" onClick={handleHideClick}>
          <img
            src="hide-btn.png"
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
        </button>
        <button className="edit-btn" onClick={handleEditClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 30 30"
          >
            <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
          </svg>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Gallery Modal"
        style={modalStyles}
      >
        {editMode ? (
          <div className="edit-form">
            <label htmlFor="editedTitle">Title:</label>
            <input
              type="text"
              id="editedTitle"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <label htmlFor="editedDescription">Description:</label>
            <input
              id="editedDescription"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></input>
            <label htmlFor="editedLink">Customer Link:</label>
            <input
              type="text"
              id="editedLink"
              value={editedLink}
              onChange={(e) => setEditedLink(e.target.value)}
            />
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        ) : (
          <>
            <div className="image-list">
              <div className="image-container">
                <img
                  src={`http://localhost:3001/public/uploads/${images[currentIndex]}`}
                  alt={`${title}-image-${currentIndex}`}
                />
                <button onClick={() => handleImageDelete(images[currentIndex])}>
                  <img src="delete-button.png" alt="" />
                </button>
              </div>
            </div>
            <ImageUploadForm
              onUpload={handleImageUpload}
              onUploadSuccess={closeModal}
              title={title}
            />
          </>
        )}

        <button className="close-btn" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 50 50"
          >
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
          </svg>
        </button>

        {!editMode && (
          <>
            <button className="prev-btn" onClick={prevImage}>
              {"<"}
            </button>
            <button className="next-btn" onClick={nextImage}>
              {">"}
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Card;
