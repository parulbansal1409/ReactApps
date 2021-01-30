import { MOVIES } from './mockData';

const initialState = {
  words: MOVIES,
  guessedLetters: [],
};

const playAreaReducer = (state = initialState, action) => {
  state = state || initialState;

  switch (action.type) {
    case 'GUESS_LETTER':
      return {
        ...state,
        guessedLetters: [...state.guessedLetters, action.currentGuess],
      };
    case 'RESTART':
      return {
        ...state,
        guessedLetters: [],
      };
    default:
      return state;
  }
};

export default playAreaReducer;
