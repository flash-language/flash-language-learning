import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { WordsContext } from "../context/WordsContext";

export default function Category() {
    const { categoryName } = useParams();
    const { getWordsByCategory, deleteWord } = useContext(WordsContext);
    const [categoryWords, setCategoryWords] = useState([]);


    useEffect(() => {
      const words = getWordsByCategory(categoryName);
      setCategoryWords(words);
    }, [categoryName, getWordsByCategory]);

  return (
    <>
      <div>
      <h1>Category: {categoryName}</h1>
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>Difficulty</th>
            <th>French</th>
            <th>German</th>
            <th>Spanish</th>
            <th>Arabic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryWords.map((word) => (
            <tr key={word.id}>
              <td>{word.english}</td>
              <td>{word.difficulty}</td>
              <td>{word.french}</td>
              <td>{word.german}</td>
              <td>{word.spanish}</td>
              <td>{word.arabic}</td>
              <td>
                <button onClick={() => {
                  deleteWord(word.id);
                  setCategoryWords((prevWords) => prevWords.filter(w => w.id !== word.id));
                }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
}

