import { combineReducers } from 'redux';
import playAreaReducer from './playAreaReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  playArea: playAreaReducer,
  history: historyReducer,
});

export default rootReducer;
