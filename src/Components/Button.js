// Button.js
import React from "react";

function Button({ category, handleClick, isActive }) {
  return (
    <button className={isActive ? "active" : ""} onClick={handleClick}>
      {category}
    </button>
  );
}

export default Button;
