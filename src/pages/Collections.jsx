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
        <Link to={`/collections/vegetables`}>
          <h1>Vegetables</h1>
          <p>Number of words in collection: {collections.vegetables.length}</p>
        </Link>
      </div>
      <div>
        <Link to={`/collections/animals`}>
          <h1>Animals</h1>
          <p>Number of words in collection: {collections.animals.length}</p>
        </Link>
      </div>
      <div>
        <Link to={`/collections/fruits`}>
          <h1>Fruits</h1>
          <p>Number of words in collection: {collections.fruits.length}</p>
        </Link>
      </div>
      <div>
        <Link to={`/collections/professions`}>
          <h1>Professions</h1>
          <p>Number of words in collection: {collections.professions.length}</p>
        </Link>
      </div>
      <div>
        <Link to={`/collections/sports`}>
          <h1>Sports</h1>
          <p>Number of words in collection: {collections.sports.length}</p>
        </Link>
      </div>
      <div>
        <Link to="/add-word-form">
          <button>Add word to My collection</button>
        </Link>
      </div>
    </>
  );
}

export default Collections;
