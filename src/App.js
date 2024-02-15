import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Components/Button";
import SearchBar from "./Components/SearchBar";
import Suggestions from "./Components/Suggestions";
import ImageViewer from "./Components/ImageViewer";
import ImageGallery from "./Components/ImageGallery";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const accessKey = "Add Your own unsplash access key";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.unsplash.com/topics", {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [accessKey]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (searchQuery.trim() !== "") {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=5`,
            {
              headers: {
                Authorization: `Client-ID ${accessKey}`,
              },
            }
          );
          setSuggestions(response.data.results);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [searchQuery, accessKey]);

  useEffect(() => {
    const fetchImages = async () => {
      if (activeCategory || searchQuery) {
        try {
          let apiUrl = `https://api.unsplash.com/photos?per_page=20`;
          if (activeCategory) {
            apiUrl = `https://api.unsplash.com/topics/${activeCategory}/photos?per_page=20`;
          } else if (searchQuery) {
            apiUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10`;
          }

          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          });

          setImages(response.data.results);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    };

    fetchImages();
  }, [activeCategory, searchQuery, accessKey]);

  const handleButtonClick = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveCategory("");
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setActiveCategory("");
  };

  const handlePopUpVisible = (index) => {
    setPopUpVisible(true);
    setSelectedImageIndex(index);
  };

  const handleCloseImageViewer = () => {
    setPopUpVisible(false);
  };

  return (
    <div className="App">
      <div className="buttons-container">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            category={cat.title}
            handleClick={() => handleButtonClick(cat.slug)}
            isActive={activeCategory === cat.slug}
          />
        ))}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            onClick={handleSuggestionClick}
          />
        )}
      </div>
      <h1>{activeCategory || "Search Results"} Images</h1>
      {popUpVisible && (
        <ImageViewer
          image={images[selectedImageIndex]?.urls?.regular}
          closeHandler={handleCloseImageViewer}
          handleNext={() =>
            setSelectedImageIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            )
          }
          handleBack={() =>
            setSelectedImageIndex((prevIndex) =>
              prevIndex === 0 ? images.length - 1 : prevIndex - 1
            )
          }
        />
      )}
      <ImageGallery images={images} onClick={handlePopUpVisible} />
    </div>
  );
}

export default App;
