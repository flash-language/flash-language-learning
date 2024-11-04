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
        }
    };

    const handleGuess = (guess) => {
        if (wordsData.length > 0 && guess === wordsData[currentIndex].french) {
            const nextIndex = (currentIndex + 1) % wordsData.length;
            setCurrentIndex(nextIndex);
        } else {
            alert('Try again!');
        }
    };

    const handleNextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % wordsData.length);
    };

    if (!wordsData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Guess the Word!</h1>
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
