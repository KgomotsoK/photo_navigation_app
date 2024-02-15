// ImageGallery.js
import React from "react";

function ImageGallery({ images, onClick }) {
  return (
    <div className="gal-display">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.urls.regular}
          alt={image.alt_description}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}

export default ImageGallery;
