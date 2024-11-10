/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'flowbite-react';
import { WordsContext } from "../context/WordsContext.jsx";
import { useContext } from 'react';

const WordCard = ({ word, showAnswer }) => {
    const {selectedLanguage } = useContext(WordsContext);
    return (

        <>
            <Card
                className="w-64 h-80 bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4"
                imgAlt={word.english}
                imgSrc={`/public/${word.english}.png`}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    {word.english}
                </h5>
                <h5 className="text-2xl font-bold text-green-500 dark:text-green-400 text-center">
                    {showAnswer && word[selectedLanguage]}
                </h5>
            </Card>

        </>

    );
};

export default WordCard;
