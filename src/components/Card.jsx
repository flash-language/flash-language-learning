import React from 'react';

const Card = ({ word, showAnswer }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', textAlign: 'center', margin: 'auto', width: '300px' }}>
            <h2>{word.english}</h2>
            <div>
                <img 
                    src={word.image} 
                    alt={word.english} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '20px' }} 
                />
            </div>
            <p style={{ color: 'green'}}>{showAnswer && word.french}</p>
        </div>
    );
};

export default Card;
