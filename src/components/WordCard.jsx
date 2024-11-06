/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'flowbite-react';

const WordCard = ({ word, showAnswer }) => {
    return (

        <>

            <Card
                className="max-w-sm"
                imgAlt={word.english}
                imgSrc={word.imageUrl}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {word.english}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {showAnswer && word.french}
                </p>
            </Card>

        </>

    );
};

export default WordCard;
