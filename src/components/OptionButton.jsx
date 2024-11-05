import React from 'react';

const OptionButton = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{ display: 'block', margin: '10px auto', padding: '10px 20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f0f0f0', color: '#000' }}
        >
            {text}
        </button>
    );
};

export default OptionButton;
