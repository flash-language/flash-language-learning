// WordsContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { transformObjectToArray } from "../assets/utils.jsx";

const WordsContext = createContext();

function WordsProvider({ children }) {
  const [wordsData, setWordsData] = useState(null);
  const url = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/words.json";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const dataArr = transformObjectToArray(response.data);
        setWordsData(dataArr);
      })
      .catch((e) => console.error("Error fetching data:", e));
  }, []);

  // Divide words into collections by category property
  function getCollections() {
    const collections = wordsData || [];
    return {
      vegetables: collections.filter((element) => element.category === "vegetables"),
      animals: collections.filter((element) => element.category === "animals"),
      fruits: collections.filter((element) => element.category === "fruits"),
      sports: collections.filter((element) => element.category === "sports"),
      professions: collections.filter((element) => element.category === "professions"),
    };
  }

  // Add a new word to Firebase
  function addWord(newWord) {
    return axios.post(url, newWord)
      .then((response) => {
        setWordsData((prevWords) => [...prevWords, newWord]);
      })
      .catch(e => console.error("Error adding word:", e));
  }

  //delete word from firebase
  const deleteWord = (wordId) => {
    axios
      .delete(`https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/words/${wordId}.json`)
      .then(() => {
        // Update state to remove the word locally
        setWordsData((prevWords) => prevWords.filter((word) => word.id !== wordId));
      })
      .catch((e) => console.error("Error deleting word:", e));
  };

  return (
    <WordsContext.Provider
      value={{
        wordsData,
        getCollections,
        addWord,
        deleteWord,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}

export { WordsContext, WordsProvider };
