// Suggestions.js
import React from "react";

function Suggestions({ suggestions, onClick }) {
  return (
    <div className="suggestions">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion"
          onClick={() => onClick(suggestion.alt_description)}
        >
          {suggestion.alt_description}
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
