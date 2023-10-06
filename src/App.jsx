import './APP.CSS';
import { useState } from 'react';

const App = () => {

    // Make flashCards to be useState so that it can be shuffled later
    const [flashCards, setFlashCards] = useState(
      [{id:1, word:'熊猫', translation:'panda', color: '#a7eaaed9', img:'https://www.creativefabrica.com/wp-content/uploads/2023/05/19/Cute-Adorable-Baby-Panda-70054573-1.png'}, 
      {id:2, word:'苹果', translation:'apple',color: '#a7eaaed9', img:'https://www.collinsdictionary.com/images/full/apple_158989157.jpg'},
      {id:3, word:'手机', translation:'cellphone', color: '#a7eaaed9', img:'https://m.media-amazon.com/images/I/51-nHIqR7GL.jpg' },
      {id:4, word:'玩具', translation:'toy',color: '#a7eaaed9', img:'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/89624/95788/Woody-Toy-Story-Cardboard-Cutout-Party-Decorations-buy-now-at-starstills__12633.1644939667.jpg?c=2'},
      {id:5, word:'打篮球', translation:'play basketball', color:'#e6e26fd9', img:'https://img.freepik.com/premium-vector/vector-illustration-kids-playing-basketball_723224-732.jpg?w=2000'},
      {id:6, word:'踢足球', translation:'play soccer', color:'#e6e26fd9', img:'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/38244/schoolboys-soccer-football-clipart-xl.png'},
      {id:7, word:'开车', translation:'drive',color:'#e6e26fd9', img:'https://static.vecteezy.com/system/resources/previews/008/386/524/original/cartoon-boy-driving-red-car-free-vector.jpg'},
      {id:8, word:'美丽', translation:'beautiful', color:'#ea9177d9', img:'https://img.freepik.com/premium-photo/portrait-painting-beautiful-woman-multicolored-tones-abstract-picture-beautiful-girl_769803-2.jpg?w=2000'},
      {id:9, word:'开心', translation:'happy',color:'#ea9177d9', img:'https://img.freepik.com/free-vector/happy-boy-jumping-colorful-background_1308-100697.jpg?w=2000'},
      {id:10, word:'友善', translation:'friendly', color:'#ea9177d9', img:'https://pictures.abebooks.com/isbn/9781934277188-us.jpg'}]
    );

    const [currentCardId, setCurrentCardId] = useState(0);
    const [showTranslation, setShowTranslation] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctStreak, setCorrectStreak] = useState(0);

    const currentFlashCard = flashCards[currentCardId];

    // handleCardClick to show translation
    const handleCardClick = () => {
        setShowTranslation(!showTranslation);
    }

    // handleNextCard to show next
    const handleNextCard = () => {
        const nextCardId = currentCardId + 1;
        if (nextCardId < flashCards.length) {
            setCurrentCardId(nextCardId);
            setShowTranslation(false);
            setUserAnswer('');
            setShowResult(false);
        }
    };

  // handlePreviousCard to go to previous card
    const handlePreviousCard = () => {
        const previousCardId = currentCardId - 1;
        if (previousCardId >= 0) {
            setCurrentCardId(previousCardId);
            setShowTranslation(false);
            setShowResult(false);
        }
    };

  // handleSubmit to show user's resluts and streak
    const handleSubmit = (event) => {
        event.preventDefault();
        const currentCard = flashCards[currentCardId];
        if (userAnswer === currentCard.translation) {
            setIsCorrect(true);
            setCorrectStreak(correctStreak + 1);
        } else {
            setIsCorrect(false);
        }
        setShowResult(true);
    };

    //Implement Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // handleShuffleCards to shuffle the flashcards
    const handleShuffleCards = () => {
        const shuffledCards = shuffleArray([...flashCards]);
        setFlashCards(shuffledCards);
    };

    return (
        <div className='App'>
            <h2>Welcome to the Chinese Learning Aid!</h2>
            <h3>You will practice memorizing these vocab today!</h3>
            <h4>Number of card: {flashCards.length}
                <button type='shuffle' onClick={handleShuffleCards}>Shuffle Cards</button>
            </h4>
            
            <div className='card-container' onClick={handleCardClick} style={{ backgroundColor: currentFlashCard.color }}>
                <div className={'flashcard' }>
                    <div className='card-text'>
                        {showTranslation ? (
                            <>
                                <p>{currentFlashCard.translation}</p>
                                <img src={currentFlashCard.img} alt="Translation" />
                            </>
                        ) : (
                            <p>{currentFlashCard.word}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='card-changes'>
                <button type="previous-card" onClick={handlePreviousCard}>←</button>
                <button type="next" onClick={handleNextCard}>⭢</button>
            </div>
            <form onSubmit={handleSubmit}>
                Your answer:
                <input type='text' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
            {showResult && (
                <div className='result' style={{ backgroundColor: isCorrect ? 'green' : 'red' }}>
                    {isCorrect ? 'Correct!' : "Incorrect!"}
                </div>
            )}
            <h4>Current Correct Streak: {correctStreak}</h4>
        </div>
    )
}

export default App;
