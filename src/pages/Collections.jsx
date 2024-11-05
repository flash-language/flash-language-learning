/* eslint-disable react/prop-types */
import { WordsContext } from "../context/WordsContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Collections() {
  
  const { getCollections } = useContext(WordsContext);
  const collections = getCollections();

  return (
    <>
    <div>
        <h1>Select a category to play: </h1>
    </div>
      <div>
          <h1>Vegetables</h1>
          <p>Number of words in collection: {collections.vegetables.length}</p>
        <Link to={`/collections/vegetables`}>
        <button>See words</button>
        </Link>
      </div>
      <div>
          <h1>Animals</h1>
          <p>Number of words in collection: {collections.animals.length}</p>
        <Link to={`/collections/animals`}>
          <button>See words</button>
        </Link>
      </div>
      <div>
          <h1>Fruits</h1>
          <p>Number of words in collection: {collections.fruits.length}</p>
        <Link to={`/collections/fruits`}>
          <button>See words</button>
        </Link>
      </div>
      <div>
          <h1>Professions</h1>
          <p>Number of words in collection: {collections.professions.length}</p>
        <Link to={`/collections/professions`}>
          <button>See words</button>
        </Link>
      </div>
      <div>
          <h1>Sports</h1>
          <p>Number of words in collection: {collections.sports.length}</p>
        <Link to={`/collections/sports`}>
          <button>See words</button>
        </Link>
      </div>
      <div>
        <Link to="/add-word-form">
          <button>Add word to a collection</button>
        </Link>
      </div>
    </>
  );
}

export default Collections;
