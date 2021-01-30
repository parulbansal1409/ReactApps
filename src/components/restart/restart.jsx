import React from 'react';
import './restart.css';

const Restart = (props) => {
  const { onRestart } = props;

  return (
    <button onClick={onRestart} className="restart">
      New Game
    </button>
  );
};

export default React.memo(Restart);
