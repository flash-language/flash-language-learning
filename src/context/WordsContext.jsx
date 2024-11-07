// WordsContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { transformObjectToArray } from "../assets/utils.jsx";

const WordsContext = createContext();

function WordsProvider({ children }) {
  const [wordsData, setWordsData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [selectedLanguage, setSelectedLanguage] = useState('french')
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

  function getWordsByCategory(category) {
    console.log("in context 1: Filtering words for category:", category);
    
    if (!category) return getRandomWords(); 
    return wordsData ? wordsData.filter((word) => word.category === category) : [];
    
  }
  // we let comments on purpose for further investigation
  function setCategory(category) {
    setSelectedCategory(category);
    //console.log("in context 2: category inside setCategory",category)  
    //console.log("in context 3: selectedCategory inside setCategory",selectedCategory)  
  }
  //console.log("in context 4: selectedCategory inside setCategory",selectedCategory)  

  function getRandomWords(count = 20) {
    if (!wordsData) return []; 
    const shuffled = [...wordsData].sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count);
  }

  function handleLanguageSelection(language) { 
    setSelectedLanguage(language); 
  }

  // Add a new word to Firebase
  async function addWord(newWord) {
    try {
      const response = await axios.post(url, newWord);
      setWordsData((prevWords) => [...prevWords, newWord]);
    } catch (e) {
      return console.error("Error adding word:", e);
    }
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
        selectedCategory,
        getCollections,
        setCategory,
        getWordsByCategory,
        addWord,
        deleteWord,
        getRandomWords,
        selectedLanguage,
        handleLanguageSelection,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}

export { WordsContext, WordsProvider };
