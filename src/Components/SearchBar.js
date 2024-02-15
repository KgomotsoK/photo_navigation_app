// SearchBar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search images..."
      />
      <FontAwesomeIcon id="icon" icon={faSearch} onClick={onSearch} />
    </div>
  );
}

export default SearchBar;
