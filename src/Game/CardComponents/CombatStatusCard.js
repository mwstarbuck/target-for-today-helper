import React from 'react';

const CombatStatusCard = (props) => {
  const { cardMessage, round, waveCount} = props;
  return <div>
    <div style={{ alignItems: 'center', fontSize: 16, fontWeight: 600 }}>
      {cardMessage && <p>{cardMessage}</p>}
      { waveCount !== 'done' && <p>Round: {round}</p>}
    </div>
    {/* <div>
      <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
      <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>
    </div> */}
  </div>
}

export default CombatStatusCard;