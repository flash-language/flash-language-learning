/* eslint-disable react/prop-types */
import Card from './Card';

const ListCards = (props) => {


    if (props.words.length === 0) {
        return <p>No words to display</p>;
    }



    return (
        <div>
            <Card word={props.currentWord} />
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
