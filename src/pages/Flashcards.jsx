import React, { useState, useEffect, useContext } from "react";
import ListCards from "../components/ListCards";
import OptionButton from "../components/OptionButton";
import { shuffleArray } from "../assets/utils.jsx";
import { logEvent } from "../assets/loggingUtils.jsx";
import { WordsContext } from "../context/WordsContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { useAuth } from "../context/AuthContext.jsx";

function Flashcards() {
  const { category } = useParams();
  const navigate = useNavigate();
  const {
    getRandomWords,
    getWordsByCategory,
    selectedLanguage,
    handleLanguageSelection,
  } = useContext(WordsContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategoryWords, setSelectedCategoryWords] = useState([]);
  const { currentUser } = useAuth();

  const userId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    // Log game start when the component is mounted
    logEvent("game_start", {
      score,
      currentWordId: selectedCategoryWords[currentIndex]?.id,
      userId: userId,
    });

    // not having the same behavior. on purpose we let comment for further investigation 
    const words = category ? getWordsByCategory(category) : getRandomWords();
    //console.log("in flashwords 1 : Selected category:", category);
    //console.log("in flashwords 2 : Filtered words:", words);
        
    setSelectedCategoryWords(words);
    resetGame();

    // Cleanup function to log game end when leaving or navigating away
    return () => {
      logEvent("game_end", {
        score,
        currentWordId: selectedCategoryWords[currentIndex]?.id,
        userId: userId,
      });
    };
  }, [category, getWordsByCategory, getRandomWords, selectedLanguage]);

  useEffect(() => {
    if (selectedCategoryWords && selectedCategoryWords.length > 0) {
      generateOptions(selectedCategoryWords, currentIndex);
    }
  }, [currentIndex, selectedCategoryWords, selectedLanguage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup the timer on unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert(`Time's up! Your score is ${score}`);
      logEvent("game_end", {
        score,
        currentWordId: selectedCategoryWords[currentIndex]?.id,
        userId: userId,
      });
      resetGame();
    }
  }, [timeLeft]);

  const generateOptions = (wordsList, index) => {
    if (wordsList && wordsList.length > 0) {
      const currentWord = wordsList[index];
      const optionsArray = shuffleArray([
        currentWord[selectedLanguage],
        ...wordsList
          .filter((_, i) => i !== index)
          .map((word) => word[selectedLanguage])
          .slice(0, 2),
      ]);
      setOptions(optionsArray);
      setTries(0);
      setShowAnswer(false);
    }
  };

  const handleGuess = (guess) => {
    if (selectedCategoryWords.length > 0) {
      const isCorrect =
        guess === selectedCategoryWords[currentIndex][selectedLanguage];
      const currentWordId = selectedCategoryWords[currentIndex]?.id;

      if (isCorrect) {
        let points = 3 - tries;
        setScore((prevScore) => prevScore + points);
        logEvent("click", { isCorrect, score, currentWordId, userId: userId });
        const nextIndex = (currentIndex + 1) % selectedCategoryWords.length;
        setCurrentIndex(nextIndex);
      } else {
        if (tries < 2) {
          setTries(tries + 1);
          alert(`Incorrect! You have ${2 - tries} tries left :)`);
          logEvent("click", { isCorrect, score, currentWordId, userId: userId });
        } else {
          setShowAnswer(true);
          logEvent("click", { isCorrect, score, currentWordId, userId: userId });
          setTimeout(handleNextCard, 3000); // penalty of 3 seconds
        }
      }
    }
  };

  const handleNextCard = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % selectedCategoryWords.length
    );
    setTries(0);
    setShowAnswer(false);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setTimeLeft(60);
    setTries(0);
    setShowAnswer(false);
  };

  if (!selectedCategoryWords) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Select a language
        </h1>
        <Button.Group>
          <Button onClick={() => handleLanguageSelection("french")}>French</Button>
          <Button onClick={() => handleLanguageSelection("german")}>German</Button>
          <Button onClick={() => handleLanguageSelection("spanish")}>Spanish</Button>
          <Button onClick={() => handleLanguageSelection("arabic")}>Arabic</Button>
        </Button.Group>

        <h1 className="text-2xl font-bold mb-6 text-center mt-7">Guess the Word!</h1>

        <div className="flex flex-row space-x-24 m-7">
          <h5 className="text-2xl font-bold tracking-tight text-gray-500 dark:text-white text-center">
            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </h5>

          <h5 className="text-2xl font-bold tracking-tight text-gray-500 dark:text-white text-center">
            Score: {score}
          </h5>
        </div>

        <ListCards
          words={selectedCategoryWords}
          currentWord={selectedCategoryWords[currentIndex]}
          handleNextCard={handleNextCard}
          showAnswer={showAnswer}
        />

        <div className="w-full max-w-md flex justify-center m-5">
          <Button.Group className="max-w-sm content-center">
            {options.map((option, index) => (
              <Button
                color="gray"
                key={index}
                onClick={() => handleGuess(option)}
              >
                <OptionButton text={option} />
              </Button>
            ))}
          </Button.Group>
        </div>
      </div>
    </>
  );
}

export default Flashcards;
