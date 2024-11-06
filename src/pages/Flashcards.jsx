import React, { useState, useEffect, useContext } from 'react';
import ListCards from '../components/ListCards';
import OptionButton from '../components/OptionButton';
import { shuffleArray } from '../assets/utils.jsx';
import Collections from './Collections.jsx';
import {logEvent} from '../assets/loggingUtils.jsx';
import { WordsContext } from '../context/WordsContext.jsx';

function Flashcards() {
    const { wordsData, selectedCategory, getWordsByCategory } = useContext(WordsContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [tries,setTries] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [showAnswer, setShowAnswer] = useState(false);
    const selectedCategoryWords = getWordsByCategory();

    useEffect(() => {
        if (selectedCategoryWords && selectedCategoryWords.length > 0) {
            generateOptions(wordsData, currentIndex);
        }
    }, [wordsData, selectedCategory, currentIndex]);

    useEffect(()=>{
        const timer = setInterval(() => {
            setTimeLeft((prevTime)=>{
                return prevTime > 0 ? prevTime - 1 : 0
            })
            console.log(timeLeft)
        }, 1000);
        return () => clearInterval(timer);
    },[]);

    useEffect(()=>{
        if(timeLeft === 0){
            alert(`Time's up ! Your score is ${score}`)
            logEvent("game_end", { score, currentWordId: selectedCategoryWords[currentIndex]?.id });
            resetGame();
        }
    }, [timeLeft])

    const generateOptions = (wordsData, index) => {
        if (wordsData && wordsData.length > 0 && selectedCategoryWords.length > 0) {
            const currentWord = selectedCategoryWords[index];
            const optionsArray = shuffleArray([
                currentWord.french,
                ...wordsData
                    .filter((word, i) => i !== index)
                    .map(word => word.french)
                    .slice(0, 2)
            ]);
            setOptions(optionsArray);
            setTries(0);
            setShowAnswer(false); 
        }
    };

    const handleGuess = (guess) => {
        if (selectedCategoryWords.length > 0 ) {
            const isCorrect = guess === selectedCategoryWords[currentIndex].french;
            const currentWordId = selectedCategoryWords[currentIndex]?.id;

            if (isCorrect) {
                let points = 3 - tries;
                setScore((prevScore)=> prevScore + points)
                logEvent("click", { isCorrect, score, currentWordId });
                const nextIndex = (currentIndex + 1) % selectedCategoryWords.length;
                setCurrentIndex(nextIndex);
            } else {
                if(tries<2){
                    setTries(tries +1)
                    alert(`Incorrect ! You have ${2-tries} tries left :)`)
                    logEvent("click", { isCorrect, score, currentWordId });
                } else {
                    setShowAnswer(true);
                    logEvent("click", { isCorrect, score, currentWordId });
                    setTimeout(() => {
                        return handleNextCard()
                    }, 3000); // what a penalty of 3 seconds hihi :D
                }
            }        
        }
    };

    const handleNextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedCategoryWords.length);
        setTries(0);
        setShowAnswer(false);
    };

    const resetGame = () => {
        setScore(0);
        setCurrentIndex(0);
        setTimeLeft(120);
        setTries(0);
        setShowAnswer(false);
    };

    if (!selectedCategoryWords) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Guess the Word!</h1>
            <p>Time left: {Math.floor(timeLeft/60)}:{timeLeft%60<10 ? '0' : ''}{timeLeft%60}</p>
            <p>Score: {score}</p>
            <ListCards
                words={selectedCategoryWords}
                currentWord={selectedCategoryWords[currentIndex]}
                handleNextCard={handleNextCard}
                showAnswer={showAnswer}
            />
            <div>
                {options.map((option, index) => (
                    <OptionButton
                        key={index}
                        text={option}
                        onClick={() => handleGuess(option)}
                    />
                ))}
            </div>
            <Collections />
        </div>
    );
}

export default Flashcards;
