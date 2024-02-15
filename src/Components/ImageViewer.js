import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTimes,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const ImageViewer = ({ image, closeHandler, handleNext, handleBack }) => {
  return (
    <div className="image-viewer-modal">
      <div className="image-viewer-content">
        <div className="top-cont">
          <FontAwesomeIcon icon={faTimes} onClick={closeHandler} />
        </div>
        <div className="contents-container">
          <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
          <img src={image} alt="" />
          <FontAwesomeIcon icon={faArrowRight} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
