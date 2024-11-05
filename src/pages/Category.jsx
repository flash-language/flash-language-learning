import { useParams } from "react-router-dom";
import { useContext } from "react";
import { WordsContext } from "../context/WordsContext";

export default function Category() {
  const { categoryName } = useParams();
  const { wordsData, deleteWord } = useContext(WordsContext);

  const categoryWords = wordsData
    ? wordsData.filter(
        (word) => word.category.toLowerCase() === categoryName.toLowerCase()
      )
    : [];

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
            </tr>
          </thead>
          <tbody>
            {categoryWords.map((word, index) => (
              <tr key={index}>
                <td>{word.english}</td>
                <td>{word.difficulty}</td>
                <td>{word.french}</td>
                <td>{word.german}</td>
                <td>{word.spanish}</td>
                <td>{word.arabic}</td>
                <td>
                <button onClick={() => deleteWord(word.id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
