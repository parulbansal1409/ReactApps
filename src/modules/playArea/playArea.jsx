import React, { useState, useEffect } from 'react';
import './playArea.css';
import { connect } from 'react-redux';
import {
  Trap,
  Timer,
  Word,
  Restart,
  GameConsole,
  Result,
} from '../../components';
import { RESULTS } from '../../components/result/result';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PlayArea = (props) => {
  const {
    words,
    handleGuess,
    guessedLetters,
    handleRestart,
    hangleSaveGame,
  } = props;

  const getSelectedWord = () => {
    return words[Math.floor(Math.random() * words.length)]?.toUpperCase();
  };

  const [word, setWord] = useState(getSelectedWord());
  const [rightGuesses, setRightGuesses] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [result, setResult] = useState(null);
  const [shouldStopTimer, setShouldStopTimer] = useState(false);

  useEffect(() => {
    if (guessedLetters.length) {
      const lastGuess = guessedLetters[guessedLetters.length - 1];
      const isGuessMatched = word?.includes(lastGuess);
      if (isGuessMatched) {
        const rightAttempts = rightGuesses + 1;
        // Compair with the unique letters only.
        if (rightAttempts === [...new Set(word)]?.length) {
          setResult(RESULTS.WINNER.KEY);
          setShouldStopTimer(true);
        }
        setRightGuesses(rightAttempts);
      } else {
        const wrongAttempts = wrongGuesses + 1;
        if (wrongAttempts === 6) {
          setResult(RESULTS.LOSER.KEY);
          setShouldStopTimer(true);
        }
        setWrongGuesses(wrongAttempts);
      }
    }
  }, [guessedLetters?.length]);

  // Reset all the values to restart the game.
  const restartGame = () => {
    setWord(getSelectedWord());
    setRightGuesses(0);
    setWrongGuesses(0);
    handleRestart();
    setResult(null);
    setShouldStopTimer(false);
  };

  // Callback gets called on every time over.
  const onTimerOverCallback = () => {
    const wrongAttempts = wrongGuesses + 1;
    if (wrongAttempts === 6) {
      setResult(RESULTS.LOSER.KEY);
      setShouldStopTimer(true);
    }
    setWrongGuesses(wrongAttempts);
  };

  const saveHangman = () => {
    const data = {
      date: moment().format('DD/MM/YYYY'),
      error: wrongGuesses,
      won: !!result,
    };
    hangleSaveGame(data);
  };

  // Restart everything on unmount. (Like returning back from history page.)
  useEffect(() => {
    return restartGame;
  }, []);

  return (
    <div className="playArea">
      <div class ="hangmanWrapper">
        <Timer
            guesses={guessedLetters}
            onTimerOver={onTimerOverCallback}
            shouldStopTimer={shouldStopTimer}
          />
        <Trap missed={wrongGuesses} />
        <Restart onRestart={restartGame} />
      </div>     
      <div className="wrapper">        
        <Word selectedWord={word} guessedLetters={guessedLetters} />        
      </div>
      {result ? (
        <Result result={result} />
      ) : (
        <GameConsole onGuess={handleGuess} guessedLetters={guessedLetters} />
      )}
      <div className="footerBUttons">
        <Link className = "backLink" to="/history">Game Result Board</Link>
        <button onClick={saveHangman}> Save Game</button>        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    words: state?.playArea?.words,
    guessedLetters: state?.playArea?.guessedLetters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGuess: (currentGuess) =>
      dispatch({ type: 'GUESS_LETTER', currentGuess }),
    handleRestart: () => dispatch({ type: 'RESTART' }),
    hangleSaveGame: (gameDetails) =>
      dispatch({ type: 'SAVE_GAME', gameDetails }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayArea));
