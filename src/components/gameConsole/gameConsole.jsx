import React from 'react';
import './gameConsole.css';
import { GAME_CONSONANTS } from './gameConsoleConstants';

const GameConsole = (props) => {
  const { onGuess, guessedLetters } = props;

  const handleClick = (event) => {
    onGuess(event?.target?.innerText);
  };

  return (
    <div className="game-console">
      {GAME_CONSONANTS.map((consonent) => {
        return (
          <button
            className="alphabetButton"
            disabled={guessedLetters?.includes(consonent)}
            key={consonent}
            onClick={handleClick}
          >
            {consonent}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(GameConsole);
