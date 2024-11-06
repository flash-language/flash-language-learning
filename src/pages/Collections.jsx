import React, { useContext } from "react";
import { WordsContext } from "../context/WordsContext";
import { useNavigate } from "react-router-dom";

function Collections({ onSelectCategory }) {
  const { getCollections, setCategory } = useContext(WordsContext);
  const collections = getCollections();
  const navigate = useNavigate();

  const handleCategorySelection = (category) => {
    setCategory(category); 
    navigate('/flashcards'); 
  };

  const handleViewCategory = (category) => {
    navigate(`/collections/${category}`);
  };

  return (
    <div>
      <h1>Select a category to play: </h1>
      {Object.keys(collections).map((category) => (
        <div key={category}>
          <button onClick={() => handleCategorySelection(category)}>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <p>Number of words in collection: {collections[category].length}</p>
          </button>
          <button onClick={() => handleViewCategory(category)}>
            View Words
          </button>
        </div>
      ))}
    </div>
  );
}

export default Collections;
