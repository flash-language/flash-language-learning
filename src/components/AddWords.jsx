// AddWords.js
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordsContext } from "../context/WordsContext";

export default function AddWords() {
  const navigate = useNavigate();
  const { addWord } = useContext(WordsContext);

  // Local state for form inputs
  const [english, setEnglish] = useState("");
  const [category, setCategory] = useState("vegetables");
  const [difficulty, setDifficulty] = useState("common");
  const [french, setFrench] = useState("");
  const [german, setGerman] = useState("");
  const [spanish, setSpanish] = useState("");
  const [arabic, setArabic] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newWord = { english, category, difficulty, french, german, spanish, arabic };
    console.log(newWord);

    // Call addWord from context
    addWord(newWord).then(() => {
      // Clear form inputs
      setEnglish("");
      setCategory("");
      setDifficulty("");
      setFrench("");
      setGerman("");
      setSpanish("");
      setArabic("");

      // Navigate to collections
      navigate("/collections");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        English:
        <input
          type="text"
          name="english"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)} name="category">
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="animals">Animals</option>
          <option value="profession">Profession</option>
          <option value="sports">Sports</option>
        </select>
      </label>
      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} name="difficulty">
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="very common">Very Common</option>
        </select>
      </label>
      <label>
        French:
        <input
          type="text"
          name="french"
          value={french}
          onChange={(e) => setFrench(e.target.value)}
        />
      </label>
      <label>
        German:
        <input
          type="text"
          name="german"
          value={german}
          onChange={(e) => setGerman(e.target.value)}
        />
      </label>
      <label>
        Spanish:
        <input
          type="text"
          name="spanish"
          value={spanish}
          onChange={(e) => setSpanish(e.target.value)}
        />
      </label>
      <label>
        Arabic:
        <input
          type="text"
          name="arabic"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
        />
      </label>
      <button type="submit">Add Word</button>
    </form>
  );
}
