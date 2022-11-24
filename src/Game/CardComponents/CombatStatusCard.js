import React from 'react';

const CombatStatusCard = (props) => {
  const { cardMessage, round, waveCount, waveTotal} = props;
  const total = waveTotal;
  return <div>
    <div style={{ alignItems: 'center', fontSize: 16, fontWeight: 600 }}>
      {cardMessage && <p>{cardMessage}</p>}
      {( waveCount !== 'done' && waveTotal !== 0) && <p>Round: {round}</p>}
    </div>
  </div>
}

export default CombatStatusCard;