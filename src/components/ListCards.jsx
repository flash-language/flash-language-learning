/* eslint-disable react/prop-types */
import WordCard from './WordCard';

const ListCards = (props) => {


    if (props.words.length === 0) {
        return <p>No words to display</p>;
    }

    return (
        <div>
            <WordCard word={props.currentWord} showAnswer={props.showAnswer}/>
            <button 
                onClick={props.handleNextCard} 
                style={{ display: 'block', margin: '20px auto', padding: '10px 20px' }}
            >
                Next Card
            </button>
        </div>
    );
};

export default ListCards;
