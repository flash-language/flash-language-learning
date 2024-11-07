import React, { useContext } from "react";
import { WordsContext } from "../context/WordsContext";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";

function Collections({ onSelectCategory }) {
  const { getCollections, setCategory } = useContext(WordsContext);
  const collections = getCollections();
  const navigate = useNavigate();

  const handleCategorySelection = (category) => {
    setCategory(category);
    navigate(`/flashcards/${category}`);
  };

  const handleViewCategory = (category) => {
    navigate(`/collections/${category}`);
  };




  return (

    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {Object.keys(collections).map((category) => (
          

          <Card key={category}
            className="max-w-sm"
            imgAlt={category}
            imgSrc={`src/assets/images/${category}.png`}
    

          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Number of words in this collection: {collections[category].length}
            </p>

            <div className="mt-4 flex space-x-3 lg:mt-6">
              <a
                onClick={() => handleCategorySelection(category)}
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Play
              </a>

              <a
                onClick={() => handleViewCategory(category)}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                View Words
              </a>
            </div>

          </Card>


        ))}
      </div>
    </>
  );
}

export default Collections;
