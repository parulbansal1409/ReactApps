import React from 'react';
import './word.css';

const Word = (props) => {
  const { guessedLetters, selectedWord } = props;

  return (
    <div className="word">
      {selectedWord
        ?.toUpperCase()
        ?.split('')
        ?.map((letter, i) => {
          return (
            <span className="letter" key={i}>
              {guessedLetters?.includes(letter) ? letter : ''}
            </span>
          );
        })}
    </div>
  );
};

export default React.memo(Word);
