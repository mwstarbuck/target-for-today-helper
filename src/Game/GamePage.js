import React, { useState } from 'react';
import { rollDice } from '../Utilities/Utilities';

const GamePage = () => {
  const [showRoller, setShowRoller] = useState(false);

  return <><h1>Target for Today Helper</h1>

    {!showRoller && <button onClick={() => setShowRoller(!showRoller)}>Start Game</button>}
    {showRoller && <button onClick={() => rollDice(6)}>Roll Dice</button>}
  </>
}

export default GamePage;