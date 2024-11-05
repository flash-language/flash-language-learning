import React, { useState, useEffect } from 'react';
import ListCards from '../components/ListCards';
import OptionButton from '../components/OptionButton';
import axios from 'axios';
import { transformObjectToArray } from '../assets/utils.jsx';
import { shuffleArray } from '../assets/utils.jsx';

function Flashcards() {
    const [wordsData, setWordsData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [tries,setTries] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    
    const url = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/words.json";

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                const dataArr = transformObjectToArray(response.data);
                setWordsData(dataArr);         
            })
            .catch((e) => console.error('Error fetching data:', e));
    }, []);

    useEffect(() => {
        if (wordsData && wordsData.length > 0) {
            generateOptions(wordsData, currentIndex);
        }
    }, [wordsData, currentIndex]);

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
            resetGame();
        }
    }, [timeLeft])

    const generateOptions = (dataArr, index) => {
        if (dataArr && dataArr.length > 0) {
            const currentWord = dataArr[index];
            const optionsArray = shuffleArray([
                currentWord.french,
                ...dataArr
                    .filter((word, i) => i !== index)
                    .map(word => word.french)
                    .slice(0, 2)
            ]);
            setOptions(optionsArray);
            setTries(0); 
        }
    };

    const handleGuess = (guess) => {
        if (wordsData.length > 0 ) {
            if (guess === wordsData[currentIndex].french) {
                let points = 3 - tries;
                setScore((prevScore)=> prevScore + points)
                const nextIndex = (currentIndex + 1) % wordsData.length;
                setCurrentIndex(nextIndex);
            } else {
                if(tries<2){
                    setTries(tries +1)
                    alert(`Incorrect ! You have ${2-tries} tries left :)`)
                } else {
                    alert(`Out of tries ! Moving to next word`)
                    setCurrentIndex((currentIndex + 1) % wordsData.length)
                }
            }        
        }
    };

    const handleNextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % wordsData.length);
    };

    const resetGame = () => {
        setScore(0);
        setCurrentIndex(0);
        setTimeLeft(120);
        setTries(0);
    };

    if (!wordsData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Guess the Word!</h1>
            <p>Time left: {Math.floor(timeLeft/60)}:{timeLeft%60<10 ? '0' : ''}{timeLeft%60}</p>
            <p>Score: {score}</p>
            <ListCards words={wordsData} currentWord={wordsData[currentIndex]} handleNextCard={handleNextCard}/>
            <div>
                {options.map((option, index) => (
                    <OptionButton
                        key={index}
                        text={option}
                        onClick={() => handleGuess(option)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Flashcards;
